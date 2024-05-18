import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import useDeleteForm from "@/hooks/useDeleteForm";
import ModalLayout from "@/Components/ModalLayout";


export default function DeleteModal({ className = '', admin, updateAdmin }) {
    const { data,
        reference,
        processing,
        handleSubmit,
        closeModal,
        confirmDelete,
        confirmingDelete
    } = useDeleteForm({
        updateFunction: updateAdmin,
        formObject: admin,
        deletionRoute: 'admin.admins.destroy'
    });
    return (
        <>
            <ModalLayout
                title={'Borrar Administrador'}
                onClick={confirmDelete}
                show={confirmingDelete}
                onClose={closeModal}
                buttonName={'BORRAR'}
                isDelete
            >
                <form onSubmit={handleSubmit}>
                    <div>
                        Confirma que quieres borrar todos los datos del usuario seleccionado.
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