import { useFeedContext } from "../feed-context";

export default function FeedName(props) {
    const { selectedFeedState, handleFeedClick } = useFeedContext();
    const [selectedFeed, setSelectedFeed] = selectedFeedState;

    const feed = props.feed;

    const handleClick = () => {
        handleFeedClick(feed.feed_id);
    };

    return (
        <li className={`flex gap-1 hover:cursor-pointer ${selectedFeed === feed.feed_id ? 'bg-slate-400' : ''}`} onClick={handleClick} ><img className="h-4" src={feed.favicon} /><p>{feed.title}</p></li>
    );
}