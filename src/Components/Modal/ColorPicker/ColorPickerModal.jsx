import React from 'react'
import './ColorPickerModal.scss'
import { colors } from './../../../Utils/Extra'
import { motion } from 'framer-motion'

const ColorPickerModal = ({ selectState, currentState, top, bottom, right, left }) => {
    const colorMap = colors.map((item, index) => (
        <span
            key={index}
            style={{ backgroundColor: item }}
            onClick={() => selectState({ isVisible: currentState, color: `${item}` })}
        />
    ))

    return (
        <motion.div
            className="note-colors"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{ top, bottom, right, left }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
        >
            {colorMap}
        </motion.div>
    )
}

export default ColorPickerModal
