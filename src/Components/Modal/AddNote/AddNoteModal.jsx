import './AddNoteModal.scss'
import { motion } from 'framer-motion'
import { Star } from '@phosphor-icons/react'
import React, { useContext, useState } from 'react'
import ColorPickerModal from '../ColorPicker/ColorPickerModal'
import { GlobalContext } from '../../../Contexts/GlobalContext'
import { CustomTextArea } from '../../CustomTextArea/CustomTextArea'

const AddNoteModal = () => {
  const [cpModal, setCpModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [noteColor, setNoteColor] = useState('#ffff')
  const { addNoteModal, setAddNoteModal } = useContext(GlobalContext)

  return (
    <div className="ant-mdl-bk-screen">
      <div className="add-note-ctr" style={{ backgroundColor: noteColor }}>
        <div className="add-nt-title" style={{ backgroundColor: noteColor }}>
          <input placeholder="Título" style={{ backgroundColor: noteColor }} />
          <Star
            onClick={() => setIsFavorite(!isFavorite)}
            color={isFavorite ? 'orange' : 'gray'}
            weight={isFavorite ? 'fill' : 'light'}
          />
        </div>

        <CustomTextArea />

        <motion.button
          className="add-note-btn"
          whileHover={{
            scale: 1.05,
            backgroundColor: 'ButtonHighlight',
          }}
          whileTap={{ scale: 0.9 }}
        >
          Adicionar
        </motion.button>

        <div className="ext-cfg-note">
          <motion.div className="color-note-btn">Tags</motion.div>
          <motion.div
            className="tag-note-btn"
            style={{
              backgroundColor: noteColor === '#ffff' ? '#f1f1f1' : 'white',
            }}
            onClick={() => setCpModal(!cpModal)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            Color
          </motion.div>

          {cpModal && (
            <ColorPickerModal
              top="-6.3rem"
              left="7.4rem"
              selectState={setNoteColor}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AddNoteModal
