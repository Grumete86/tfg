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
import SelectFormInput from "@/Components/forms/SelectFormInput";


export default function CreateModal({ className = '', updateShift, workers, companies }) {
    const [companyFilter, setCompanyFilter] = useState({ id: '' });
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
            title: 'Create Shifts',
            formObject: {
                start_time: '',
                end_time: '',
                user_id: ''
            },
            creationRoute: 'admin.shifts.store',
            updateFunction: updateShift
        });
    return (
        <>
            <ModalLayout title='Nuevo turno' buttonName='CREAR' onClick={confirmCreation} show={confirmingCreation} onClose={closeModal}>

                <form onSubmit={handleSubmit}>
                    <SelectFormInput
                        name='filtro empresa'
                        value={companyFilter.id}
                        onChange={(e) => setCompanyFilter({ id: e.target.value })}
                        errorMessage={errors.user_id}
                    >
                        {companies.map((company) => {
                            return <option value={company.id} key={company.id}> {company.cif} - {company.name}</option>
                        })}
                    </SelectFormInput>
                    <SelectFormInput
                        name='trabajador'
                        value={data.user_id}
                        onChange={(e) => setData('user_id', e.target.value)}
                        errorMessage={errors.user_id}
                        required >
                        {workers.filter((worker) => { return companyFilter.id == '' ? true : worker.contracted_by == companyFilter.id }).map((worker) => {
                            return <option value={worker.id} key={worker.id}> {worker.dni} {worker.name}</option>
                        })}
                    </SelectFormInput>
                    <TextFormInput
                        name='comienzo del turno'
                        type='datetime-local'
                        value={data.start_time}
                        onChange={(e) => setData('start_time', e.target.value)}
                        errorMessage={errors.start_time}
                        required />
                    <TextFormInput
                        name='fin del turno'
                        type='datetime-local'
                        value={data.end_time}
                        onChange={(e) => setData('end_time', e.target.value)}
                        errorMessage={errors.end_time}
                        required />


                    <div className="flex items-center justify-end mt-4">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            NUEVO ADMIN
                        </PrimaryButton>
                    </div>
                </form>
            </ModalLayout>

        </>
    )
}