import { format } from "date-fns";
import { useFeedContext } from "../feed-context";

export default function ItemCard(props) {
    const { selectedItemState, handleItemClick } = useFeedContext();
    const [selectedItem, setSelectedItem] = selectedItemState;

    const feed_title = props.feed;
    const item = props.item;
    const date = new Date(item.pubDate);

    // This will produce a date in the following format: Sat, 01 Jan 2024 00:03:05
    const formattedDate = format(date, "EEE, dd MMM yyyy HH:mm:ss");

    const handleClick = () => {
        handleItemClick(props.item);
    };

    return (
        <div className={`grid grid-cols-2 gap-y-1 px-3 py-2.5 ${selectedItem?.itemIndex === item.itemIndex ? "bg-slate-300" : "bg-white hover:bg-slate-200"}`} onClick={handleClick}>
            <h2 className="col-span-2 text-sm">{item.title}</h2>
            <div className="col-span-2 w-full flex justify-between">
                <div className="flex items-center gap-1">
                    <img className="h-6" src={props.favicon}></img>
                    <p className="text-xs">{feed_title}</p>
                </div>
                <p className="text-xs">{formattedDate}</p>
            </div>
        </div>
    );
}