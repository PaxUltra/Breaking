import { format } from "date-fns";

export default function ItemCard(props) {
    const feed_title = props.feed;
    const item = props.item;
    const date = new Date(item.pubDate);
    // This will produce a date in the following format: Sat, 01 Jan 2024 00:03:05
    const formattedDate = format(date, "EEE, dd MMM yyyy HH:mm:ss");

    return (
        <div class="grid grid-cols-2 gap-y-1 bg-white px-3 py-2.5">
            <h2 class="col-span-2 text-sm">{item.title}</h2>
            <div class="col-span-2 w-full flex justify-between">
                <div class="flex items-center gap-1">
                    <img class="h-6 bg-slate-800" src={props.favicon}></img>
                    <p class="text-xs">{feed_title}</p>
                </div>
                <p class="text-xs">{formattedDate}</p>
            </div>
        </div>
    );
}