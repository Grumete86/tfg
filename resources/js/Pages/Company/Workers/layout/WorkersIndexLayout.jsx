export default function WorkersIndexLayout({ children }) {
    return (
        <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 place-items-center ">
            {children}
        </div>
    )
}