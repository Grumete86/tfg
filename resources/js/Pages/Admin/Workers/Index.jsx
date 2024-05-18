import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import Layout from "@/Layouts/Layout";
import IndexLayout from "@/Components/pages/Index";
import IndexRow from "@/Components/pages/partials/IndexRow";
import IndexRowButton from "@/Components/pages/partials/IndexRowButtons";
import useDeleteForm from "@/hooks/useDeleteForm";


export default function Index({ auth, workers, companies }) {


    const [workerList, setWorkerList] = useState(workers);
    const updateWorker = (updatedWorkers) => {
        setWorkerList(updatedWorkers.props.workers);
    }
    return (
        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Trabajadores</h2>}
        >
            <IndexLayout>
                <CreateModal className="max-w-xl" updateWorker={updateWorker} companies={companies} />
                {workerList.map(worker => {

                    return (
                        <IndexRow key={worker.id} className="p-2">
                            <a href={route('admin.workers.show', worker)} >
                                {worker.name} {worker.email} {worker.works_at.name}
                            </a>
                            <IndexRowButton>
                                <EditModal className="max-w-xl" worker={worker} companies={companies} updateWorker={updateWorker} />
                                <DeleteModal className="max-w-xl" worker={worker} updateWorker={updateWorker} />
                            </IndexRowButton>
                        </IndexRow>
                    )
                })
                }
                <CreateModal className="max-w-xl" updateWorker={updateWorker} companies={companies} />

            </IndexLayout >
        </Layout>
    )
}

