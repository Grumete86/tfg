import Layout from "@/Layouts/Layout";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import IndexLayout from "@/Components/pages/Index";
import IndexRow from "@/Components/pages/partials/IndexRow";
import IndexRowButton from "@/Components/pages/partials/IndexRowButtons";
import { Head } from "@inertiajs/react";
export default function Index({ auth, admins }) {
    const [adminList, setAdminList] = useState(admins);

    const updateAdmin = (updatedAdmins) => {
        setAdminList(updatedAdmins);
    }


    return (
        <>
            <Head title="Administradores" />
            <Layout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Administradores</h2>}
            >
                <IndexLayout>
                    <CreateModal className="max-w-xl" updateAdmin={updateAdmin} />
                    {admins.map(admin => (
                        <IndexRow key={admin.id} className="p-2">
                            <div>{admin.name}</div>
                            <IndexRowButton>
                                <EditModal className="max-w-xl" admin={admin} updateAdmin={updateAdmin} />

                                <DeleteModal className="bg-red-300 px-2 py-1 rounded" admin={admin} updateAdmin={updateAdmin}>BORRAR</DeleteModal>
                            </IndexRowButton>
                        </IndexRow>
                    ))}
                    <CreateModal className="max-w-xl" updateAdmin={updateAdmin} />
                </IndexLayout>
            </Layout>
        </>
    )
}

