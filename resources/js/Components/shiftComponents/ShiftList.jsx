import { useWorker } from "@/Context/WorkerContext";
import ShiftCard from "./ShiftCard";

export default function ShiftList() {
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

    return (
        shiftsList.map((shift, index) => {
            return index < resultsToShow ?
                (
                    <ShiftCard worker={actualWorker} shift={shift} routePrefix={'worker'} key={shift.id} />
                )
                : index == resultsToShow ?
                    (
                        <button key={'cargar'} onClick={loadMore} className=" p-2 bg-blue-500 text-sm text-white hover:bg-blue-700  rounded-lg">
                            CARGAR MAS
                        </button>
                    ) : ('');
        })
    )
}