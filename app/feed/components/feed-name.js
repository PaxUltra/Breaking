export default function FeedName(props) {
    const feed = props.feed;

    const handleClick = () => {
        props.onClick(feed.feed_id);
    };

    return (
        <li className={`flex gap-1 hover:cursor-pointer ${props.selectedFeed === feed.feed_id ? 'bg-slate-400' : ''}`} onClick={handleClick} ><img className="h-4" src={feed.favicon} /><p>{feed.title}</p></li>
    );
}