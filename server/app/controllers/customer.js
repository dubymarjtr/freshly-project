import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import client from "../db/conns/client.js";

const customer = client.db(config.db.name).collection("customer");

export default {
  // Create customer account
  async create({ fname, lname, address, username, password, role }) {
    const existingUser = await customer.findOne({ username });

    // Check if user already exists
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer and insert into database
    return customer.insertOne({
      firstName: fname,
      lastName: lname,
      address,
      username,
      password: hashedPassword,
      role,
    });
  },

  async show({ username, password }) {
    const customerUser = await customer.findOne({ username });

    if (!customerUser) {
      throw new Error("Login unsuccessful");
    }

    // Check if password is correct
    const match = await bcrypt.compare(password, customerUser.password);

    if (!match) {
      throw new Error("Login unsuccessful");
    }

    // Create JWT
    return jwt.sign(
      { username, role: customerUser.role },
      config.encryption.secret,
      {
        expiresIn: config.encryption.expiresIn,
      }
    );
  },
};
