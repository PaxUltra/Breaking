export default function DateRangeBanner(props) {
    let rangeText = props.rangeText;

    return (
        <p className="bg-slate-100 text-center text-sm font-bold py-1.5">{rangeText}</p>
    )
}