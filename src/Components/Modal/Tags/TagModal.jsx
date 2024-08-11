import './TagModal.scss'
import React from 'react'
import { motion } from 'framer-motion'
import { tags } from '../../../Utils/Extra'

const TagModal = ({ selectState, currentState, top, bottom, right, left }) => {
    const handleArr = (item) => {
        if (currentState.tags.includes(item)) {
            return null
        } else {
            if (currentState.tags.length >= 2) {
                return null
            } else {
                const newArr = [item, ...currentState.tags]
                selectState({ isVisible: currentState.isVisible, tags: newArr })
            }
        }
    }

    const tagMap = tags.map((item, index) => (
        <li onClick={() => handleArr(item)} key={index}>
            {item}
        </li>
    ))

    return (
        <motion.ol
            className="tag-mdl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{ top, bottom, right, left }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
        >
            {tagMap}
        </motion.ol>
    )
}

export default TagModal
