import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Status from "./Status";

const today = new Date();
const todayDate = today.getDate();
const thisMonth = today.getMonth();
const thisYear = today.getFullYear();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);


export default function WorkerCardIndex({ worker, updateFunction }) {

    const initialWorker = worker;
    const [actualWorker, setWorker] = useState(initialWorker);
    const [actualStatus, setActualStatus] = useState(isInShift(initialWorker));
    const { data, setData, post, errors, reset, patch } = useForm(initialWorker);
    const [totalWorked, setTotalWorked] = useState(getTotalMinutes(initialWorker.shifts));
    const [totalWorkedMonth, setTotalWorkedMonth] = useState(getTotalMinutesInMonth(initialWorker.shifts));
    useEffect(() => {
        // Actualizar el estado del trabajador cuando se pasa un nuevo objeto desde PHP
        setWorker(initialWorker);
        setActualStatus(isInShift(initialWorker));
        setTotalWorked(getTotalMinutes(initialWorker.shifts));
        setTotalWorkedMonth(getTotalMinutesInMonth(initialWorker.shifts));
    }, [initialWorker]);

    const handleStartEndShift = () => {
        if (actualStatus.status) { endShift(); }
        else { startShift() }
    }
    const startShift = () => {

        post(route('company.startShift', { workerId: actualWorker.id }), {
            preserveScroll: true,
            onSuccess: (response) => { updateFunction(response) },
            onError: () => { },
            onFinish: () => { reset() },
        });
    };
    const endShift = () => {

        post(route('company.endShift', { shiftId: actualStatus.shift.id }), {
            preserveScroll: true,
            onSuccess: (response) => { updateFunction(response) },
            onError: () => { },
            onFinish: () => { reset() },
        });
    };


    return (
        <>
            <a href={route('company.workers.show', { worker: actualWorker })}>
                <div className="bg-white transition-all shadow-lg rounded-lg w-80 dark:bg-gray-800 hover:bg-slate-400 group group-hover:text-white hover:cursor-pointer">
                    {/* <img alt="profil" src="https://random.imagecdn.app/320/150" className="w-full mb-4 rounded-t-lg h-28" /> */}
                    <div className="flex flex-col items-center justify-center p-4 mt-2">
                        <img
                            alt="profil"
                            src={`https://ui-avatars.com/api/?name=${actualWorker.name}`}
                            className="mx-auto object-cover rounded-full h-16 w-16  border-2 border-white dark:border-gray-800" />
                        <div className="p-2 px-4 ">
                            <Status workerStatus={actualStatus} />
                        </div>
                        <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white group-hover:text-white">
                            {actualWorker.name}
                        </p>
                        <p className="mb-4 text-xs text-gray-400 group-hover:text-slate-200">
                            {actualWorker.dni}
                        </p>
                        <p className="p-2 px-4 text-xs text-white bg-indigo-300 rounded-full group-hover:bg-indigo-500 ">
                            {actualWorker.email}
                        </p>


                        <div className="w-full p-2 mt-4 rounded-lg">
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200 group-hover:text-white">
                                <p className="flex flex-col text-center">
                                    Horas totales
                                    <span className="font-bold text-black dark:text-white group-hover:text-white">
                                        {`${totalWorked.hours}h ${totalWorked.minutes}m`}
                                    </span>
                                </p>

                                <p className="flex flex-col text-center">
                                    Horas este mes
                                    <span className="font-bold text-black dark:text-white group-hover:text-white">
                                        {`${totalWorkedMonth.hours}h ${totalWorkedMonth.minutes}m`}
                                    </span>
                                </p>

                            </div>
                        </div>

                    </div>
                </div>
            </a>
        </>
    );
}


const calculateMinutes = ({ hours, minutes }) => hours * 60 + minutes;

const getTotalMinutes = (shifts) => {
    return minutesToInterval(shifts.reduce((accum, shift) => accum + (shiftIsFinished(shift) ? calculateMinutes(shiftDuration(shift)) : 0), 0));
};

const getTotalMinutesInMonth = (shifts) => {
    return minutesToInterval(shifts.reduce((accum, shift) => {
        if (shiftIsFinished(shift) && shiftIsThisMonth(shift)) {
            const duration = shiftDuration(shift);
            return accum + calculateMinutes(duration);
        }
        return accum;
    }, 0));
};

const minutesToInterval = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return { hours, minutes };
};
const shiftDuration = (shift) => {
    if (shift.end_time) {
        const start_time = new Date(shift.start_time);
        const end_time = new Date(shift.end_time);
        const durationMillis = Math.abs(end_time - start_time);
        const hours = Math.floor(durationMillis / 3600000);
        const minutes = Math.floor((durationMillis % 3600000) / 60000);
        return { hours, minutes };
    }
    return { hours: 0, minutes: 0 };
};
const shiftIsFinished = (shift) => {
    return shift.end_time != null;
};
const shiftIsThisMonth = (shift) => {
    const start_time = new Date(shift.start_time);

    return start_time.getMonth() === thisMonth && start_time.getFullYear() === thisYear;
};
const matchesDate = (start_time, end_time, date) => {
    return start_time.getDate() === date.getDate() &&
        start_time.getMonth() === date.getMonth() &&
        start_time.getFullYear() === date.getFullYear() &&
        end_time == null;
};
const isInShift = (worker) => {

    const todayShift = worker.shifts.find(shift => {
        const start_time = new Date(shift.start_time);
        const end_time = shift.end_time ? new Date(shift.end_time) : null;
        return matchesDate(start_time, end_time, today) || matchesDate(start_time, end_time, yesterday);
    });
    return todayShift ? { status: true, shift: todayShift } : { status: false, shift: null };
};