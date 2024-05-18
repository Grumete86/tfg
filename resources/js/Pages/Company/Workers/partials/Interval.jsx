export default function Interval({ title, interval, className = '' }) {
    return (
        <div className={`text-center bg-red-100 rounded-lg ${className}`}>
            <h5 className="text-xs p-2">{title}</h5>
            <div className="p-2">
                <p>
                    <span className="text-xl">{interval.hours < 10 ? '0' + interval.hours : interval.hours}</span>
                    <span className="text-xs">h</span>
                    <span> </span>
                    <span className="text-xl">{interval.minutes < 10 ? '0' + interval.minutes : interval.minutes}</span>
                    <span className="text-xs">m</span>
                </p>
            </div>
        </div>
    )
}