export default function ReadingPane(props) {
    return (
        <div className="col-span-6 bg-pink-600">
            <h1>{props.selectedItem?.title}</h1>
        </div>
    );
}