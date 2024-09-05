import React, { useContext, useState } from "react";

const feedContext = React.createContext();

export function useFeedContext() {
    return useContext(feedContext);
}

export function FeedContextProvider({ children }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [subscribedFeeds, setSubscribedFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleFeedClick = (feed) => {
        setSelectedFeed(feed);
    };

    return (
        <feedContext.Provider value={{
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