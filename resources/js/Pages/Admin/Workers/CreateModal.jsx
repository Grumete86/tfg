import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import useCreateForm from "@/hooks/useCreateForm";
import ModalLayout from "@/Components/ModalLayout";
import TextFormInput from "@/Components/forms/TextFormInput";
import SelectFormInput from "@/Components/forms/SelectFormInput";

export default function CreateModal({ className = '', updateWorker, companies }) {
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
            title: 'Create Worker',
            formObject: {
                name: '',
                dni: '',
                email: '',
                password: '',
                password_confirmation: '',
                contracted_by: '',
            },
            creationRoute: 'admin.workers.store',
            updateFunction: updateWorker
        });

    return (
        <>
            <ModalLayout title='Crear trabajador' buttonName='CREAR' onClick={confirmCreation} show={confirmingCreation} onClose={closeModal}>
                <form onSubmit={handleSubmit}>
                    <TextFormInput
                        name='nombre'
                        value={data.name}
                        onChangeCallback={(e) => setData('name', e.target.value)}
                        errorMessage={errors.name}
                        required
                    />
                    <TextFormInput
                        name='dni'
                        value={data.dni}
                        onChangeCallback={(e) => setData('dni', e.target.value)}
                        errorMessage={errors.dni}
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
                    <SelectFormInput
                        name='empresa'
                        type='company'
                        value={data.contracted_by}
                        onChangeCallback={(e) => setData('contracted_by', e.target.value)}
                        errorMessage={errors.contracted_by}
                        required
                    >
                        {companies.map((company) => {
                            return <option value={company.id} key={company.id}> {company.cif} - {company.name}</option>
                        })}
                    </SelectFormInput>
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
                        errorMessage={errors.password}
                        required
                    />

                    <div className="flex items-center justify-end mt-4">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            CREAR
                        </PrimaryButton>
                    </div>
                </form>
            </ModalLayout>
        </>
    )
}