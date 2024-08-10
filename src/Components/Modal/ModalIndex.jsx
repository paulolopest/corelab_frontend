import React, { useContext } from 'react'
import { GlobalContext } from '../../Contexts/GlobalContext'
import AddNoteModal from './AddNote/AddNoteModal'

const ModalIndex = () => {
  const { addNoteModal } = useContext(GlobalContext)

  return <>{addNoteModal && <AddNoteModal />}</>
}

export default ModalIndex
