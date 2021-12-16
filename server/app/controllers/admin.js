import client from "../db/conns/client.js";
import config from "../config.js";
import bcrypt from "bcrypt";

const admin = client.db(config.db.name).collection("admin");

export default {
  // Create admin
  async create(username, password) {
    const existingAdmin = await admin.findOne({ username });

    // Check if user already exists
    if (existingAdmin) {
      throw new Error("Username already exists for an admin");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin and insert into database
    return admin.insertOne({ username, password: hashedPassword });
  },
};
