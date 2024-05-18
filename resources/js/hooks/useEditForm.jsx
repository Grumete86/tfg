import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";

export default function useEditForm({ title, updateFunction, formObject, updateRoute, props }) {
    const reference = useRef();
    const [confirmingEdition, setConfirmingEdition] = useState(false);
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
        patch(route(updateRoute, data), {
            preserveScroll: true,
            onSuccess: (response) => { closeModal(); updateFunction(response) },
            onError: () => reference.current.focus(),
            onFinish: () => { reset() },
        });
    };
    const closeModal = () => {
        setConfirmingEdition(false);
        reset();
    };
    const confirmEdition = () => {
        setConfirmingEdition(true);
    };

    return { data, reference, errors, processing, handleSubmit: editObject, closeModal, setData, setConfirmingEdition, confirmingEdition, confirmEdition };
}