import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import useCreateForm from "@/hooks/useCreateForm";
import ModalLayout from "@/Components/ModalLayout";
import TextFormInput from "@/Components/forms/TextFormInput";

export default function CreateModal({ className = '', updateCompany }) {

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
            title: 'Create Company',
            formObject: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                company_name: '',
                company_cif: '',
                company_phone: '',
                company_address: '',
                company_city: '',
            },
            creationRoute: 'admin.companies.store',
            updateFunction: updateCompany
        });

    const [screen, setScreen] = useState(0);
    const previousScreen = () => {
        setScreen(screen - 1);
    }
    const nextScreen = () => {
        setScreen(screen + 1);
    }
    return (
        <ModalLayout title='Crear Empresa' buttonName='CREAR' onClick={confirmCreation} show={confirmingCreation} onClose={closeModal} >
            <form onSubmit={handleSubmit}>
                <div className={screen == 0 ? 'block' : 'hidden'}>
                    <TextFormInput
                        name='nombre manager'
                        value={data.name}
                        onChangeCallback={(e) => setData('name', e.target.value)}
                        errorMessage={errors.name}
                        required
                    />
                    <TextFormInput
                        name='email'
                        type='email'
                        value={data.email}
                        onChangeCallback={(e) => setData('email', e.target.value)}
                        errorMessage={errors.email}
                        required
                    />
                    <TextFormInput
                        name='password'
                        type='password'
                        value={data.password}
                        onChangeCallback={(e) => setData('password', e.target.value)}
                        errorMessage={errors.password}
                        required
                    />
                    <TextFormInput
                        name='password confirmation'
                        type='password'
                        value={data.password_confirmation}
                        onChangeCallback={(e) => setData('password_confirmation', e.target.value)}
                        errorMessage={errors.password_confirmation}
                        required
                    />

                    <div className="flex items-center justify-end mt-4 gap-3">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <PrimaryButton type="button" onClick={nextScreen}>SIGUIENTE</PrimaryButton>
                    </div>
                </div>
                <div className={screen == 0 ? 'hidden' : 'block'}>
                    <TextFormInput
                        name='nombre empresa'
                        value={data.company_name}
                        onChangeCallback={(e) => setData('company_name', e.target.value)}
                        errorMessage={errors.company_name}
                        required
                    />
                    <TextFormInput
                        name='cif'
                        value={data.company_cif}
                        onChangeCallback={(e) => setData('company_cif', e.target.value)}
                        errorMessage={errors.company_cif}
                        required
                    />
                    <TextFormInput
                        name='teléfono'
                        value={data.company_phone}
                        onChangeCallback={(e) => setData('company_phone', e.target.value)}
                        errorMessage={errors.company_phone}
                        required
                    />
                    <TextFormInput
                        name='dirección'
                        value={data.company_address}
                        onChangeCallback={(e) => setData('company_address', e.target.value)}
                        errorMessage={errors.company_address}
                        required
                    />
                    <TextFormInput
                        name='ciudad'
                        value={data.company_city}
                        onChangeCallback={(e) => setData('company_city', e.target.value)}
                        errorMessage={errors.company_city}
                        required
                    />


                    <div className="flex items-center justify-end mt-4 gap-3">
                        <SecondaryButton onClick={previousScreen}>Atras</SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            NUEVA COMPAÑIA
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </ModalLayout>
    )
}