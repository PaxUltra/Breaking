"use client";

import Sidebar from "./components/sidebar";
import FeedItems from "./components/feed-items";
import ReadingPane from "./components/reading-pane";
import { FeedContextProvider } from "./feed-context";

export default function Page() {
    return (
        <FeedContextProvider>
            <FeedContainer />
        </FeedContextProvider>
    );
}

function FeedContainer() {
    return (
        <main className="h-screen grid grid-cols-12">
            <Sidebar />
            <FeedItems />
            <ReadingPane />
        </main>
    );
}