"use client";

import { format } from "date-fns";
import { useState } from "react";

export default function ArticleCard(props) {
    const item = props?.selectedItem;
    const title = item?.title;
    const link = item?.link;
    const content = item?.content;
    const enclosure = item?.enclosure;
    const feedTitle = item?.feedTitle;
    const date = item?.pubDate ? new Date(item?.pubDate) : undefined;
    const [viewImageUrl, setViewImageUrl] = useState("");

    // This will produce a date in the following format: Sat, 01 Jan 2024 00:03:05
    const formattedDate = date ? format(date, "EEE, dd MMM yyyy HH:mm:ss") : "";

    const handleClick = (e) => {
        if (viewImageUrl === "") {
            e.target.innerText = "Hide";
            setViewImageUrl(enclosure.url);
        } else {
            e.target.innerText = "View";
            setViewImageUrl("");
        }
    }

    if (item) {
        return (
            <div className="w-[97%] px-6 py-2 bg-white">
                <a href={link} className="text-lg text-sky-700 hover:underline">{title}</a>
                <div className="flex justify-between mb-3">
                    <p className="text-xs">From <a href="#" className="hover:underline">{feedTitle}</a></p>
                    <p className="text-xs">{formattedDate}</p>
                </div>
                <div className="px-3">
                    <p className="text-sm mb-3">{content}</p>
                    <p className="text-sm"><span onClick={handleClick} className="text-sky-500 hover:cursor-pointer">View</span> Enclosure: <a href={enclosure.url}>{enclosure.url.match(/[^/]+$/)[0]}</a></p>
                    {viewImageUrl && (
                        <img className="pt-3" src={viewImageUrl} />
                    )}
                </div>
            </div>
        );
    } else {
        return;
    }
}