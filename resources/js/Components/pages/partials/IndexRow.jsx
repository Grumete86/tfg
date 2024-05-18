export default function IndexRow({ children }) {
    return (
        <div className="flex flex-row justify-between p-3 bg-white rounded-md">
            {children}
        </div>
    )
}