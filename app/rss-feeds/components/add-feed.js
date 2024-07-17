"use client";

import { useFormState } from "react-dom";
import { addFeed } from "@/app/rss-feeds/actions";

export function AddFeed() {
    const [state, formAction, isPending] = useFormState(addFeed, null);

    return (
        <form action={formAction}>
            <label htmlFor="url">Enter Feed URL</label>
            <input type="text" id="url" name="url" required />
            <button type="submit" disabled={isPending}>Add</button>
        </form>
    );
}