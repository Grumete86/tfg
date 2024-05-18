export default function IndexRowHeader({ children, className = '' }) {
    return (
        <>
            <div className={`flex flex-row pt-3 px-3 ${className}`}>
                {children}
            </div>
            <hr className="mb-3" />
        </>
    )
}