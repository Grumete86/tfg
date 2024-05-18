import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";



export default function useDeleteForm({ title, updateFunction, formObject, deletionRoute, props }) {
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const reference = useRef();
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        patch
    } = useForm(formObject);

    const confirmDelete = () => {
        setConfirmingDelete(true);
    };

    const deleteObject = (e) => {
        e.preventDefault();
        destroy(route(deletionRoute, formObject), {
            preserveScroll: true,
            onSuccess: (response) => { closeModal(); updateFunction(response) },
            onError: () => reference.current.focus(),
            onFinish: () => { reset() },
        });
    };

    const closeModal = () => {
        setConfirmingDelete(false);
        reset();
    };
    return { data, reference, processing, handleSubmit: deleteObject, closeModal, confirmDelete, confirmingDelete };
}