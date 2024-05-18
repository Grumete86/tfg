export default function IndexRowButton({ children, className }) {
    return (
        <div className={`grid grid-cols-2 gap-2 place-content-center ${className}`}>
            {children}
        </div>
    )
}