import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import useDeleteForm from "@/hooks/useDeleteForm";
import ModalLayout from "@/Components/ModalLayout";


export default function DeleteModal({ className = '', shift, updateShift }) {
    const { data,
        reference,
        processing,
        handleSubmit,
        closeModal,
        confirmDelete,
        confirmingDelete
    } = useDeleteForm({
        updateFunction: updateShift,
        formObject: shift,
        deletionRoute: 'admin.shifts.destroy'
    });
    return (
        <>
            <ModalLayout
                title={'Delete Shift'}
                onClick={confirmDelete}
                show={confirmingDelete}
                onClose={closeModal}
                buttonName={'BORRAR'}
                isDelete
            >
                <form onSubmit={handleSubmit}>
                    <div>
                        Confirma que quieres borrar todos los datos del turno seleccionado.
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton className="ms-4" disabled={processing}>
                            BORRAR
                        </DangerButton>

                    </div>
                </form>
            </ModalLayout>
        </>
    )
}