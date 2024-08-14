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
        favicon, \
        description, \
        last_build, \
        items, \
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)";

    const values = [
        feed?.title,
        feed?.custom_title,
        feed?.link,
        feed?.link.match("^(?:https?:\/\/)?(?:www\.)?([^\/:]+)")[0] + "/favicon.ico",
        feed?.description,
        feed?.lastBuildDate ? feed.lastBuildDate : feed.items[0].pubDate,
        feed?.items,
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
    revalidatePath("/new-rss-feed");
    return;
}

export async function deleteFeed(prevState, formData) {
    const feedId = formData.get("feed_id");
    const client = await pool.connect();
    await client.query("DELETE FROM rss_feed WHERE feed_id = $1", [feedId]);
    client.release();
    revalidatePath("/new-rss-feed");
    return;
}