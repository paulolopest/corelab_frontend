import './AddNoteModal.scss'
import TagModal from './../Tags/TagModal'
import { Star, X } from '@phosphor-icons/react'
import useUtils from '../../../Hooks/useUtils'
import React, { useContext, useEffect, useState } from 'react'
import ColorPickerModal from '../ColorPicker/ColorPickerModal'
import { GlobalContext } from '../../../Contexts/GlobalContext'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'
import { CustomTextArea } from '../../CustomTextArea/CustomTextArea'

const AddNoteModal = () => {
    const [scope, animate] = useAnimate()
    const [isMounted, setIsMounted] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [tagModal, setTagModal] = useState({ isVisible: false, tags: [] })
    const [noteColor, setNoteColor] = useState({ isVisible: false, color: '#ffff' })

    const { CloseModal } = useUtils()
    const { addNoteModal, setAddNoteModal } = useContext(GlobalContext)

    const removeTag = (item) => {
        const newArr = tagModal.tags.filter((tag) => tag !== item)
        setTagModal({ isVisible: tagModal.isVisible, tags: newArr })
    }

    const openModal = (modal) => {
        if (modal === 'color') {
            setTagModal({ isVisible: false, tags: tagModal.tags })
            setNoteColor({ isVisible: !noteColor.isVisible, color: noteColor.color })
        } else {
            setTagModal({ isVisible: !tagModal.isVisible, tags: tagModal.tags })
            setNoteColor({ isVisible: false, color: noteColor.color })
        }
    }

    const tagMap = tagModal.tags.map((item, index) => (
        <motion.p
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => removeTag(item)}
        >
            {item}
        </motion.p>
    ))

    const handleAnimate = async () => {
        await animate('#cardModal', { opacity: 1, scale: 1 })
        animate('#btn', { opacity: 1, y: 0 }, { duration: 0.2, ease: 'easeInOut' })
        animate('#star', { opacity: 1, scale: 1 }, { duration: 0.2, ease: 'easeInOut' })
        animate('#cls-btn', { opacity: 1, scale: 1 }, { duration: 0.2, ease: 'easeInOut' })
        setIsMounted(true)
    }

    useEffect(() => {
        handleAnimate()
    }, [])

    return (
        <div
            className="ant-mdl-bk-screen"
            ref={scope}
            onClick={(e) => CloseModal(e, addNoteModal, setAddNoteModal)}
        >
            <motion.div
                className="add-note-ctr"
                id="cardModal"
                initial={{ opacity: 0, scale: 0 }}
                style={{
                    backgroundColor: noteColor.color,
                    transition: `${isMounted && '0.3s ease-in-out'}`,
                }}
            >
                <div className="add-nt-title" style={{ backgroundColor: noteColor.color }}>
                    <input placeholder="Título" style={{ backgroundColor: noteColor.color }} />
                    <motion.div id="star" initial={{ opacity: 0, scale: 0 }}>
                        <Star
                            stroke={isFavorite && 'black'}
                            color={isFavorite ? '#fffb00' : 'gray'}
                            weight={isFavorite ? 'fill' : 'light'}
                            onClick={() => setIsFavorite(!isFavorite)}
                        />
                    </motion.div>
                </div>

                <CustomTextArea />

                <motion.button
                    className="add-note-btn"
                    id="btn"
                    initial={{ opacity: 0, y: 30 }}
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'ButtonHighlight' }}
                >
                    Adicionar
                </motion.button>

                <div className="ext-cfg-note">
                    <motion.div
                        className="color-note-btn"
                        id="btn"
                        initial={{ opacity: 0, y: 30 }}
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        style={{ backgroundColor: noteColor.color === '#ffff' ? '#f1f1f1' : 'white' }}
                        onClick={() => openModal('tag')}
                    >
                        Tags
                    </motion.div>

                    <motion.div
                        className="tag-note-btn"
                        id="btn"
                        initial={{ opacity: 0, y: 30 }}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        style={{ backgroundColor: noteColor.color === '#ffff' ? '#f1f1f1' : 'white' }}
                        onClick={() => openModal('color')}
                    >
                        Color
                    </motion.div>

                    {tagModal.tags.length > 0 && <div className="tag-map">{tagMap}</div>}

                    <AnimatePresence mode="wait">
                        {noteColor.isVisible && (
                            <ColorPickerModal
                                top="-6.3rem"
                                left="7.4rem"
                                currentState={noteColor}
                                selectState={setNoteColor}
                            />
                        )}

                        {tagModal.isVisible && (
                            <TagModal top="-12.3rem" selectState={setTagModal} currentState={tagModal} />
                        )}
                    </AnimatePresence>
                </div>

                <motion.div
                    id="cls-btn"
                    initial={{ opacity: 0, scale: 0 }}
                    className="cls-mdl"
                    onClick={() => setAddNoteModal(false)}
                >
                    <X />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default AddNoteModal
