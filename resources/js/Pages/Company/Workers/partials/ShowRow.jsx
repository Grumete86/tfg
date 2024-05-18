export default function ShowRow({ children }) {
    return (
        <div className="grid w-full md:w-4/5 grid-cols-4 justify-between p-3 bg-white rounded-md mx-auto gap-2">
            {children}
        </div>
    )
}