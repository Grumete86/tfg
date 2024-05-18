import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";

export default function useCreateForm({ title, updateFunction, formObject, creationRoute, props }) {
    const reference = useRef();
    const [confirmingCreation, setConfirmingCreation] = useState(false);
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        patch
    } = useForm(formObject);
    const createObject = (e) => {
        e.preventDefault();
        post(route(creationRoute), {
            preserveScroll: true,
            onSuccess: (response) => { closeModal(); updateFunction(response) },
            onError: () => reference.current.focus(),
            onFinish: () => { reset() },
        });
    };
    const closeModal = () => {
        setConfirmingCreation(false);
        reset();
    };
    const confirmCreation = () => {
        setConfirmingCreation(true);
    };


    return { data, reference, errors, processing, handleSubmit: createObject, closeModal, setData, confirmCreation, confirmingCreation };
}