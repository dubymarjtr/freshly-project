// Loads a reusable Mongo client for the application.
import { MongoClient } from "mongodb";
import config from "../../config.js";

const client = new MongoClient(config.db.clientURL);

export default {
connect() {
    return client.connect();
},
close() {
    client.close();
},
};