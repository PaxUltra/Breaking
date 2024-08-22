import ArticleCard from "./article-card";

export default function ReadingPane(props) {
    return (
        <div className="flex justify-center col-span-6 bg-slate-200">
            <ArticleCard selectedItem={props?.selectedItem} />
        </div>
    );
}