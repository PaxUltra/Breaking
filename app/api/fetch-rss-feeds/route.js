import Parser from "rss-parser";
import { NextResponse } from "next/server";

const parser = new Parser();

// Temporary URL storage
const rssFeeds = [
    "https://survivetheark.com/index.php?/rss/3-ark-news.xml/",
    "https://cr-news-api-service.prd.crunchyrollsvc.com/v1/en-US/rss",
    "https://www.rockpapershotgun.com/feed"
];

export async function GET(req) {
    const aggFeed = await Promise.all(rssFeeds.map(async url => {
        return await parser.parseURL(url);
    }));

    return NextResponse.json(aggFeed, { status: 200 });
}