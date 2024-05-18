import Layout from "@/Layouts/Layout"
import ShowLayout from "@/Components/pages/Show"
import { Head } from "@inertiajs/react"
export default function Dashboard({ auth }) {
    return (
        <>
            <Head title="Administrador" />

            <Layout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
            >
                <ShowLayout>
                    <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-6">
                        <a href={route('admin.admins.index')} className="group bg-white rounded-lg hover:ring-slate-300 hover:bg-slate-50 shadow hover:shadow-none transition-all p-6 w-full items-center flex flex-col">
                            <h2 className="text-slate-600 text-lg font-semibold">VER ADMINISTRADORES</h2>
                            <button className="bg-red-500 px-4 p-2 text-white mt-4 rounded-lg group-hover:bg-red-400 group-hover:text-red-900 font-bold">VER</button>
                        </a>
                        <a href={route('admin.companies.index')} className="group bg-white rounded-lg hover:ring-slate-300 hover:bg-slate-50 shadow hover:shadow-none transition-all p-6 w-full items-center flex flex-col">
                            <h2 className="text-slate-600 text-lg font-semibold">VER EMPRESAS</h2>
                            <button className="bg-red-500 px-4 p-2 text-white mt-4 rounded-lg group-hover:bg-red-400 group-hover:text-red-900 font-bold">VER</button>
                        </a>
                        <a href={route('admin.workers.index')} className="group bg-white rounded-lg hover:ring-slate-300 hover:bg-slate-50 shadow hover:shadow-none transition-all p-6 w-full items-center flex flex-col">
                            <h2 className="text-slate-600 text-lg font-semibold">VER TRABAJADORES</h2>
                            <button className="bg-red-500 px-4 p-2 text-white mt-4 rounded-lg group-hover:bg-red-400 group-hover:text-red-900 font-bold">VER</button>
                        </a>
                        <a href={route('admin.shifts.index')} className="group bg-white rounded-lg hover:ring-slate-300 hover:bg-slate-50 shadow hover:shadow-none transition-all p-6 w-full items-center flex flex-col">
                            <h2 className="text-slate-600 text-lg font-semibold">VER TURNOS</h2>
                            <button className="bg-red-500 px-4 p-2 text-white mt-4 rounded-lg group-hover:bg-red-400 group-hover:text-red-900 font-bold">VER</button>
                        </a>
                    </div>
                </ShowLayout>

            </Layout>
        </>
    )
}

