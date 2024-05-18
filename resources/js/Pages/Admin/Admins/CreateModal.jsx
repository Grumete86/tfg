import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextFormInput from "@/Components/forms/TextFormInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import useCreateForm from "@/hooks/useCreateForm";
import ModalLayout from "@/Components/ModalLayout";

export default function CreateModal({ className = '', updateAdmin }) {
    const {
        data,
        reference,
        errors,
        processing,
        closeModal,
        handleSubmit,
        setData,
        confirmCreation,
        confirmingCreation } = useCreateForm({
            title: 'Create Admin',
            formObject: { name: '', email: '', password: '', password_confirmation: '' },
            creationRoute: 'admin.admins.store',
            updateFunction: updateAdmin
        });
    return (
        <>
            <ModalLayout title='Nuevo administrador' buttonName='CREAR' onClick={confirmCreation} show={confirmingCreation} onClose={closeModal}>

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
                    <TextFormInput
                        name='password'
                        type='password'
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        errorMessage={errors.password}
                        required />
                    <TextFormInput
                        name='Password Confirmation'
                        type='password'
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        errorMessage={errors.password_confirmation}
                        required />


                    <div className="flex items-center justify-end mt-4">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            NUEVO ADMIN
                        </PrimaryButton>
                    </div>
                </form>
            </ModalLayout>
            {/* <PrimaryButton onClick={confirmCreation}>CREAR</PrimaryButton>
            <Modal show={confirmingCreation} onClose={closeModal}> */}
            {/* </Modal > */}
        </>
    )
}