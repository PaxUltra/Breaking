import { pool } from "@/app/data/db-manager";
import { AddFeed } from "@/app/rss-feeds/components/add-feed";
import { DeleteFeed } from "./components/delete-feed";

export default async function RssFeeds() {
    const client = await pool.connect();
    let result = await client.query("SELECT * FROM rss_feed");
    await client.end();
    let feeds = result.rows;

    return (
        <main>
            <AddFeed />
            <ul>
                {feeds.map((feed) => (
                    <li key={feed.feed_id}>
                        {feed.title}
                        <DeleteFeed feed_id={feed.feed_id} />
                    </li>
                ))}
            </ul>
        </main>
    );
}