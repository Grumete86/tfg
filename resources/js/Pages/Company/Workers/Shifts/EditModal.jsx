import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import useEditForm from "@/hooks/useEditForm";
import TextFormInput from "@/Components/forms/TextFormInput";
import ModalLayout from "@/Components/ModalLayout";

export default function EditModal({ className = '', shift, updateShift }) {

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
            title: 'Edit Shift',
            formObject: shift,
            updateRoute: 'admin.shifts.update',
            updateFunction: updateShift
        });
    function toISOLocal(adate) {
        var localdt = new Date(adate - adate.getTimezoneOffset() * 60000);
        return localdt.toISOString().slice(0, -8);
    }

    return (
        <>
            <ModalLayout title='Editar turno' buttonName='EDITAR' onClick={confirmEdition} show={confirmingEdition} onClose={closeModal}>
                <form onSubmit={handleSubmit}>
                    <TextFormInput
                        name="empresa"
                        value={data.worker.works_at.name}
                        readOnly
                    />
                    <TextFormInput
                        name="trabajador"
                        value={`${data.worker.dni} - ${data.worker.name}`}
                        readOnly
                    />
                    <TextFormInput
                        name="comienzo del turno"
                        type="datetime-local"
                        value={toISOLocal(data.start_time)} onChangeCallback={(e) => { e.target.value == '' ? setData('start_time', e.target.value) : setData('start_time', new Date(e.target.value)) }}
                        errorMessage={errors.start_time}
                        required
                    />
                    <TextFormInput
                        name="fin del turno"
                        type="datetime-local"
                        value={data.end_time instanceof Date ? toISOLocal(data.end_time) : ''}
                        onChangeCallback={(e) => { e.target.value == '' ? setData('end_time', e.target.value) : setData('end_time', new Date(e.target.value)) }}
                        min={toISOLocal(data.start_time)}
                        errorMessage={errors.end_time}
                        required
                    />

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