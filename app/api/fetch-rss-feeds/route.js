import Parser from "rss-parser";
import { NextResponse } from "next/server";

let parser = new Parser();

// Temporary URL storage
let url = "https://survivetheark.com/index.php?/rss/3-ark-news.xml/"

export async function GET(req) {
    const feed = await parser.parseURL(url);
    return NextResponse.json(feed, { status: 200 });
}