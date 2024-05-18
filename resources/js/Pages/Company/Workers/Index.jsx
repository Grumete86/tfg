import { useState, useCallback } from "react";
import { usePage, Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import WorkersIndexLayout from "./layout/WorkersIndexLayout";
import IndexRow from "./partials/IndexRow";
import WorkerCardIndex from "./partials/WorkerCardIndex";
import { router } from "@inertiajs/react";

export default function Index() {
    const { workers, auth, errors } = usePage().props;
    const [workersList, setWorkersList] = useState(workers);
    const updateFunction = (updatedWorkers) => {

        setWorkersList(updatedWorkers.props.workers);
    }
    return (
        <>
            <Head title={`Tus trabajadores`} />
            <Layout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Trabajadores</h2>}
            >
                <WorkersIndexLayout>
                    {workersList.map(worker => <WorkerCardIndex key={worker.id} worker={worker} updateFunction={updateFunction} />)}
                </WorkersIndexLayout >
            </Layout>
        </>
    )
}

