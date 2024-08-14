import React, { useContext } from 'react'
import useUtils from '../../Hooks/useUtils'
import AddNoteModal from './AddNote/AddNoteModal'
import { GlobalContext } from '../../Contexts/GlobalContext'
import UpdateNoteModal from './UpdateNote.jsx/UpdateNoteModal'

const ModalIndex = () => {
    const { addNoteModal, setAddNoteModal, updateNoteModal, setUpdateNoteModal } = useContext(GlobalContext)

    const { FreezeScreen, CloseEsc } = useUtils()

    FreezeScreen(addNoteModal)

    CloseEsc(setAddNoteModal)
    CloseEsc(setUpdateNoteModal)

    return (
        <>
            {addNoteModal && <AddNoteModal />}
            {updateNoteModal.isVisible && <UpdateNoteModal task={updateNoteModal.task} />}
        </>
    )
}

export default ModalIndex
