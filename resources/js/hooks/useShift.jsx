import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { isInShift, getTotalMinutes, getTotalMinutesInMonth, sortShifts, printMonth, getShiftProperties } from '@/helpers/helpers';

export default function useShift({ workerWithShifts, shift, routePrefix, editAvailable = true }) {
    const [actualWorker, setActualWorker] = useState(workerWithShifts);
    const [actualShift, setActualShift] = useState(shift);
    const [shiftInfo, setShiftInfo] = useState(
        getShiftProperties(shift)
    )
    const { data, setData, patch, delete: destroy, reset } = useForm(shift);

    function handleShiftChange(shift) {
        setShiftInfo(getShiftProperties(shift));
    }

    const updateFunction = (updatedShift) => {
        setActualShift({ ...updatedShift.props.shift });
    }
    useEffect(() => {
        setActualShift(shift);
        handleShiftChange(shift);
        setData(shift);
    }, [workerWithShifts]);


    function handleStartChange(e) {
        const newShift = { ...actualShift };
        const [hours, mins] = e.target.value.split(":");
        const date = new Date(newShift.start_time);

        date.setHours(hours);
        date.setMinutes(mins);

        newShift[e.target.id] = date.toISOString();
        handleShiftChange(newShift);
        setActualShift(newShift);
        setData(newShift);
    }
    function handleEndChange(e) {
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

    function handleSave(e) {
        e.preventDefault();
        patch(route(routePrefix + '.shifts.update', { shift: actualShift }), {
            preserveScroll: true,
            onSuccess: (response) => { updateFunction(response) },
            onError: () => { },
            onFinish: () => { reset() },
        });
    }
    function handleDelete(e) {
        e.preventDefault();
        destroy(route(routePrefix + '.shifts.destroy', { shift: actualShift }), {
            preserveScroll: true,
            onSuccess: (response) => { updateFunction(response) },
            onError: (error) => { console.log(error) },
            onFinish: () => { reset() },
        });
    }

    return {
        actualWorker,
        actualShift,
        shiftInfo,
        handleStartChange,
        handleEndChange,
        handleSave,
        handleDelete
    }
}