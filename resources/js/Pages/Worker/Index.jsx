import Layout from "@/Layouts/Layout";
import { usePage } from "@inertiajs/react"
import useWorkerWithShifts from "@/hooks/useWorkerWithShifts";
import Status from "../Company/Workers/partials/Status";
import ShiftCard from "@/Components/shiftComponents/ShiftCard";
import WorkerCard from "@/Components/workerComponents/workerCard";
import WorkerProfile from "@/Components/workerComponents/workerProfile";
import { useWorker } from "@/Context/WorkerContext";
import { WorkerProvider } from "@/Context/WorkerContext";
import ShiftList from "@/Components/shiftComponents/ShiftList";

export default function Index() {
    const { worker, auth } = usePage().props;

    return (
        <WorkerProvider workerWithShifts={worker} routePrefix='worker' statusChangeAvailable={true}>
            <Layout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{worker.name}</h2>
                }>
                <div className="p-4 flex flex-col gap-2 items-center pb-8">
                    <WorkerProfile />
                    <div className="w-full sm:w-4/5 flex flex-col transition-all gap-2">
                        <ShiftList />
                    </div>
                </div>
            </Layout>
        </WorkerProvider >
    )
}