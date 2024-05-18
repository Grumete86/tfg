// import Modal from "@/Components/Modal";
// import CreateModal from "./CreateModal";
// import EditModal from "./EditModal";
// import DeleteModal from "./DeleteModal";
import { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import ShowLayout from "@/Components/pages/Show";
// import IndexRowButton from "@/Components/pages/partials/IndexRowButtons";

export default function Show({ auth, shift }) {
    const newShift = { ...shift, start_time: new Date(shift.start_time), end_time: shift.end_time && new Date(shift.end_time) };
    const [actualShift, setActualShift] = useState(newShift);

    const updateShift = (updatedShift) => {
        const newShift = { ...updatedShift.props.shift, start_time: new Date(updatedShift.props.shift.start_time), end_time: updatedShift.props.shift.end_time && new Date(updatedShift.props.shift.end_time) };
        setActualShift(newShift);
    }


    const shiftDuration = (start_time, end_time) => {
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
        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Turnos</h2>}
        >
            <ShowLayout>

                <section>
                    <header className="text-sm font-bold text-slate-500">
                        TRABAJADOR
                        <hr />
                    </header>
                    <div className="text-slate-400">
                        <strong className="text-sm pe-2 ">
                            nombre:
                        </strong>
                        {actualShift.worker.name.toUpperCase()}
                    </div>
                    <div className="text-slate-400">
                        <strong className="text-sm pe-2 ">
                            DNI:
                        </strong>
                        {actualShift.worker.dni}
                    </div>
                    <div className="text-slate-400">
                        <strong className="text-sm pe-2 ">
                            email:
                        </strong>
                        {actualShift.worker.email}
                    </div>
                </section>
                {/* <section>
                    <header className="text-sm font-bold text-slate-500">
                        EMPRESA
                        <hr />
                    </header>
                    <div className="text-slate-400">
                        <strong className="text-sm pe-2 ">
                            nombre:
                        </strong>
                        {actualShift.worker.works_at.name}
                    </div>
                    <div className="text-slate-400">
                        <strong className="text-sm pe-2 ">
                            email:
                        </strong>
                        {actualShift.worker.works_at.cif}
                    </div>
                </section> */}
                <section key={actualShift.id}>
                    <header className="text-sm font-bold text-slate-500">
                        TURNO
                        <hr />
                    </header>
                    <div className="grid grid-cols-3 gap-3 text-xs py-4">
                        <div className="bg-slate-200 rounded-md px-3 py-1">
                            <p className='text-center font-bold p-1'>
                                COMIENZO:
                            </p>
                            <div className='p-1'>
                                <p><strong>Fecha: </strong>{actualShift.start_time.toLocaleDateString()}</p>
                                <p><strong>Hora: </strong>{actualShift.start_time.toLocaleTimeString().slice(0, -3)}</p>
                            </div>
                        </div>
                        <div className={`rounded-md px-3 py-1 ${actualShift.end_time ? 'bg-slate-200' : 'bg-red-300'}`}>
                            <p className='text-center font-bold p-1'>
                                FINAL:
                            </p>
                            <div className='p-1'>
                                <p><strong>Fecha: </strong>{actualShift.end_time ? actualShift.end_time.toLocaleDateString() : '--'}</p>
                                <p><strong>Hora: </strong>{actualShift.end_time ? actualShift.end_time.toLocaleTimeString().slice(0, -3) : '--'}</p>
                            </div>
                        </div>
                        <div className="bg-slate-200 rounded-md px-3 py-1">
                            <p className='text-center font-bold p-1'>
                                DURACIÓN:
                            </p>
                            <div className='text-center text-lg p-1'>
                                {
                                    actualShift.end_time ?
                                        `${duration.hoursString}h ${duration.minutesString}m`
                                        : '--'
                                }

                            </div>
                        </div>
                    </div>
                </section>
                {/* <IndexRowButton>
                    <EditModal className="max-w-xl" shift={actualShift} updateShift={updateShift} />
                    <DeleteModal className="max-w-xl" shift={actualShift} updateShift={updateShift} />
                </IndexRowButton> */}

            </ShowLayout>
        </Layout>
    )
}