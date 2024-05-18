import Layout from "@/Layouts/Layout"
import ShowLayout from "@/Components/pages/Show"
import { usePage } from "@inertiajs/react"
import { HiPhone, HiEnvelope, HiMapPin, HiUser, HiArrowRight } from "react-icons/hi2";

export default function Dashboard() {
    const { company, workers, auth } = usePage().props;
    const numTrabajadores = workers.length;
    const resumenTrabajadores = workers.map(worker => {
        return {
            worker: worker,
            workedTotal: worker.shifts.reduce((accum, shift) => {
                return shift.end_time ? accum + ((new Date(shift.end_time)) - (new Date(shift.start_time))) / 60000 : accum;
            }, 0),
            workedThisMonth: worker.shifts.reduce((accum, shift) => {
                const today = new Date();
                const date = new Date(shift.start_time);
                if (date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                    return shift.end_time ? accum + ((new Date(shift.end_time)) - (new Date(shift.start_time))) / 60000 : accum;
                }
                return accum;
            }, 0),
        }
    })
    console.log(resumenTrabajadores)
    const trabajadoresMasHoras = [...resumenTrabajadores].sort((a, b) => {
        if (a.workedTotal > b.workedTotal) return -1;
        if (a.workedTotal < b.workedTotal) return 1;
    })
    const trabajadoresMasHorasEsteMes = [...resumenTrabajadores].sort((a, b) => {
        if (a.workedThisMonth > b.workedThisMonth) return -1;
        if (a.workedThisMonth < b.workedThisMonth) return 1;
    })


    const minutosTotales = workers.reduce((accum, worker) => {
        return accum + worker.shifts.reduce((accum, shift) => {
            return shift.end_time ? accum + ((new Date(shift.end_time)) - (new Date(shift.start_time))) / 60000 : accum;
        }, 0)
    }, 0);
    const minutosAString = (minutos) => {
        return '' + Math.trunc(minutos / 60) + 'h ' + Math.trunc(minutos % 60) + 'm';
    }
    return (
        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <ShowLayout>
                <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
                    <div className="p-6 rounded-lg bg-white col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3">
                        <p className="text-xs font-bold text-slate-600">
                            Your data
                        </p>
                        <hr />
                        <div>
                            <p className="text-2xl font-bold text-slate-600 px-2">{company.name}</p>
                            <p className="text-md text-slate-600 px-2">{company.cif}</p>
                        </div>
                        <div>
                            <div className="text-sm font-bold  flex items-center gap-2 text-slate-600 px-2 py-1 ">
                                <HiUser />
                                <p >{company.manager.name}</p>
                            </div>
                            <div className="text-sm font-bold  flex items-center gap-2 text-slate-600 px-2 py-1 ">
                                <HiPhone />
                                <p >{company.phone}</p>
                            </div>
                            <div className="text-sm font-bold  flex items-center gap-2 text-slate-600 px-2 py-1 ">
                                <HiEnvelope />
                                <p >{company.manager.email}</p>
                            </div>
                            <div className="text-sm font-bold  flex items-center gap-2 text-slate-600 px-2 py-1 ">
                                <HiMapPin />
                                <p >{company.address}, {company.city}</p>
                            </div>

                        </div>


                    </div>
                    <div className="p-6 flex flex-col justify-between rounded-lg bg-white items-stratch transition-all">
                        <div className="text-2xl text-slate-600 text-center font-bold" style={{ textWrap: 'balance' }}>
                            Trabajadores activos
                        </div>
                        <div className="items-center text-8xl font-bold text-center text-indigo-600">
                            {numTrabajadores}
                        </div>
                        <a href={route('company.workers.index')} className="text-slate-600 hover:text-indigo-700">
                            <div className="flex justify-end items-center gap-2 ">
                                <p className="text-sm">
                                    ver todos
                                </p>
                                <HiArrowRight />
                            </div>
                        </a>
                    </div>
                    <div className="p-6 rounded-lg bg-white flex items-center justify-around">
                        <div>
                            <div className="text-2xl text-slate-600 text-center font-bold" style={{ textWrap: 'balance' }}>
                                Horas totales
                            </div>
                            <div className="items-center text-8xl font-bold text-center text-indigo-600" style={{ textWrap: 'balance' }}>
                                {minutosAString(resumenTrabajadores.reduce((accum, worker) => {
                                    return accum + worker.workedTotal;
                                }, 0))}
                            </div>
                        </div>

                    </div>
                    <div className="p-6 rounded-lg bg-white flex items-center justify-around col-span-1 sm:col-span-2 lg:col-span-1">
                        <div>
                            <div className="text-2xl text-slate-600 text-center font-bold" style={{ textWrap: 'balance' }}>
                                Horas totales de {(new Date()).toLocaleDateString('es-ES', { month: 'long' })}
                            </div>
                            <div className="items-center text-8xl font-bold text-center text-indigo-600" style={{ textWrap: 'balance' }}>
                                {minutosAString(resumenTrabajadores.reduce((accum, worker) => {
                                    return accum + worker.workedThisMonth;
                                }, 0))}
                            </div>
                        </div>

                    </div>
                    <div className="p-6 rounded-lg bg-indigo-400 col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2">
                        <div className="text-sm text-indigo-100 text-center font-bold" style={{ textWrap: 'balance' }}>
                            Trabajador con más horas este mes
                        </div>
                        <div>
                            <p className="text-white text-3xl font-bold text-center">

                                {trabajadoresMasHorasEsteMes[0].worker.name}
                            </p>
                            <p className="text-white text-lg font-bold text-center">

                                {trabajadoresMasHorasEsteMes[0].worker.dni}
                            </p>
                            <p className="text-indigo-100 text-md font-bold text-center">
                                {trabajadoresMasHorasEsteMes[0].worker.email}
                            </p>
                        </div>
                        <div className="items-center text-8xl font-bold text-center text-indigo-800" style={{ textWrap: 'balance' }}>
                            {minutosAString(trabajadoresMasHorasEsteMes[0].workedThisMonth)}
                        </div>
                        <a href={route('company.workers.show', { worker: trabajadoresMasHorasEsteMes[0].worker })} className="text-indigo-800 hover:text-white">
                            <div className="flex justify-end items-center gap-2 ">
                                <p className="text-sm">
                                    ver trabajador
                                </p>
                                <HiArrowRight />
                            </div>
                        </a>
                    </div>
                    <div className="p-6 rounded-lg bg-white flex flex-col">
                        <div className="text-2xl text-slate-600 text-center font-bold" style={{ textWrap: 'balance' }}>
                            Trabajadores con más horas este mes
                        </div>
                        <div className="flex flex-col bg-slate-50 w-full h-full mt-2 rounded-lg p-2 gap-2 relative">
                            {/* <div className="absolute bottom-0 w-full bg-gradient-to-t from-slate-50 to-transparent h-3/5 -ms-2">

                            </div> */}
                            {trabajadoresMasHorasEsteMes.map((worker, index) => {
                                if (index < 3) {

                                    return (
                                        <a href={route('company.workers.show', { worker: worker.worker })}>
                                            <div className="flex justify-between items-center p-2 px-4 bg-indigo-200 w-full rounded-lg group hover:bg-indigo-400">
                                                <div className="flex gap-3">
                                                    <p className="font-bold text-slate-700 group-hover:text-white">{worker.worker.name}</p>
                                                    <p className="font-semibold text-indigo-700 group-hover:text-white">{minutosAString(worker.workedThisMonth)}</p>
                                                </div>
                                                <p className="justify-self-end text-indigo-700 group-hover:text-white">
                                                    <HiArrowRight />
                                                </p>
                                            </div>
                                        </a>
                                    )
                                }
                            })}




                        </div>
                    </div>

                </div>
            </ShowLayout>

        </Layout>
    )
}