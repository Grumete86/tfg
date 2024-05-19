import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import useEditForm from "@/hooks/useEditForm";
import TextFormInput from "@/Components/forms/TextFormInput";
import SelectFormInput from "@/Components/forms/SelectFormInput";
import ModalLayout from "@/Components/ModalLayout";

export default function EditModal({ className = '', worker, companies, updateWorker }) {

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
            title: 'Edit Worker',
            formObject: worker,
            updateRoute: 'admin.workers.update',
            updateFunction: updateWorker
        });
    console.log(data);
    return (
        <>
            <ModalLayout title='Editar Trabajador' buttonName='EDITAR' onClick={confirmEdition} show={confirmingEdition} onClose={closeModal}>
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
                        value={data.contracted_by}
                        onChangeCallback={(e) => setData('contracted_by', e.target.value)}
                        errorMessage={errors.contracted_by}
                        required
                    >
                        {companies.map((company) => {
                            return <option value={company.id} key={company.id}> {company.cif} - {company.name}</option>
                        })}
                    </SelectFormInput>


                    <div className="flex items-center justify-end mt-4">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            GUARDAR
                        </PrimaryButton>

                    </div>
                </form>
            </ModalLayout >
        </>
    )
}