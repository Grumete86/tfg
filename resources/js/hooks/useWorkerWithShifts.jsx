import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { isInShift, getTotalMinutes, getTotalMinutesInMonth, sortShifts, printMonth } from '@/helpers/helpers';

export default function useWorkerWithShifts({ workerWithShifts, routePrefix, statusChangeAvailable = false, paginationElements = 10, isDashboard = false }) {
    let lastMonth = 0;
    const initialMax = paginationElements;
    const [resultsToShow, setResultsToShow] = useState(initialMax);
    const [actualWorker, setActualWorker] = useState(workerWithShifts);
    const { data, setData, post, errors, reset, patch } = useForm(workerWithShifts);


    useEffect(() => {
        // Actualizar el estado del trabajador cuando se pasa un nuevo objeto desde PHP
        setActualWorker(data);
    }, [data]);

    function updateFunction(updatedWorker) {
        const worker = { ...updatedWorker.props.worker };
        console.log(worker);
        setData(worker);
        setActualWorker(worker);
    }

    const handleStartEndShift = () => {
        if (isInShift(actualWorker).status) { endShift() }
        else { startShift() }
    }
    const startShift = () => {
        post(route(routePrefix + '.startShift', { workerId: actualWorker.id, dashboard: isDashboard }), {
            preserveScroll: true,
            onSuccess: (response) => { updateFunction(response) },
            onError: () => { },
            onFinish: () => { reset() },
        });
    };
    const endShift = () => {
        post(route(routePrefix + '.endShift', { shiftId: isInShift(actualWorker).shift.id, dashboard: isDashboard }), {
            preserveScroll: true,
            onSuccess: (response) => { console.log(response); updateFunction(response) },
            onError: () => { },
            onFinish: () => { reset() },
        });
    };

    const StatusElement = () => {
        return (
            <Status handleStartEndShift={handleStartEndShift}
                workerStatus={isInShift(actualWorker)}
                clickAvailable={statusChangeAvailable}
            />
        )
    }
    const loadMoreElements = () => {
        setResultsToShow(resultsToShow + initialMax);
    }


    return {
        actualWorker,
        actualStatus: isInShift(actualWorker),
        shiftsList: sortShifts(actualWorker.shifts),
        resultsToShow,
        totalWorked: getTotalMinutes(actualWorker.shifts),
        totalWorkedMonth: getTotalMinutesInMonth(actualWorker.shifts),
        handleStartEndShift,
        StatusElement,
        loadMore: loadMoreElements,
        updateFunction
    };
}

function Status({ handleStartEndShift, workerStatus, clickAvailable = false }) {
    const [hoverState, setHoverState] = useState(false);

    return (
        clickAvailable
            ?
            <button
                className={`w-28 p-1 px-2 rounded-lg justify-normal text-white ${hoverState ?
                    (workerStatus.status ? 'bg-red-400 text-red-800' : 'bg-green-400 text-green-800') :
                    (workerStatus.status ? 'bg-green-400 text-white' : 'bg-red-400 text-white')
                    }`}
                onMouseEnter={() => { setHoverState(true) }}
                onMouseLeave={() => { setHoverState(false) }}
                onClick={handleStartEndShift}
                style={{ fontSize: '0.5rem' }}
            >
                {hoverState ?
                    (workerStatus.status ? 'SALIR' : 'ENTRAR') :
                    (workerStatus.status ? 'TRABAJANDO' : 'FUERA DEL TRABAJO')
                }
            </button>

            :

            <div
                className={`w-28 p-1 px-2 rounded-lg justify-normal text-white ${(workerStatus.status ? 'bg-green-400 text-white' : 'bg-red-400 text-white')
                    }`}

                style={{ fontSize: '0.5rem' }}
            >
                {
                    workerStatus.status ? 'TRABAJANDO' : 'FUERA DEL TRABAJO'
                }
            </div>

    );
}