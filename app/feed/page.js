"use client";

import Sidebar from "./components/sidebar";
import FeedItems from "./components/feed-items";
import ReadingPane from "./components/reading-pane";
import { useEffect, useState } from "react";
import { getFeeds } from "./actions";

export default function FeedContainer() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [subscribedFeeds, setSubscribedFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleFeedCLick = (feed) => {
        setSelectedFeed(feed);
    };

    useEffect(() => {
        async function fetchFeeds() {
            const feeds = await getFeeds();
            setSubscribedFeeds(feeds);
        }

        fetchFeeds();
    }, []);

    return (
        <main className="h-screen grid grid-cols-12">
            <Sidebar subscribedFeeds={subscribedFeeds} selectedFeed={selectedFeed} onFeedSelect={handleFeedCLick} />
            <FeedItems selectedFeed={selectedFeed} selectedItem={selectedItem} onItemSelect={handleItemClick} />
            <ReadingPane selectedItem={selectedItem} />
        </main>
    );
}