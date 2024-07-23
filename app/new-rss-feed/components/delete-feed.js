"use client";

import { useFormState } from "react-dom";
import { deleteFeed } from "@/app/new-rss-feed/actions";

export function DeleteFeed(props) {
    const [state, formAction, isPending] = useFormState(deleteFeed, null);

    return (
        <form action={formAction}>
            <input type="hidden" name="feed_id" value={props.feed_id} />
            <button type="submit" disabled={isPending}>Delete</button>
        </form>
    );
}