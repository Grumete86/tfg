import Modal from "@/Components/Modal";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import Layout from "@/Layouts/Layout";
import { HiPhone, HiMapPin, HiMap, HiEnvelope, HiArrowRight } from "react-icons/hi2";

export default function Index({ auth, company, manager, workers }) {
    const [workersList, setWorkersList] = useState(workers);

    console.log(workersList)
    const updateCompany = (updatedCompanies) => {
        setCompanyList(updatedCompanies.props.companies);
    }


    return (
        <Layout
            user={auth.user}
            header={<div className="flex font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">

                <a href={route('admin.companies.index')} className="hover:text-slate-500">
                    <h2 className="">EMPRESAS</h2>
                </a>
                <span className="text-slate-500">
                    {' > '}
                    {company.name.toUpperCase()}
                </span>
            </div>}
        >
            <div className="flex flex-col items-center font-semibold text-slate-700 p-6 gap-4">
                <div className="flex flex-col items-center bg-white rounded-lg p-4 px-6 w-full">
                    <h1 className="text-sm ">
                        EMPRESA
                    </h1>
                    <div className="flex flex-col items-center">
                        <div className="p-2 text-center">
                            <div className=" text-4xl text-indigo-700">{company.name.toUpperCase()}</div>
                            <div className=" font-light">{company.cif}</div>
                        </div>
                        <div className="my-4">
                            <h1 className="text-sm text-center">
                                CONTACTO
                            </h1>
                            <div className="flex items-center justify-center text-center gap-4"><HiPhone />{company.phone}</div>
                            <div className="flex items-center text-center justify-center gap-4"> <HiMapPin />{company.address}, {company.city}</div>
                            <div className="flex items-center text-center justify-center"></div>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col items-center bg-white rounded-lg p-4 px-6 w-full">
                    <h1 className="text-sm ">
                        MANAGER
                    </h1>
                    <div className="flex flex-col items-center">
                        <div className="p-2 text-center">
                            <div className=" text-4xl text-indigo-700">{manager.name}</div>
                            <div className=" flex items-center justify-center text-center gap-4"><HiEnvelope /><div>{manager.email}</div></div>
                        </div>


                    </div>
                </div>
                <div className="flex flex-row justify-around items-center bg-white rounded-lg p-4 px-6 w-full">
                    <DeleteModal className="max-w-xl" company={company} updateCompany={updateCompany} />
                    <EditModal className="max-w-xl" company={company} updateCompany={updateCompany} />
                </div>
                <div className="bg-indigo-200 w-full flex flex-col p-4 rounded-lg items-center text-lg text-indigo-700 gap-2">
                    <div className="p-2">
                        WORKERS
                    </div>
                    {workersList.map(worker => (
                        <a href={route('admin.workers.show', { worker: worker })} key={worker.id} className="p-2 px-4 bg-white w-full rounded-lg shadow hover:shadow-lg flex flex-row justify-between items-center">
                            <div className="flex flex-row gap-2 px-2">
                                <div>
                                    <span className="text-xs">id:</span><span className="text-sm">{worker.id}</span>
                                </div>
                                <div className="truncate">
                                    {worker.name}
                                </div>
                                <div className="truncate">
                                    {worker.email}
                                </div>
                            </div>
                            <HiArrowRight />

                            {/* <EditModal className="max-w-xl" company={worker} updateCompany={updateCompany} />
                        <DeleteModal className="max-w-xl" company={company} updateCompany={updateCompany} /> */}
                        </a>
                    ))}
                    {/* <CreateModal className="max-w-xl" updateCompany={updateCompany} /> */}
                </div>

            </div>
        </Layout >
    )
}