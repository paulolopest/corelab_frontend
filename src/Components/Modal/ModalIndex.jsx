import React, { useContext } from 'react'
import { GlobalContext } from '../../Contexts/GlobalContext'
import AddNoteModal from './AddNote/AddNoteModal'
import useUtils from '../../Hooks/useUtils'

const ModalIndex = () => {
    const { addNoteModal, setAddNoteModal } = useContext(GlobalContext)

    const { FreezeScreen, CloseEsc } = useUtils()

    FreezeScreen(addNoteModal)

    CloseEsc(setAddNoteModal)

    return <>{addNoteModal && <AddNoteModal />}</>
}

export default ModalIndex
