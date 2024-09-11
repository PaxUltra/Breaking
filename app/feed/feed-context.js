import React, { useContext, useState, useEffect } from "react";
import { updateFeeds } from "./actions";
import dayjs from "dayjs";
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isYesterday);

const feedContext = React.createContext();

export function useFeedContext() {
    return useContext(feedContext);
}

export function FeedContextProvider({ children }) {
    const [fullFeed, setFullFeed] = useState([]);
    const [isFullFeedLoaded, setIsFullFeedLoaded] = useState(false);
    const [currentFeed, setCurrentFeed] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [subscribedFeeds, setSubscribedFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleFeedClick = async (feed) => {
        setSelectedFeed(feed);
    };

    function filterFeed(feedList, selectedFeedId) {

        if (selectedFeedId) {
            return feedList.filter((feed) => feed.feed_id === selectedFeedId);
        } else {
            return feedList;
        }
    }

    function aggregateFeed(feeds) {
        let aggFeed = [];
        let index = 0;

        feeds.map((feed) => {
            feed.items.map((item) => {
                aggFeed.push({
                    feedTitle: feed.title,
                    feedFavicon: feed.favicon,
                    feedLink: feed.url,
                    itemIndex: index,
                    ...item
                });
                index++;
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

    // Update the full feed on an interval
    useEffect(() => {
        async function getFeedUpdates() {
            try {
                const updatedFeeds = await updateFeeds();
                setSubscribedFeeds(updatedFeeds);
                setFullFeed(updatedFeeds);
                setIsFullFeedLoaded(true);
            } catch (error) {
                console.error("Error fetching feeds...");
            }
        }

        getFeedUpdates();

        const intervalId = setInterval(() => {
            getFeedUpdates();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    // Filter the feed when the selected feed is changed
    useEffect(() => {
        async function filterAndSortFeed() {
            try {

                if (isFullFeedLoaded) {
                    const filteredFeeds = filterFeed(fullFeed, selectedFeed);
                    const updatedAg = aggregateFeed(filteredFeeds);
                    const updatedSorted = sortFeed(updatedAg);

                    setCurrentFeed(updatedSorted);
                    setSelectedItem(Object.entries(updatedSorted)[0][1][0]);
                }

            } catch (error) {
                console.error("Error filterint feeds...");
                console.log(error);
            }
        }

        filterAndSortFeed();

    }, [selectedFeed, isFullFeedLoaded]);

    return (
        <feedContext.Provider value={{
            currentFeedState: [currentFeed, setCurrentFeed],
            selectedItemState: [selectedItem, setSelectedItem],
            subscribedFeedsState: [subscribedFeeds, setSubscribedFeeds],
            selectedFeedState: [selectedFeed, setSelectedFeed],
            handleItemClick: handleItemClick,
            handleFeedClick: handleFeedClick
        }}>
            {children}
        </feedContext.Provider>
    );
}