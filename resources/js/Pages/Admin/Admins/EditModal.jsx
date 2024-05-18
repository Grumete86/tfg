import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import useEditForm from "@/hooks/useEditForm";
import TextFormInput from "@/Components/forms/TextFormInput";
import ModalLayout from "@/Components/ModalLayout";

export default function EditModal({ className = '', admin, updateAdmin }) {
    const {
        data,
        reference,
        errors,
        processing,
        closeModal,
        handleSubmit,
        setData,
        setConfirmingEdition,
        confirmingEdition,
        confirmEdition } = useEditForm({
            title: 'Edit Admin',
            formObject: admin,
            updateRoute: 'admin.admins.update',
            updateFunction: updateAdmin
        });

    return (
        <>
            <ModalLayout title='Editar administrador' buttonName='EDITAR' onClick={confirmEdition} show={confirmingEdition} onClose={closeModal}>
                <form onSubmit={handleSubmit}>
                    <TextFormInput
                        name='nombre'
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        errorMessage={errors.name}
                        required />
                    <TextFormInput
                        name='email'
                        type='email'
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        errorMessage={errors.email}
                        required />
                    <div className="flex items-center justify-end mt-4">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Confirmar
                        </PrimaryButton>
                    </div>
                </form>

            </ModalLayout>
        </>
    )
}