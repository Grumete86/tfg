// import Modal from "@/Components/Modal";
// import CreateModal from "./CreateModal";
// import EditModal from "./EditModal";
// import DeleteModal from "./DeleteModal";
import { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import IndexLayout from "@/Components/pages/Index";
import IndexRow from "@/Components/pages/partials/IndexRow";
// import IndexRowButton from "@/Components/pages/partials/IndexRowButtons";

export default function Index({ auth, shifts, workers }) {

    const newShiftList = shifts.map(shift => ({ ...shift, start_time: new Date(shift.start_time), end_time: shift.end_time && new Date(shift.end_time) }));
    newShiftList.sort((a, b) => {
        if (a.start_time < b.start_time) return 1;
        if (a.start_time > b.start_time) return -1;
    })
    const [shiftsList, setShiftsList] = useState(newShiftList);
    const updateShift = (updatedShifts) => {
        const newShiftList = updatedShifts.props.shifts.map(shift => ({ ...shift, start_time: new Date(shift.start_time), end_time: shift.end_time && new Date(shift.end_time) }));
        newShiftList.sort((a, b) => {
            if (a.start_time < b.start_time) return 1;
            if (a.start_time > b.start_time) return -1;
        })
        setShiftsList(newShiftList);
        // setShiftsList(updatedShifts.props.shifts);
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

    return (
        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Turnos</h2>}
        >
            <IndexLayout>
                {/* <CreateModal className="max-w-xl" updateShift={updateShift} workers={workers} /> */}
                {shiftsList.map(shift => {

                    const duration = shiftDuration(shift.start_time, shift.end_time);
                    // const company = companies.filter(company => company.id === shift.worker.contracted_by)[0];
                    // const worker = workers.filter(worker => worker.id === shift.worker.id)[0];
                    return <IndexRow key={shift.id} className="p-2 " >
                        <a href={route('company.shifts.show', shift)}>
                            <div className="flex flex-row gap-3 content-center">
                                <div className="text-md content-center"><strong>{shift.worker.dni}</strong></div>
                                -
                                <div className="text-sm content-center">{shift.worker.name}</div>
                                {/* -
                                <div className="text-sm text-gray-800 content-center">{shift.worker.works_at.name}</div> */}

                            </div>
                            <div className="grid grid-cols-3 gap-3 text-xs ">
                                <div className="bg-slate-200 rounded-md px-3 py-1">
                                    <strong>
                                        Start:
                                    </strong>
                                    <div>
                                        {shift.start_time.toLocaleDateString()} {shift.start_time.toLocaleTimeString().slice(0, -3)}
                                    </div>
                                </div>
                                <div className={`rounded-md px-3 py-1 ${shift.end_time ? 'bg-slate-200' : 'bg-red-300'}`}>
                                    <strong>
                                        End:
                                    </strong>
                                    <div>
                                        {shift.end_time ? shift.end_time.toLocaleDateString() : '--'} {shift.end_time ? shift.end_time.toLocaleTimeString().slice(0, -3) : '--'}
                                    </div>
                                </div>
                                <div className="bg-slate-200 rounded-md px-3 py-1">
                                    <strong>
                                        Duracion:
                                    </strong>
                                    <div>
                                        {
                                            shift.end_time ?
                                                `${duration.hoursString}h ${duration.minutesString}m`
                                                : '--'
                                        }

                                    </div>
                                </div>
                            </div>
                        </a>
                        {/* <IndexRowButton>
                            <EditModal className="max-w-xl" shift={shift} company={shift.worker.works_at} worker={shift.worker} updateShift={updateShift} />
                            <DeleteModal className="bg-red-300 px-2 py-1 rounded" shift={shift} updateShift={updateShift}>BORRAR</DeleteModal>
                        </IndexRowButton> */}
                    </IndexRow>
                }
                )
                }
                {/* <CreateModal className="max-w-xl" updateShift={updateShift} workers={workers} companies={companies} /> */}

            </IndexLayout >
        </Layout>
    )
}
