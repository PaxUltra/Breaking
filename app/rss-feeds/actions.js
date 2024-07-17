"use server";

import 'dotenv/config'
import Parser from "rss-parser";
import { revalidatePath } from "next/cache";
import { pool } from '@/app/data/db-manager';

export async function addFeed(prevState, formData) {
    const url = formData.get("url");
    const parser = new Parser();
    const feed = await parser.parseURL(url);
    const query = "INSERT INTO rss_feed ( \
        title, \
        custom_name, \
        url, \
        description, \
        last_build, \
        lang, \
        copyright, \
        editor, \
        web_master, \
        pub_date, \
        category, \
        generator, \
        docs, \
        cloud, \
        ttl, \
        image, \
        text_input, \
        skip_hours, \
        skip_days) \
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)";

    const values = [
        feed?.title,
        feed?.custom_title,
        feed?.link,
        feed?.description,
        feed?.lastBuildDate ? feed.lastBuildDate : feed.items[0].pubDate,
        feed?.language,
        feed?.copyright,
        feed?.editor,
        feed?.webMaster,
        feed?.pubDate,
        feed?.categories,
        feed?.generator,
        feed?.docs,
        feed?.cloud,
        feed?.ttl,
        feed?.image,
        feed?.textInput,
        feed?.skipHours,
        feed?.skipDays
    ];

    const client = await pool.connect();
    await client.query(query, values);
    await client.end();
    return;
}

export async function deleteFeed(prevState, formData) {
    const feedId = formData.get("feed_id");
    const client = await pool.connect();
    await client.query("DELETE FROM rss_feed WHERE feed_id = $1", [feedId]);
    await client.end();
    revalidatePath("/rss-feeds");
    return;
}

// export const dbManager = {
//     addFeed: async (prevState, formData) => {
//         const url = formData.get("url");
//         const parser = new Parser();
//         const feed = parser.parseURL(url);

//     },

//     getRssFeeds: async () => {
//         await client.connect();
//         const result = await client.query('SELECT * FROM rss_feed');
//         await client.end();

//         return result.rows;
//     }
// }