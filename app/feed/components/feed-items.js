"use client";

import dayjs from "dayjs";
import isYesterday from 'dayjs/plugin/isYesterday';
import ItemCard from "./item-card";
import DateRangeBanner from "./date-range-banner";
import { useFeedContext } from "../feed-context";

dayjs.extend(isYesterday);

export default function FeedItems(props) {
    const { currentFeedState } = useFeedContext();
    const [currentFeed, setCurrentFeed] = currentFeedState;

    return (
        <div className="col-span-4">
            {Object.keys(currentFeed).map((key) => {
                return (
                    <div key={key}>
                        <DateRangeBanner rangeText={key} />
                        {currentFeed[key].map((item) => {
                            return <ItemCard feed={item.feedTitle} favicon={item.feedFavicon} item={item} />
                        })}
                    </div>
                );
            })}
        </div>
    );
}