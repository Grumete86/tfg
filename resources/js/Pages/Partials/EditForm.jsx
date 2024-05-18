import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

const formObject = {
    id: shift.id,
    start_time: new Date(shift.start_time),
    end_time: shift.end_time != null ? new Date(shift.end_time) : null,
    user_id: shift.user_id
};
const route = 'shifts.update';
const ref = startDateInput;
const props = { object: shift };
const children =
    <>

        <div>
            <InputLabel htmlFor="company" value="Company" />

            <TextInput
                name="company"
                id="company"
                value={company.name}
                className="mt-1 block w-full"
                autoComplete="company"
                readOnly>
            </TextInput>
        </div>
        <div>
            <InputLabel htmlFor="worker" value="Worker" />

            <TextInput
                name="worker"
                id="worker"
                value={`${worker.dni} - ${worker.name}`}
                className="mt-1 block w-full"
                autoComplete="worker"
                readOnly>
            </TextInput>
        </div>
        <div>
            <InputLabel htmlFor="start" value="Start time" />

            <input
                id="start"
                type="datetime-local"
                name="start"
                value={toISOLocal(data.start_time)}
                className="mt-1 block w-full"
                autoComplete="start"
                onChange={(e) => { e.target.value == '' ? setData('start_time', e.target.value) : setData('start_time', new Date(e.target.value)) }}
                required
            />

            <InputError message={errors.start_time} className="mt-2" />
        </div>
        <div>
            <InputLabel htmlFor="end" value="End time" />

            <input
                id="end"
                type="datetime-local"
                name="end"
                value={data.end_time instanceof Date ? toISOLocal(data.end_time) : ''}
                min={toISOLocal(data.start_time)}
                className="mt-1 block w-full"
                autoComplete="end"
                onChange={(e) => { e.target.value == '' ? setData('end_time', e.target.value) : setData('end_time', new Date(e.target.value)) }}

            />

            <InputError message={errors.end_time} className="mt-2" />
        </div>
    </>
    ;


export default function useEditForm({ title, updateFunction, formObject, route, children, props }) {
    const reference = useRef();
    const [confirmingObjectEdition, setConfirmingObjectEdition] = useState(false);
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        patch
    } = useForm(formObject);
    const editObject = (e) => {
        e.preventDefault();
        patch(route(route, data), {
            preserveScroll: true,
            onSuccess: (response) => { closeModal(); updateFunction(response) },
            onError: () => reference.current.focus(),
            onFinish: () => { reset() },
        });
    };
    const closeModal = () => {
        setConfirmingObjectEdition(false);
        reset();
    };
    const confirmObjectEdition = () => {
        setConfirmingObjectEdition(true);
    };

    function EditFormComponent() {
        return (
            <>
                <PrimaryButton onClick={confirmObjectEdition}>EDITAR</PrimaryButton>
                <Modal show={confirmingObjectEdition} onClose={closeModal}>
                    <form onSubmit={editObject}>
                        <h1>{title}</h1>
                        {children}
                        <div className="flex items-center justify-end mt-4">
                            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Confirmar
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal >
            </>
        )
    }
    return [editForm, data, reference, errors, setData, EditFormComponent]
}


export default function EditModal({ className = '', title, updateFunction, formObject, route, ref, children, props }) {
    const [object] = [...props];
    const ref = useRef();
    const [confirmingObjectEdition, setConfirmingObjectEdition] = useState(false);
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        patch
    } = useForm(formObject);

    const confirmObjectEdition = () => {
        setConfirmingObjectEdition(true);
    };


    const editObject = (e) => {
        e.preventDefault();
        patch(route(route, object), {
            preserveScroll: true,
            onSuccess: (response) => { closeModal(); updateFunction(response) },
            onError: () => ref.current.focus(),
            onFinish: () => { reset() },
        });
    };

    function toISOLocal(adate) {
        var localdt = new Date(adate - adate.getTimezoneOffset() * 60000);
        console.log(localdt.toISOString().slice(0, -8))
        return localdt.toISOString().slice(0, -8);
    }
    const closeModal = () => {
        setConfirmingObjectEdition(false);
        reset();
    };
    return (
        <>
            <PrimaryButton onClick={confirmObjectEdition}>EDITAR</PrimaryButton>
            <Modal show={confirmingObjectEdition} onClose={closeModal}>
                <form onSubmit={editObject}>
                    <h1>{title}</h1>
                    {children}
                    <div className="flex items-center justify-end mt-4">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Confirmar
                        </PrimaryButton>
                    </div>
                </form>
            </Modal >
        </>
    )
}