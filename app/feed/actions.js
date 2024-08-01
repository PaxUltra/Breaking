"use server";

import Parser from "rss-parser";
import { revalidatePath } from "next/cache";
import { pool } from '@/app/data/db-manager';

export async function updateFeeds() {
    const parser = new Parser();

    // Get current feeds from database
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM rss_feed");
    const feeds = result.rows;


    // Check the build date of each feed
    feeds.forEach(async feed => {
        let feedId = feed.id;
        let feedUrl = feed.url;
        let cachedBuildDate = new Date(feed.last_build);
        let newFeedData = await parser.parseURL(feedUrl);
        let newestBuildDate = new Date(newFeedData?.lastBuildDate ? newFeedData.lastBuildDate : newFeedData.items[0].pubDate);

        if (newestBuildDate > cachedBuildDate) {
            await client.query("UPDATE rss_feed SET last_build = $1, items = $2 WHERE id = $3", [newestBuildDate, feed.items, feedId]);
        }
    });

    await client.end();

    revalidatePath("/new-rss-feed");

    return;
}