import useWorkerWithShifts from "@/hooks/useWorkerWithShifts";

export default function WorkerCard({ worker, routeTo }) {
    const routePrefix = routeTo.split('.')[0];
    const {
        actualWorker,
        actualStatus,
        totalWorked,
        totalWorkedMonth,
        StatusElement
    } = useWorkerWithShifts({ workerWithShifts: worker, routePrefix: routePrefix, statusChangeAvailable: false })

    return (
        <a href={route(routeTo, { worker: actualWorker })}>
            <div className="bg-white transition-all shadow-lg rounded-lg w-80 dark:bg-gray-800 hover:bg-slate-400 group group-hover:text-white hover:cursor-pointer">
                <div className="flex flex-col items-center justify-center p-4 mt-2">
                    <img
                        alt="profil"
                        src={`https://ui-avatars.com/api/?name=${actualWorker.name}`}
                        className="mx-auto object-cover rounded-full h-16 w-16  border-2 border-white dark:border-gray-800" />
                    <div className="p-2 px-4 ">
                        <StatusElement />
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
    )
}