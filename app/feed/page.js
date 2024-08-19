import { pool } from "@/app/data/db-manager";
import Sidebar from "./components/sidebar";
import FeedItems from "./components/feed-items";
import ReadingPane from "./components/reading-pane";
import { getFeeds } from "./actions";

export default async function FeedContainer() {
    const feeds = await getFeeds();

    return (
        <main className="h-screen grid grid-cols-12">
            <Sidebar />
            <FeedItems feeds={feeds} />
            <ReadingPane />
        </main>
    );
}