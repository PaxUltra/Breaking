export function AddFeed() {
    return (
        <form>
            <label htmlFor="url">Enter Feed URL</label>
            <input type="text" id="url" name="url" required />
            <button type="submit">Add</button>
        </form>
    );
}