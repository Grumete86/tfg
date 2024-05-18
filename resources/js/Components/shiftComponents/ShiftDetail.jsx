import useShift from "@/hooks/useShift";
import { Tooltip } from "react-tooltip";
import { HiXCircle, HiArrowRight, HiDocumentCheck } from "react-icons/hi2";


export default function ShiftDetail({ shift, worker, route, ...props }) {
    console.log(worker);
    const { className } = props;
    const { actualShift, actualWorker, shiftInfo, handleStartChange, handleEndChange, handleSave, handleDelete } = useShift({ workerWithShifts: worker, shift: shift, routePrefix: route });
    return (
        <div className="bg-white text-slate-700 rounded-lg p-2 w-full ">
            <form className="w-full" onSubmit={handleSave}>
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
                                    onChange={handleStartChange}
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
                                    onChange={handleEndChange}

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
    )
}