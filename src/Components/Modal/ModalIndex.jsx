import React, { useContext } from 'react'
import useUtils from '../../Hooks/useUtils'
import AddNoteModal from './AddNote/AddNoteModal'
import { GlobalContext } from '../../Contexts/GlobalContext'

const ModalIndex = () => {
    const { addNoteModal, setAddNoteModal } = useContext(GlobalContext)

    const { FreezeScreen, CloseEsc } = useUtils()

    FreezeScreen(addNoteModal)

    CloseEsc(setAddNoteModal)

    return <>{addNoteModal && <AddNoteModal />}</>
}

export default ModalIndex
