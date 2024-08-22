"use client";

import Sidebar from "./components/sidebar";
import FeedItems from "./components/feed-items";
import ReadingPane from "./components/reading-pane";
import { useState } from "react";

export default function FeedContainer() {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <main className="h-screen grid grid-cols-12">
            <Sidebar />
            <FeedItems selectedItem={selectedItem} onItemSelect={handleItemClick} />
            <ReadingPane selectedItem={selectedItem} />
        </main>
    );
}