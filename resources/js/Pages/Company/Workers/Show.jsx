import { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import { usePage, Head } from "@inertiajs/react";
import IndexRow from "./partials/IndexRow";
import WorkerRow from "./partials/WorkerRow";
import InfoLayout from "@/Components/pages/Info";
import ShowRow from "./partials/ShowRow";
import { HiClock } from "react-icons/hi2";
import { HiArrowRight } from "react-icons/hi2";
import WorkersShowLayout from "./layout/WorkersShowLayout";
import WorkerShowElement from "./partials/WorkerShowElement";

export default function Show() {
    const initialMax = 10;
    const [resultsToShow, setResultsToShow] = useState(initialMax);

    const { worker, auth, errors } = usePage().props;

    const newShiftList = worker.shifts.map(shift => ({ ...shift, start_time: new Date(shift.start_time), end_time: shift.end_time && new Date(shift.end_time) }));
    const [actualWorker, setActualWorker] = useState(worker);
    const [shiftsList, setShiftsList] = useState(sortShifts(worker.shifts));

    const updateFunction = (updatedWorker) => {
        setWorkerList(updatedWorker.props.worker);
    }

    useEffect(() => {
        setActualWorker(worker);
        setShiftsList(worker.shifts);
    }, [worker]);


    let lastMonth = 0;
    const printMonth = (date) => {
        const options = {
            year: "numeric",
            month: "long",
        }
        const month = date.getMonth() + 1;
        if (lastMonth == 0 || month != lastMonth) {
            lastMonth = month;
            return date.toLocaleDateString('es-ES', options)
        }
        return '';
    }
    const loadMoreElements = () => {
        setResultsToShow(resultsToShow + initialMax);
    }
    return (
        <>
            <Head title={`${actualWorker.name}`} />
            <Layout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        <a href={route('company.workers.index')} className="hover:text-slate-500">
                            Trabajadores
                        </a>
                        <span className="text-slate-500">
                            {' > '}
                            {actualWorker.name}
                        </span>
                    </h2>}
            >
                <WorkersShowLayout>
                    <WorkerShowElement worker={actualWorker} updateFunction={updateFunction} />
                    <InfoLayout>
                        {
                            shiftsList.map((shift, index) => {
                                const start_time = (new Date(shift.start_time));
                                const end_time = shift.end_time ? (new Date(shift.end_time)) : null;
                                const duration = shift.end_time ? shiftDuration(start_time, end_time) : shiftDuration(start_time, new Date());

                                return (
                                    index < resultsToShow ?
                                        <>
                                            {printMonth(start_time)}
                                            <a href={route('company.shifts.show', { 'shift': shift })}>
                                                <div key={shift.id} className="bg-white text-slate-700 hover:text-white rounded-lg p-2 w-full hover:bg-slate-600 hover:cursor-pointer">
                                                    <div className="flex flex-row items-center gap-6">

                                                        <div className="grid grid-rows-3 justify-center w-20 mx-1 p-2 bg-slate-200 rounded-lg text-slate-700">
                                                            <p className="text-xs text-center">
                                                                {start_time.toLocaleDateString('es-ES', { weekday: 'short' })}
                                                            </p>
                                                            <div className="row-span-2 text-2xl font-bold place-content-center">
                                                                {start_time.toLocaleDateString('es-ES', { day: 'numeric' })}
                                                            </div>
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className=" text-lg font-semibold">
                                                                {`${duration.hoursString}h ${duration.minutesString}m`}
                                                            </div>
                                                            <hr className="max-w-3/5" />
                                                            <div className="flex flex-row justify-start items-center gap-2 text-slate-400">
                                                                <HiClock />
                                                                <span>
                                                                    {start_time.toLocaleTimeString('es-ES', { hour: "2-digit", minute: "2-digit" })}
                                                                    {' - '}
                                                                    {end_time ? end_time.toLocaleTimeString('es-ES', { hour: "2-digit", minute: "2-digit" }) : <span className='text-green-600 text-sm'>en curso</span>}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <HiArrowRight />
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </> :
                                        index == resultsToShow ?
                                            <div className="w-full flex justify-center p-4">
                                                <button className="bg-indigo-600 text-xs text-white max-w-32 rounded-lg p-2 px-4" onClick={loadMoreElements}>
                                                    CARGAR MAS
                                                </button>
                                            </div>
                                            :
                                            <></>

                                )
                            })}
                    </InfoLayout>
                </WorkersShowLayout>

            </Layout >
        </>
    )
}

const shiftDuration = (start_time, end_time) => {
    if (start_time instanceof Date && end_time instanceof Date) {
        Math.abs(start_time - end_time);
        const hours = Math.floor(Math.abs(start_time - end_time) / 3600000);
        const minutes = Math.floor(Math.abs(start_time - end_time) / 60000) - (hours * 60);
        return {
            hours: hours || 0,
            minutes: minutes || 0,
            hoursString: hours < 10 ? `0${hours}` : hours,
            minutesString: minutes < 10 ? `0${minutes}` : minutes,
        }
    }
    return {
        hours: 0,
        minutes: 0,
        hoursString: '00',
        minutesString: '00',
    }
}
function sortShifts(list) {
    list.sort((a, b) => {
        if (a.start_time < b.start_time) return 1;
        if (a.start_time > b.start_time) return -1;
        return 0;
    })
    return list
}