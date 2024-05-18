import Modal from "@/Components/Modal";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import ShowLayout from "@/Components/pages/Show";
import IndexRowButton from "@/Components/pages/partials/IndexRowButtons";
import { HiEnvelope, HiPhone } from "react-icons/hi2";
import { shiftDuration as shiftD } from "@/helpers/helpers";
import { Head } from "@inertiajs/react";
export default function Show({ auth, shift }) {
    const newShift = { ...shift, start_time: new Date(shift.start_time), end_time: shift.end_time && new Date(shift.end_time) };
    const [actualShift, setActualShift] = useState(newShift);

    const updateShift = (updatedShift) => {
        const newShift = { ...updatedShift.props.shift, start_time: new Date(updatedShift.props.shift.start_time), end_time: updatedShift.props.shift.end_time && new Date(updatedShift.props.shift.end_time) };
        setActualShift(newShift);
    }


    const shiftDuration = (start_time, end_time) => {
        if (end_time) { const end = end_time } else { const end = new Date() }
        if (start_time instanceof Date && end_time instanceof Date) {
            Math.abs(start_time - end_time);
            const hours = Math.floor(Math.abs(start_time - end_time) / 3600000);
            const minutes = Math.floor(Math.abs(start_time - end_time) / 60000) - (hours * 60);
            return {
                hours: hours || 0,
                minutes: minutes || 0,
                hoursString: hours < 10 ? `0${hours}` : hours,
                minutesString: minutes < 10 ? `0${minutes}` : minutes,
            }
        }
        return {
            hours: 0,
            minutes: 0,
            hoursString: '00',
            minutesString: '00',
        }
    }
    const duration = shiftDuration(actualShift.start_time, actualShift.end_time);

    // useEffect(() => {
    //     const newShiftList = shiftsList.map(shift => ({ ...shift, start_time: new Date(shift.start_time), end_time: shift.end_time ?? new Date(shift.end_time) }));
    //     setShiftsList(newShiftList);
    //     console.log(newShiftList);
    // }, []);

    return (
        <>
            <Head title={`${actualShift.worker.name} - ${actualShift.start_time.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`} />
            <Layout
                user={auth.user}
                header={<div className="flex font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    <a href={route('admin.shifts.index')} className="hover:text-slate-500">
                        <h2 className="">TURNOS</h2>
                    </a>
                    <span className="text-slate-500">
                        {' > '}
                        {actualShift.start_time.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                </div>}
            >


                <div className="flex flex-col items-center font-semibold text-slate-700 p-6 gap-4">
                    <div className="flex flex-col items-center bg-white rounded-lg p-4 px-6 w-full">
                        <h1 className="text-sm ">
                            TRABAJADOR
                        </h1>
                        <div className="flex flex-col items-center">
                            <div className="p-2 text-center">
                                <div className=" text-4xl text-indigo-700">{shift.worker.name.toUpperCase()}</div>
                                <div className=" font-light">{shift.worker.dni}</div>
                            </div>
                            <div className="my-4">
                                <div className="flex items-center justify-center text-center gap-4 bg-indigo-100 p-2 rounded-xl"><HiEnvelope />{shift.worker.email}</div>
                            </div>
                        </div>

                        <h1 className="text-sm ">
                            EMPRESA
                        </h1>
                        <div className="flex flex-col items-center">
                            <div className="p-2 text-center">


                                <div className=" text-lg text-slate-800">{shift.worker.works_at.name.toUpperCase()}</div>
                                <div className=" font-light">{shift.worker.works_at.phone}</div>
                                <div className="flex items-center justify-center text-center gap-4 bg-slate-100 px-2 p-1 rounded-xl"><HiPhone />{shift.worker.works_at.phone}</div>
                            </div>

                        </div>
                    </div>


                    <section key={actualShift.id} className="w-full bg-indigo-200 p-4 text-indigo-800 rounded-xl items-center text-center flex flex-col">
                        <header className="text-xl font-bold w-full">
                            TURNO
                            <hr />
                        </header>
                        <div className="w-full flex flex-col gap-3 text-xs py-4">
                            <div>
                                <div>
                                    fecha
                                </div>
                                <div className="text-lg">
                                    {actualShift.start_time.toLocaleDateString()}
                                </div>
                            </div>
                            <div className="bg-indigo-500 text-white rounded-md px-3 py-1">
                                <p className='text-center font-bold p-1'>
                                    FECHA COMIENZO
                                </p>
                                <div className='p-1 text-xl'>
                                    <p><strong>Fecha: </strong>{actualShift.start_time.toLocaleDateString()}</p>
                                    <p><strong>Hora: </strong>{actualShift.start_time.toLocaleTimeString().slice(0, -3)}</p>
                                </div>
                            </div>
                            <div className={`rounded-md px-3 py-1 ${actualShift.end_time ? ' bg-indigo-500 text-white ' : ' bg-green-200 text-green-700 '}`}>
                                <p className='text-center font-bold p-1'>
                                    FECHA FINAL
                                </p>
                                <div className={`p-1 text-xl `}>
                                    {actualShift.end_time ?
                                        <>
                                            <p><strong>Fecha: </strong>{actualShift.end_time ? actualShift.end_time.toLocaleDateString() : 'en curso'}</p>
                                            <p><strong>Hora: </strong>{actualShift.start_time.toLocaleTimeString().slice(0, -3)}</p>
                                        </> :
                                        <p> en curso</p>
                                    }

                                </div>
                            </div>

                            <div className="bg-slate-200 rounded-md px-3 py-1">
                                <p className='text-center font-bold p-1'>
                                    DURACIÓN:
                                </p>
                                <div className='text-center text-lg p-1'>
                                    {
                                        `${shiftD(actualShift).hoursString}h ${shiftD(actualShift).minutesString}m`
                                    }

                                </div>
                            </div>
                        </div>
                    </section>
                    <IndexRowButton>
                        <EditModal className="max-w-xl" shift={actualShift} updateShift={updateShift} />
                        <DeleteModal className="max-w-xl" shift={actualShift} updateShift={updateShift} />
                    </IndexRowButton>
                </div>

            </Layout >
        </>
    )
}