"use client";

import sanitizeHtml from "sanitize-html";
import { format } from "date-fns";
import { useState } from "react";

function getElapsedTime(pubDate) {
    let output = "";
    const now = new Date();
    const hourDif = Math.abs(now - pubDate) / 36e5; // Subtraction returns difference in milliseconds. 36e5 is equivalent to 60*60*1000, which converts milliseconds to hours.

    if (hourDif < 1) {
        const minutes = Math.floor(hourDif * 60);
        output = `(${minutes} ${minutes > 1 ? 'minutes' : 'minute'})`;
    } else if (hourDif < 24) {
        output = `(${Math.floor(hourDif)} hours)`
    } else if (hourDif < 168) {
        const days = Math.floor(hourDif / 24);
        output = `(${days} ${days > 1 ? 'days' : 'day'})`;
    } else if (hourDif < 730) {
        const weeks = Math.floor(hourDif / (24 * 7));
        output = `(${weeks} ${weeks > 1 ? 'weeks' : 'week'})`;
    } else if (hourDif < 8760) {
        const months = Math.floor(hourDif / (24 * 7 * 4));
        output = `(${months} ${months > 1 ? 'months' : 'month'})`;
    } else {
        const years = Math.floor(hourDif / (24 * 7 * 4 * 12));
        output = `(${years} ${years > 1 ? 'years' : 'year'})`;
    }

    return output;
}

export default function ArticleCard(props) {
    const item = props?.selectedItem;
    const [viewImageUrl, setViewImageUrl] = useState("");

    if (item) {
        const title = item.title;
        const link = item.link;
        const content = item.content;
        const sanitizedContent = sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        });
        const enclosure = item.enclosure;
        const feedTitle = item.feedTitle;
        const feedLink = item.feedLink;
        const date = new Date(item?.pubDate);
        const formattedDate = date ? format(date, "EEE, dd MMM yyyy HH:mm:ss") : ""; // This will produce a date in the following format: Sat, 01 Jan 2024 00:03:05
        const elapsedTime = getElapsedTime(date);

        const handleClick = (e) => {
            if (viewImageUrl === "") {
                e.target.innerText = "Hide";
                setViewImageUrl(enclosure.url);
            } else {
                e.target.innerText = "View";
                setViewImageUrl("");
            }
        }

        return (
            <div className="w-[97%] px-6 py-2 bg-white">
                <a href={link} className="text-lg text-sky-700 hover:underline">{title}</a>
                <div className="flex justify-between mb-3">
                    <p className="text-xs">From <a href={feedLink} className="hover:underline cursor-pointer">{feedTitle}</a></p>
                    <p className="text-xs">{formattedDate} {elapsedTime}</p>
                </div>
                <div className="px-3">
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} className="text-sm mb-3"></div>
                    {enclosure && (
                        <p className="text-sm"><span onClick={handleClick} className="text-sky-500 hover:cursor-pointer">View</span> Enclosure: <a href={enclosure.url}>{enclosure.url.match(/[^/]+$/)[0]}</a></p>
                    )}
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