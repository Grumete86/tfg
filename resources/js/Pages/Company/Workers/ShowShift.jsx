import { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import { useForm, usePage, Head } from "@inertiajs/react";
import IndexRow from "./partials/IndexRow";
import WorkerRow from "./partials/WorkerRow";
import InfoLayout from "@/Components/pages/Info";
import ShowRow from "./partials/ShowRow";
import { HiClock } from "react-icons/hi2";
import { HiArrowRight } from "react-icons/hi2";
import { HiXCircle } from "react-icons/hi2";
import { HiDocumentCheck } from "react-icons/hi2";
import WorkersShowLayout from "./layout/WorkersShowLayout";
import WorkerShowElement from "./partials/WorkerShowElement";
import { Tooltip } from 'react-tooltip'
import DeleteModal from "./partials/DeleteModal";


export default function ShowShift() {
    const initialMax = 10;
    const [resultsToShow, setResultsToShow] = useState(initialMax);
    const { worker, shift, auth, errors } = usePage().props;
    const [actualWorker, setActualWorker] = useState(worker);
    const [actualShift, setActualShift] = useState(shift);
    const [shiftInfo, setShiftInfo] = useState(
        getShiftProperties(shift)
    )
    const { data, setData, patch, delete: destroy, reset } = useForm(shift);

    function handleShiftChange(shift) {
        console.log(shift);
        setShiftInfo(getShiftProperties(shift));
    }

    const updateFunction = (updatedShift) => {
        setActualShift(updatedShift.props.shift);
    }
    useEffect(() => {
        setActualShift(shift);
        handleShiftChange(shift);
        setData(shift);
    }, [worker]);


    function handleChange(e) {
        const newShift = { ...actualShift };
        const [hours, mins] = e.target.value.split(":");
        const date = new Date(newShift.start_time);
        if (date.getHours() > hours) {
            date.setDate(date.getDate() + 1);
        }
        date.setHours(hours);
        date.setMinutes(mins);

        newShift[e.target.id] = date.toISOString();
        handleShiftChange(newShift);
        setActualShift(newShift);
        setData(newShift);
    }


    const loadMoreElements = () => {
        setResultsToShow(resultsToShow + initialMax);
    }

    function handleSubmit(e) {
        e.preventDefault();
        patch(route('company.shifts.update', { shift: actualShift }), {
            preserveScroll: true,
            onSuccess: (response) => { updateFunction(response) },
            onError: () => { },
            onFinish: () => { reset() },
        });
    }
    function handleDelete(e) {
        e.preventDefault();
        destroy(route('company.shifts.destroy', { shift: actualShift }), {
            preserveScroll: true,
            onSuccess: (response) => { updateFunction(response) },
            onError: (error) => { console.log(error) },
            onFinish: () => { reset() },
        });
    }

    return (
        <>

            <Head title={`Turno de ${shiftInfo.start_time.toLocaleString('es-ES', {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            })
                }`} />
            <Layout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        <a href={route('company.workers.index')} className="hover:text-slate-500">
                            Trabajadores
                        </a>
                        <a href={route('company.workers.show', { worker: actualWorker })} className="hover:text-slate-500">
                            {' > '}
                            {actualWorker.name}
                        </a>
                        <span className="text-slate-500">
                            {' > '}
                            {shiftInfo.start_time.toLocaleString('es-ES', {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </span>
                    </h2>}
            >
                <WorkersShowLayout>
                    <WorkerShowElement worker={actualWorker} updateFunction={updateFunction} />
                    <InfoLayout>
                        <>
                            <div className="bg-white text-slate-700 rounded-lg p-2 w-full ">
                                <form className="w-full" onSubmit={handleSubmit}>
                                    <div className="flex flex-row items-center gap-6 content-stretch">

                                        <div className="grid grid-rows-3 justify-center w-20 mx-1 p-2 bg-slate-200 rounded-lg text-slate-700">
                                            <p className="text-xs text-center">
                                                {shiftInfo.start_time.toLocaleDateString('es-ES', { weekday: 'short' })}
                                            </p>
                                            <div className="row-span-2 text-2xl font-bold place-content-center text-center">
                                                {shiftInfo.start_time.toLocaleDateString('es-ES', { day: 'numeric' })}
                                            </div>
                                            <p className="text-xs text-center">
                                                {shiftInfo.start_time.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>

                                        <div className="flex-1">
                                            <div className=" text-lg font-semibold" >
                                                <span data-tooltip-id="duracion"
                                                    data-tooltip-content="duración">
                                                    {`${shiftInfo.duration.hoursString}h ${shiftInfo.duration.minutesString}m`}
                                                </span>
                                            </div>
                                            <Tooltip id="duracion" />
                                            <hr className="max-w-3/5" />
                                            <div className="flex justify-start flex-wrap items-start sm:items-center gap-2 text-slate-400 pt-2">

                                                <div className="relative">
                                                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="time"
                                                        id="start_time"
                                                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={shiftInfo.start_time_HHMM}
                                                        onChange={handleChange}
                                                        required
                                                        data-tooltip-id="comienzo"
                                                        data-tooltip-content="Comienzo turno"
                                                    />
                                                    <Tooltip id="comienzo" />
                                                </div>

                                                <div className="relative">
                                                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>

                                                    <input
                                                        type="time"
                                                        id="end_time"
                                                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={shiftInfo.end_time_HHMM}
                                                        onChange={handleChange}

                                                        data-tooltip-id="final"
                                                        data-tooltip-content="Final turno"
                                                    />
                                                    <Tooltip id="final" />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 text-lg">

                                            <button
                                                onClick={handleDelete}
                                                className="bg-red-600 text-white rounded-lg p-3 hover:bg-red-500 hover:text-red-900"
                                                data-tooltip-id="delete"
                                                data-tooltip-content="borrar"
                                            >
                                                <HiXCircle />
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-green-600 text-white rounded-lg p-3 hover:bg-green-500 hover:text-green-900"
                                                data-tooltip-id="save"
                                                data-tooltip-content="guardar"
                                            >
                                                <HiDocumentCheck />
                                            </button>
                                            <Tooltip id="delete" />
                                            <Tooltip id="save" />

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                    </InfoLayout >
                </WorkersShowLayout >
            </Layout >
        </>
    )
}



const shiftDuration = (shift) => {
    let { start_time, end_time } = shift;
    start_time = new Date(start_time);
    end_time = end_time ? new Date(end_time) : end_time = new Date();


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
function sortShifts(list) {
    list.sort((a, b) => {
        if (a.start_time < b.start_time) return 1;
        if (a.start_time > b.start_time) return -1;
        return 0;
    })
    return list
}

function dateToHHMM(date) {
    return date.toLocaleTimeString('es-ES', { hour: "2-digit", minute: "2-digit" });
}

function getShiftProperties(shift) {
    console.log(shift);
    const start = shift.start_time;
    const end = shift.end_time;
    console.log(end)
    return {
        start_time: (new Date(start)),
        end_time: end ? (new Date(end)) : null,
        duration: shiftDuration(shift),
        start_time_HHMM: dateToHHMM(new Date(shift.start_time)),
        end_time_HHMM: end ? dateToHHMM(new Date(end)) : '',
    }
}