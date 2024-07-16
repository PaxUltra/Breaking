import 'dotenv/config'
import Parser from "rss-parser";
import pg from "pg";
const { Client } = pg;
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

export const dbManager = {
    addFeed: async (prevState, formData) => {
        const url = formData.get("url");
        const parser = new Parser();
        const feed = parser.parseURL(url);
    },

    getRssFeeds: async () => {
        await client.connect();
        const result = await client.query('SELECT * FROM rss_feed');
        await client.end();

        return result.rows;
    }
}