"use server";

import Parser from "rss-parser";
import { revalidatePath } from "next/cache";
import { pool } from '@/app/data/db-manager';

export async function getFeeds() {
    const client = await pool.connect();
    let result = await client.query("SELECT * FROM rss_feed");
    client.release();
    return result.rows;
}

export async function updateFeeds() {
    const parser = new Parser();

    // Get current feeds from database
    const client = await pool.connect();
    let result = await client.query("SELECT * FROM rss_feed");
    let feeds = result.rows;

    // Check the build date of each feed
    feeds.forEach(async feed => {
        let feedId = feed.feed_id;
        let feedUrl = feed.url;
        let cachedBuildDate = new Date(feed.last_build);
        let newFeedData = await parser.parseURL(feedUrl);
        let newestBuildDate = new Date(newFeedData?.lastBuildDate ? newFeedData.lastBuildDate : newFeedData.items[0].pubDate);

        if (newestBuildDate > cachedBuildDate) {
            try {
                await client.query("BEGIN");
                await client.query("UPDATE rss_feed SET last_build = $1, items = $2 WHERE feed_id = $3", [newestBuildDate, newFeedData.items, feedId]);
                await client.query("COMMIT");
            } catch (e) {
                await client.query("ROLLBACK");
                throw e;
            }
        }
    });

    client.release();

    result = await client.query("SELECT * FROM rss_feed");
    feeds = result.rows;

    return feeds;
}