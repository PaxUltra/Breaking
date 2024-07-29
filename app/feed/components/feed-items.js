import { pool } from "@/app/data/db-manager";
import ItemCard from "./item-card";

export default async function FeedItems() {
    // Get feeds from database
    const client = await pool.connect();
    let result = await client.query("SELECT * FROM rss_feed");
    await client.end();
    let feeds = result.rows;

    //Aggregate feeds
    let agFeeds = [];
    feeds.map((feed) => {
        feed.items.map((item) => {
            agFeeds.push({
                feedTitle: feed.title,
                feedFavicon: feed.favicon,
                ...item
            });
        });
    });

    return (
        <div class="col-span-4 bg-teal-400">
            {agFeeds.map((item) => (
                <div>
                    <ItemCard feed={item.feedTitle} favicon={item.feedFavicon} item={item} />
                </div>
            ))}
        </div>
    );
}