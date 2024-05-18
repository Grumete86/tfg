import Modal from "@/Components/Modal";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
// import EditShiftModal from "../Shifts/EditModal2";
import DeleteModal from "./DeleteModal";
import { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import { HiArrowRight, HiClock, HiEnvelope, HiPhone } from "react-icons/hi2";

export default function Show({ auth, worker, companies }) {
    const newShiftList = worker.shifts.map(shift => ({ ...shift, start_time: new Date(shift.start_time), end_time: shift.end_time && new Date(shift.end_time) }));
    const [shiftsList, setShiftsList] = useState(newShiftList);


    const updateWorker = (updatedWorker) => {
        setWorkerList(updatedWorker.props.workers);
    }
    // useEffect(() => {
    //     const newShiftList = shiftsList.map(shift => ({ ...shift, start_time: new Date(shift.start_time), end_time: shift.end_time ?? new Date(shift.end_time) }));
    //     setShiftsList(newShiftList);
    //     console.log(newShiftList);
    // }, []);

    return (
        <Layout
            user={auth.user}
            header={
                <div className="flex font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    <a href={route('admin.workers.index')} className="hover:text-slate-500">
                        <h2 className="">TRABAJADORES</h2>
                    </a>
                    <span className="text-slate-500">
                        {' > '}
                        {worker.name.toUpperCase()}
                    </span>
                </div>
            }
        >

            <div className="flex flex-col items-center font-semibold text-slate-700 p-6 gap-4">
                <div className="flex flex-col items-center bg-white rounded-lg p-4 px-6 w-full">
                    <h1 className="text-sm ">
                        TRABAJADOR
                    </h1>
                    <div className="flex flex-col items-center">
                        <div className="p-2 text-center">
                            <div className=" text-4xl text-indigo-700">{worker.name.toUpperCase()}</div>
                            <div className=" font-light">{worker.dni}</div>
                        </div>
                        <div className="my-4">
                            <div className="flex items-center justify-center text-center gap-4 bg-indigo-100 p-2 rounded-xl"><HiEnvelope />{worker.email}</div>
                        </div>
                    </div>

                    <h1 className="text-sm ">
                        EMPRESA
                    </h1>
                    <div className="flex flex-col items-center">
                        <div className="p-2 text-center">


                            <div className=" text-lg text-slate-800">{worker.works_at.name.toUpperCase()}</div>
                            <div className=" font-light">{worker.works_at.phone}</div>
                            <div className="flex items-center justify-center text-center gap-4 bg-slate-100 px-2 p-1 rounded-xl"><HiPhone />{worker.works_at.phone}</div>
                        </div>

                    </div>
                </div>
                <div className="w-full bg-white p-4 flex flex-row justify-around rounded-lg">
                    <EditModal className="max-w-xl" worker={worker} companies={companies} updateWorker={updateWorker} />
                    <DeleteModal className="max-w-xl" worker={worker} updateWorker={updateWorker} />
                </div>
                <div className="bg-indigo-200 w-full flex flex-col p-4 rounded-lg items-center text-lg text-indigo-700 gap-2">
                    <div className="p-2">
                        TURNOS
                    </div>
                    {shiftsList.map(shift => (

                        <a href={route('admin.shifts.show', { shift: shift })} key={shift.id} className="p-2 px-4 bg-white w-full rounded-lg shadow hover:shadow-lg flex flex-row justify-between items-center">
                            <div className="flex flex-row gap-2 px-2 items-center">
                                <div>
                                    <span className="text-xs">id: </span><span>{shift.id}</span>
                                </div>
                                <div className="bg-slate-100 m-2 p-2 flex flex-col md:flex-row items-center ">
                                    <span className="text-xs">fecha:  </span><span className=" text-sm truncate" style={{ textWrap: 'balance' }}>{shift.start_time.toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-1 items-center text-center">
                                    <HiClock />
                                    <span>{shift.start_time.toLocaleTimeString('es-ES')}</span>
                                    <span>{shift.end_time ? shift.end_time.toLocaleTimeString('es-ES') : 'en curso'}</span>
                                </div>

                            </div>
                            <HiArrowRight />
                            {/* <EditModal className="max-w-xl" worker={worker} updateWorker={updateWorker} />
                    <DeleteModal className="max-w-xl" worker={worker} updateWorker={updateWorker} /> */}
                        </a>
                    ))}
                    {/* <CreateModal className="max-w-xl" updateWorker={updateWorker} /> */}

                </div>
            </div>


        </Layout >
    )
}