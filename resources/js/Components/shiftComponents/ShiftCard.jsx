import useShift from "@/hooks/useShift";
import { HiClock } from "react-icons/hi2";
import { HiArrowRight } from "react-icons/hi2";
import { useWorker } from "@/Context/WorkerContext";


export default function ShiftCard({ worker, shift, routePrefix, props }) {
    const { actualShift,
        actualWorker,
        shiftInfo,
        handleChange,
        handleSave,
        handleDelete
    } = useShift({ workerWithShifts: worker, shift: shift, routePrefix: routePrefix });
    return (
        <>
            <a href={route(routePrefix + '.shifts.show', { shift: actualShift })}>
                <div key={shift.id} className="bg-white text-slate-700 hover:text-white rounded-lg p-2 w-full hover:bg-slate-600 hover:cursor-pointer">
                    <div className="flex flex-row items-center gap-6">
                        <div className="grid grid-rows-3 justify-center w-20 mx-1 p-2 bg-slate-200 rounded-lg text-slate-700">
                            <p className="text-xs text-center">
                                {shiftInfo.start_time.toLocaleDateString('es-ES', { weekday: 'short' })}
                            </p>
                            <div className="row-span-2 text-2xl font-bold place-content-center">
                                {shiftInfo.start_time.toLocaleDateString('es-ES', { day: 'numeric' })}
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className=" text-lg font-semibold">
                                {`${shiftInfo.duration.hoursString}h ${shiftInfo.duration.minutesString}m`}
                            </div>
                            <hr className="max-w-3/5" />
                            <div className="flex flex-row justify-start items-center gap-2 text-slate-400">
                                <HiClock />
                                <span>
                                    {shiftInfo.start_time.toLocaleTimeString('es-ES', { hour: "2-digit", minute: "2-digit" })}
                                    {' - '}
                                    {shiftInfo.end_time ? shiftInfo.end_time.toLocaleTimeString('es-ES', { hour: "2-digit", minute: "2-digit" }) : <span className='text-green-600 text-sm'>en curso</span>}
                                </span>
                            </div>
                        </div>
                        <div>
                            <HiArrowRight />
                        </div>
                    </div>
                </div>
            </a>
        </>

    )

}