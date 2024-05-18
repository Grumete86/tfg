export default function IndexRow({ children }) {
    return (
        <div className="grid w-full md:w-4/5 grid-cols-3 justify-between p-3 bg-white rounded-md mx-auto">
            {children}
        </div>
    )
}