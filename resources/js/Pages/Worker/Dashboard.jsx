import Layout from "@/Layouts/Layout";
import ShowLayout from "@/Components/pages/Show";
import { usePage, Head } from "@inertiajs/react"
import useWorkerWithShifts from "@/hooks/useWorkerWithShifts";
import { WorkerProvider } from "@/Context/WorkerContext";
import useShift from "@/hooks/useShift";
import ShiftStatusComponent from "@/Components/shiftComponents/ShiftStatusComponent";
import { minutesToInterval, shiftDuration } from "@/helpers/helpers";
import { useEffect } from "react";
import { HiClock, HiArrowRight } from "react-icons/hi2";

export default function Dashboard() {
    const { worker, auth } = usePage().props;

    const { actualWorker,
        actualStatus,
        shiftsList,
        resultsToShow,
        totalWorked,
        totalWorkedMonth,
        handleStartEndShift,
        StatusElement,
        loadMore
    } = useWorkerWithShifts({
        workerWithShifts: worker,
        routePrefix: 'worker',
        fullRoute: 'worker.dashboard',
        statusChangeAvailable: true,
        isDashboard: true
    });


    return (
        <WorkerProvider workerWithShifts={actualWorker} routePrefix='worker' statusChangeAvailable={true}>
            <Layout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>
                }>
                <Head title={actualWorker.name} />
                <ShowLayout>
                    <div className="w-full min-h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
                        <div className="bg-white rounded-lg p-6 col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3 text-2xl ">
                            <div style={{ textWrap: 'balance' }} className="pb-2">
                                <span className="font-semi-bold">
                                    Hola
                                </span>
                                <span className="text-indigo-600 font-bold">
                                    {' ' + actualWorker.name}
                                    {actualStatus.status ?
                                        ', hora de salir?'

                                        : ', hora de entrar?'
                                    }
                                </span>
                            </div>
                            <div>
                                {
                                    actualStatus.status ?
                                        <div className='py-4'>
                                            <div style={{ textWrap: 'balance' }}>
                                                Tu turno ha empezado a las {(new Date(actualStatus.shift.start_time)).toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric' })}, llevas {
                                                    minutesToInterval(((new Date()) - (new Date(actualStatus.shift.start_time))) / 60000) > 0 ? minutesToInterval(((new Date()) - (new Date(actualStatus.shift.start_time))) / 60000).hours + ' h y ' : ''}
                                                {minutesToInterval(((new Date()) - (new Date(actualStatus.shift.start_time))) / 60000).minutes + ' minutos en tu puesto'}
                                            </div>
                                        </div>
                                        : ''
                                }
                            </div>
                            <button onClick={handleStartEndShift} className="mt-2 bg-indigo-500 p-4 px-6 rounded-xl text-white hover:bg-indigo-300 hover:text-indigo-800 transition-all">
                                {actualStatus.status ? 'SALIR' : 'ENTRAR'}
                            </button>
                        </div>
                        <div className="p-6 rounded-lg bg-white flex items-center justify-around">
                            <div>
                                <div className="text-2xl text-slate-600 text-center font-bold" style={{ textWrap: 'balance' }}>
                                    Horas totales
                                </div>
                                <div className="items-center text-8xl font-bold text-center text-indigo-600" style={{ textWrap: 'balance' }}>
                                    {totalWorked.hours + 'h ' + totalWorked.minutes + 'm'}
                                </div>
                            </div>

                        </div>
                        <div className="p-6 rounded-lg bg-white flex items-center justify-around">
                            <div>
                                <div className="text-2xl text-slate-600 text-center font-bold" style={{ textWrap: 'balance' }}>
                                    Horas este mes
                                </div>
                                <div className="items-center text-8xl font-bold text-center text-indigo-600" style={{ textWrap: 'balance' }}>
                                    {totalWorkedMonth.hours + 'h ' + totalWorkedMonth.minutes + 'm'}
                                </div>
                            </div>

                        </div>





                        <div className="bg-white rounded-lg p-6 col-span-1 sm:col-span-2 xl:col-span-3">
                            Tus últimos turnos:
                            <div className="flex flex-col bg-slate-100 rounded-lg w-full p-2 gap-2 ">
                                {shiftsList.map((shift, index) => {
                                    if (index < 5) {
                                        return (
                                            <a href={route('worker.shifts.show', { shift: shift })} key={shift.id}>
                                                <div className="flex flex-col sm:flex-row justify-between gap-2 bg-indigo-200 p-2 rounded-lg font-bold text-indigo-800 items-center group hover:bg-indigo-700 hover:text-white">
                                                    <div>

                                                        {new Date(shift.start_time).toLocaleString('es-ES', { weekday: 'short', day: 'numeric', month: 'long' })}
                                                    </div>
                                                    <div className="bg-slate-100 flex flex-row items-center gap-2 rounded-lg px-2 text-indigo-800">
                                                        <HiClock />
                                                        <div>
                                                            {new Date(shift.start_time).toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric' })}
                                                        </div>
                                                        -
                                                        <div>
                                                            {shift.end_time ?
                                                                new Date(shift.end_time).toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric' })
                                                                : 'en curso'
                                                            }
                                                        </div>
                                                    </div>
                                                    <div>{`Duracion: ${shiftDuration(shift).hoursString + 'h' + shiftDuration(shift).minutesString + 'm'}`}
                                                    </div>
                                                    <div className="self-end text-2xl">
                                                        <HiArrowRight />
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    }
                                })}
                                <div>

                                </div>

                            </div>
                        </div>

                    </div>
                </ShowLayout>
            </Layout>
        </WorkerProvider >
    )
}

const minutosAString = (minutos) => {
    return '' + Math.trunc(minutos / 60) + 'h ' + Math.trunc(minutos % 60) + 'm';
}