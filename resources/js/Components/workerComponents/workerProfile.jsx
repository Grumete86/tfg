import useWorkerWithShifts from "@/hooks/useWorkerWithShifts"
import { useWorker } from "@/Context/WorkerContext";

export default function WorkerProfile({ worker, routePrefix, updateFunction }) {

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
        <div className="w-full sm:w-4/5 bg-white transition-all shadow-lg rounded-lg dark:bg-gray-800 ">
            <div className="flex flex-col items-center justify-center p-4 mt-2">
                <img
                    alt="profil"
                    src={`https://ui-avatars.com/api/?name=${actualWorker.name}`}
                    className="mx-auto object-cover rounded-full h-16 w-16  border-2 border-white dark:border-gray-800" />

                <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white ">
                    {actualWorker.name}
                </p>
                <p className="mb-4 text-xs text-gray-400 group-hover:text-slate-200">
                    {actualWorker.dni}
                </p>
                <p className="p-2 px-4 text-xs text-white bg-indigo-300 rounded-full ">
                    {actualWorker.email}
                </p>
                <div className="w-full p-2 mt-4 rounded-lg">
                    <div className="grid grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 items-center justify-center text-sm text-gray-600 dark:text-gray-200 ">
                        <p className="flex flex-col text-center">
                            Horas totales
                            <span className="font-bold text-black dark:text-white ">
                                {`${totalWorked.hours}h ${totalWorked.minutes}m`}
                            </span>
                        </p>
                        <div className="mx-1 px-2 text-center flex justify-center">
                            <StatusElement />
                        </div>
                        <p className="flex flex-col text-center">
                            Horas este mes
                            <span className="font-bold text-black dark:text-white ">
                                {`${totalWorkedMonth.hours}h ${totalWorkedMonth.minutes}m`}
                            </span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}