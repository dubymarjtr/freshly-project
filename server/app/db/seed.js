import once from "./conns/once.js";
import meals from "./data.js";

(async () => {
    const conn = await once.connect();
    await conn.db("freshly").collection("meals").deleteMany({});
    await conn.db("freshly").collection("meals").insertMany(meals);
    console.log("data seeded")

    conn.close();
})();