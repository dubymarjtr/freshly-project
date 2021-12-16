import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import client from "../db/conns/client.js";

const admin = client.db(config.db.name).collection("admin");

export default {
  // Create admin
  async create({ username, password, role }) {
    const existingAdmin = await admin.findOne({ username });

    // Check if user already exists
    if (existingAdmin) {
      throw new Error("Username already exists for an admin");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin and insert into database
    return admin.insertOne({ username, password: hashedPassword, role });
  },

  async show({ username, password }) {
    const adminUser = await admin.findOne({ username });

    if (!adminUser) {
      throw new Error("Login unsuccessful");
    }

    // Check if password is correct
    const match = await bcrypt.compare(password, adminUser.password);

    if (!match) {
      throw new Error("Login unsuccessful");
    }

    // Create JWT
    return jwt.sign(
      { username, role: adminUser.role },
      config.encryption.secret,
      {
        expiresIn: config.encryption.expiresIn,
      }
    );
  },
};
