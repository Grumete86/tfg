import Layout from "@/Layouts/Layout";
import useShift from "@/hooks/useShift";
import { usePage } from "@inertiajs/react"
import WorkersShowLayout from "../Company/Workers/layout/WorkersShowLayout";
import WorkerShowElement from "../Company/Workers/partials/WorkerShowElement";
import InfoLayout from "@/Components/pages/Info";
import { Tooltip } from "react-tooltip";
import { HiXCircle, HiArrowRight, HiDocumentCheck } from "react-icons/hi2";
import ShiftDetail from "@/Components/shiftComponents/ShiftDetail";
import WorkerProfile from "@/Components/workerComponents/workerProfile";
import { WorkerProvider } from "@/Context/WorkerContext";

export default function Show() {
    const { worker, auth, shift } = usePage().props;
    const { actualShift, actualWorker, shiftInfo, handleChange, handleSave, handleDelete } = useShift({ workerWithShifts: worker, shift: shift, routePrefix: 'worker', editAvailable: true });
    return (
        <WorkerProvider workerWithShifts={worker} routePrefix='worker' statusChangeAvailable={true} >
            <Layout
                user={auth.user}
                header={<div className="flex font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">

                    <a href={route('worker.shifts.index')} className="hover:text-slate-500">
                        <h2 className="">{worker.name}</h2>
                    </a>
                    <span className="text-slate-500">
                        {' > '}
                        {(new Date(actualShift.start_time)).toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                </div>
                }>
                <div className="p-4 flex flex-col gap-2 items-center pb-8">

                    <WorkerProfile />

                    <div className="w-full sm:w-4/5 flex flex-col transition-all gap-2">

                        <ShiftDetail shift={actualShift} worker={actualWorker} route='worker' />
                    </div>

                </div>

            </Layout >
        </WorkerProvider >
    )
}