import { useWorker } from "@/Context/WorkerContext";
import useShift from "@/hooks/useShift";
import { useEffect } from "react";

export default function ShiftStatusComponent({ className = '' }) {
    let shiftToUse;
    const {
        actualWorker,
        actualStatus,
        shiftsList,
        resultsToShow,
        totalWorked,
        totalWorkedMonth,
        handleStartEndShift,
        StatusElement,
        loadMore
    } = useWorker();
    useEffect(() => {
        console.log(actualStatus.shift)
        if (actualStatus.shift) {
            shiftToUse = actualStatus.shift;
        }
        else {
            shiftToUse = null;
        }
    }, [actualStatus])
    const { actualShift,
        shiftInfo,
        handleChange,
        handleSave,
        handleDelete
    } = useShift({
        workerWithShifts: actualWorker,
        shift: shiftToUse,
        routePrefix: 'worker',
        editAvailable: true
    });


    return (
        shiftToUse ?
            <div className={`${className} py-4`}>
                <div style={{ textWrap: 'balance' }}>
                    Tu turno ha empezado a las {shiftInfo.start_time_HHMM}, llevas {shiftInfo.duration.hoursString > 0 ? shiftInfo.duration.hoursString + ' horas y ' : ''}{shiftInfo.duration.minutes + ' minutos en tu puesto'}
                </div>
            </div>
            : 'Loading...'
    )


}