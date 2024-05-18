import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import useDeleteForm from "@/hooks/useDeleteForm";
import ModalLayout from "@/Components/ModalLayout";


export default function DeleteModal({ className = '', worker, updateWorker }) {
    const { data,
        reference,
        processing,
        handleSubmit,
        closeModal,
        confirmDelete,
        confirmingDelete
    } = useDeleteForm({
        updateFunction: updateWorker,
        formObject: worker,
        deletionRoute: 'workers.destroy'
    });

    return (
        <>
            <ModalLayout
                title='Borrar trabajador'
                buttonName='BORRAR'
                onClick={confirmDelete}
                show={confirmingDelete}
                onClose={closeModal}
                isDelete
            >
                <form onSubmit={handleSubmit}>
                    <div>
                        Confirma que quieres borrar todos los datos del trabajador seleccionado.
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