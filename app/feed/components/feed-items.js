import { pool } from "@/app/data/db-manager";
import ItemCard from "./item-card";

export default async function FeedItems() {
    const client = await pool.connect();
    let result = await client.query("SELECT * FROM rss_feed");
    await client.end();
    let feeds = result.rows;

    return (
        <div class="col-span-4 bg-teal-400">
            {feeds.map((feed) => (
                <div>
                    {feed.items.map((item) => (
                        <ItemCard feed={feed.title} favicon={feed.favicon} item={item} />
                    ))}
                </div>
            ))}
        </div>
    );
}