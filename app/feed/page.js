import { pool } from "@/app/data/db-manager";
import Sidebar from "./components/sidebar";
import FeedItems from "./components/feed-items";
import ReadingPane from "./components/reading-pane";

export default async function FeedContainer() {
    const client = await pool.connect();
    let result = await client.query("SELECT * FROM rss_feed");
    await client.end();
    let feeds = result.rows;

    return (
        <main class="h-screen grid grid-cols-12">
            <Sidebar />
            <FeedItems />
            <ReadingPane />
            {/* <AddFeed />
            <ul>
                {feeds.map((feed) => (
                    <li key={feed.feed_id}>
                        {feed.title}
                        <DeleteFeed feed_id={feed.feed_id} />
                    </li>
                ))}
            </ul> */}
        </main>
    );
}