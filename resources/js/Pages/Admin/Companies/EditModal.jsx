import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import useEditForm from "@/hooks/useEditForm";
import TextFormInput from "@/Components/forms/TextFormInput";
import SelectFormInput from "@/Components/forms/SelectFormInput";
import ModalLayout from "@/Components/ModalLayout";



export default function EditModal({ className = '', company, updateCompany }) {
    company.manager_name = company.manager.name;
    company.email = company.manager.email;
    const {
        data,
        reference,
        errors,
        processing,
        closeModal,
        handleSubmit,
        setData,
        EditForm,
        setConfirmingEdition,
        confirmingEdition,
        confirmEdition } = useEditForm({
            title: 'Edit Admin',
            formObject: company,
            updateRoute: 'admin.companies.update',
            updateFunction: updateCompany
        });
    return (
        <>
            <ModalLayout buttonName='EDITAR' title='Editar empresa' onClick={confirmEdition} show={confirmingEdition} onClose={closeModal}>
                <form onSubmit={handleSubmit}>
                    <div className="py-2 pt-4">
                        <h1 className='text-sm font-semibold'>Datos del manager</h1>
                        <hr></hr>
                    </div>
                    <TextFormInput
                        name="nombre manager"
                        value={data.manager_name}
                        onChange={(e) => setData('manager_name', e.target.value)}
                        errorMessage={errors.manager_name}
                    />
                    <TextFormInput
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        errorMessage={errors.email}
                    />

                    <div className="py-2 pt-5">
                        <h1 className='text-sm font-semibold'>Datos de la empresa</h1>
                        <hr></hr>
                    </div>
                    <TextFormInput
                        name="Nombre empresa"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        errorMessage={errors.name}
                    />

                    <TextFormInput
                        name="cif"
                        value={data.cif}
                        onChange={(e) => setData('cif', e.target.value)}
                        errorMessage={errors.cif}
                    />
                    <TextFormInput
                        name="teléfono"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        errorMessage={errors.phone}
                    />
                    <TextFormInput
                        name="dirección"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        errorMessage={errors.address}
                    />
                    <TextFormInput
                        name="ciudad"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        errorMessage={errors.city}
                    />

                    <div className="flex items-center justify-end mt-4">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            GUARDAR
                        </PrimaryButton>

                    </div>
                </form>
            </ModalLayout>
        </>
    )
}