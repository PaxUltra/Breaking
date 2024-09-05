import FeedName from "./feed-name";
import { useFeedContext } from "../feed-context";

export default function Sidebar(props) {
    const { selectedFeedState, subscribedFeedsState, handleFeedClick } = useFeedContext();
    const [subscribedFeeds, setSubscribedFeeds] = subscribedFeedsState;
    const [selectedFeed, setSelectedFeed] = selectedFeedState;
    const feeds = subscribedFeeds;

    const handleClick = () => {
        handleFeedClick(null);
    };

    return (
        <div className="pl-7 col-span-2 bg-slate-200">
            <ul className="text-xs">
                <li className={`hover:cursor-pointer ${selectedFeed === null ? 'bg-slate-400' : ''}`} onClick={handleClick}>All Items</li>
                {subscribedFeeds.map((feed) => {
                    return <FeedName feed={feed} />
                })}
            </ul>
        </div >
    );
}