import PrimaryButton from "./PrimaryButton"
import DangerButton from "./DangerButton"
import Modal from "./Modal"

export default function ModalLayout({ title, buttonName, onClick, show, onClose, isDelete = false, children }) {
    return (
        <>
            {isDelete ?
                <DangerButton onClick={onClick}>{buttonName}</DangerButton>
                :
                <PrimaryButton onClick={onClick}>{buttonName}</PrimaryButton>
            }
            <Modal show={show} onClose={onClose}>
                <div className='p-4'>
                    <div className="py-2">
                        <h1 className='text-xl font-semibold'>{title}</h1>
                        <hr></hr>
                    </div>
                    {children}
                </div>
            </Modal>
        </>
    )
}