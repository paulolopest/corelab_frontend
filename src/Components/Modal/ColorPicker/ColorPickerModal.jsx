import React from 'react'
import './ColorPickerModal.scss'
import { motion } from 'framer-motion'
import { colors } from './../../../Utils/Extra'

const ColorPickerModal = ({ selectState, top, bottom, right, left }) => {
  const colorMap = colors.map((item, index) => (
    <span
      onClick={() => selectState(`${item}`)}
      key={index}
      style={{ backgroundColor: item }}
    />
  ))

  return (
    <motion.div
      className="note-colors"
      style={{ top, bottom, right, left }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {colorMap}
    </motion.div>
  )
}

export default ColorPickerModal
