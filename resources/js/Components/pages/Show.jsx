export default function ShowLayout({ children }) {
    return (
        <div className="p-4 flex flex-col gap-2 items-center">
            {children}
        </div>
    )
}