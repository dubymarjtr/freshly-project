// Provides config for the app in conjunction with dotenv
// Config is the only place accesses 'dotenv'
import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  db: {
    clientURL: process.env.DB_CLIENT_URL,
    collectionName: "meals",
    name: "freshly",
  },
  encryption: {
    expiresIn: process.env.EXPIRES_IN || "7d",
    saltRounds: process.env.SALT_ROUNDS || 10,
    secret: process.env.ENCRYPTION_SECRET || "secret",
  },
};
