import FeedName from "./feed-name";

export default function Sidebar(props) {
    const feeds = props.subscribedFeeds;

    return (
        <div className="pl-7 col-span-2 bg-slate-200">
            <ul className="text-xs">
                <li className="hover:cursor-pointer">All Items</li>
                {feeds.map((feed) => {
                    return <FeedName feed={feed} selectedFeed={props.selectedFeed} onClick={props.onFeedSelect} />
                })}
            </ul>
        </div >
    );
}