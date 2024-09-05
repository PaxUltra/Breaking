"use client";

import Sidebar from "./components/sidebar";
import FeedItems from "./components/feed-items";
import ReadingPane from "./components/reading-pane";
import { useEffect, useState } from "react";
import { getFeeds, updateFeeds } from "./actions";
import { FeedContextProvider, useFeedContext } from "./feed-context";

export default function Page() {
    return (
        <FeedContextProvider>
            <FeedContainer />
        </FeedContextProvider>
    );
}

function FeedContainer() {
    const { subscribedFeedsState } = useFeedContext();
    const [subscribedFeeds, setSubscribedFeeds] = subscribedFeedsState;

    useEffect(() => {
        async function fetchFeeds() {
            const feeds = await updateFeeds();
            setSubscribedFeeds(feeds);
        }

        fetchFeeds();

    }, []);

    return (
        <main className="h-screen grid grid-cols-12">
            <FeedContextProvider>
                <Sidebar />
                <FeedItems />
                <ReadingPane />
            </FeedContextProvider>
        </main>
    );
}