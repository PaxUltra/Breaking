"use client";

import dayjs from "dayjs";
import isYesterday from 'dayjs/plugin/isYesterday';
import ItemCard from "./item-card";
import DateRangeBanner from "./date-range-banner";
import { getFeeds, updateFeeds } from "../actions";
import { useEffect, useState } from "react";

dayjs.extend(isYesterday);

// await updateFeeds();

function aggregateFeed(feeds) {
    let aggFeed = [];

    feeds.map((feed) => {
        feed.items.map((item) => {
            aggFeed.push({
                feedTitle: feed.title,
                feedFavicon: feed.favicon,
                ...item
            });
        });
    });

    return aggFeed;
}

function sortFeed(agFeed) {
    let sortedFeed = {};
    let sortedByDate = agFeed.toSorted((a, b) => {
        return new Date(b.pubDate) - new Date(a.pubDate);
    });

    sortedByDate.map((item) => {
        let pubDate = dayjs(item.pubDate);

        if (dayjs().isSame(pubDate, 'day')) {
            if (!('Today' in sortedFeed)) {
                sortedFeed['Today'] = [];
            }

            sortedFeed['Today'].push(item);
        } else if (pubDate.isYesterday()) {
            if (!('Yesterday' in sortedFeed)) {
                sortedFeed['Yesterday'] = [];
            }

            sortedFeed['Yesterday'].push(item);
        } else if (dayjs().isSame(pubDate, 'week')) {
            if (!('This Week' in sortedFeed)) {
                sortedFeed['This Week'] = [];
            }

            sortedFeed['This Week'].push(item);
        } else if (dayjs().isSame(pubDate, 'month')) {
            if (!('This Month' in sortedFeed)) {
                sortedFeed['This Month'] = [];
            }

            sortedFeed['This Month'].push(item);
        } else if (dayjs().subtract(1, 'month').isSame(pubDate, 'month')) {
            if (!('Last Month' in sortedFeed)) {
                sortedFeed['Last Month'] = [];
            }

            sortedFeed['Last Month'].push(item);
        } else {
            let monthName = pubDate.format('MMMM');
            if (!(monthName in sortedFeed)) {
                sortedFeed[monthName] = [];
            }

            sortedFeed[monthName].push(item);
        }
    });

    return sortedFeed;

}

export default function FeedItems(props) {

    // Get feeds from database
    const [feeds, setFeeds] = useState(props.feeds);
    let agFeeds = aggregateFeed(feeds);
    let sortedFeed = sortFeed(agFeeds);

    useEffect(() => {
        async function getFeedUpdates() {
            try {
                const updatedFeeds = await updateFeeds();

                if (JSON.stringify(updateFeeds) !== JSON.stringify(feeds)) {
                    setFeeds(updatedFeeds);
                }

            } catch (error) {
                console.error("Error fetching feeds...");
            }
        }

        getFeedUpdates();

        const intervalId = setInterval(() => {
            getFeedUpdates();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="col-span-4 bg-teal-400">
            {Object.keys(sortedFeed).map((key) => {
                return (
                    <div>
                        <DateRangeBanner rangeText={key} />
                        {sortedFeed[key].map((item) => (
                            <div>
                                <ItemCard feed={item.feedTitle} favicon={item.feedFavicon} item={item} />
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}