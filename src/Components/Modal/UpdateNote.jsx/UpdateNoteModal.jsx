import './UpdateNoteModal.scss'
import TagModal from '../Tags/TagModal'
import { Star, X } from '@phosphor-icons/react'
import ColorPickerModal from '../ColorPicker/ColorPickerModal'
import React, { useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimate, useMotionValueEvent, useScroll } from 'framer-motion'
import { CustomTextArea } from '../../CustomTextArea/CustomTextArea'
import { TaskContext } from '../../../Contexts/TaskContext'
import { GlobalContext } from '../../../Contexts/GlobalContext'

const UpdateNoteModal = ({ task }) => {
    const [scope, animate] = useAnimate()
    const [title, setTitle] = useState(task.title)
    const [isMounted, setIsMounted] = useState(false)
    const [isFavorite, setIsFavorite] = useState(task.favorite)
    const [description, setDescription] = useState(task.description)
    const [tagModal, setTagModal] = useState({ isVisible: false, tags: task.tags })
    const [noteColor, setNoteColor] = useState({ isVisible: false, color: task.color })

    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        console.log(`Você já scrolou ${latest} pixels.`)
    })
    const { setUpdateNoteModal } = useContext(GlobalContext)
    const { updateTask } = useContext(TaskContext)

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

    const handleAnimate = async () => {
        await animate('#cardModal', { opacity: 1, scale: 1 })
        animate('#btn', { opacity: 1, y: 0 }, { duration: 0.2, ease: 'easeInOut' })
        animate('#star', { opacity: 1, scale: 1 }, { duration: 0.2, ease: 'easeInOut' })
        animate('#cls-btn', { opacity: 1, scale: 1 }, { duration: 0.2, ease: 'easeInOut' })
        animate('#tag', { opacity: 1, y: 0 }, { duration: 0.2, ease: 'easeInOut' })
        setIsMounted(true)
    }

    const tagMap = tagModal.tags.map((item, index) => (
        <motion.p id="tag" key={index} onClick={() => removeTag(item)}>
            {item}
        </motion.p>
    ))

    const body = {
        name: title,
        description,
        favorite: isFavorite,
        color: noteColor.color,
        tags: tagModal.tags,
    }

    useEffect(() => {
        handleAnimate()
    }, [])

    return (
        <motion.div className="ant-mdl-bk-screen" exit={{ opacity: 0 }} ref={scope}>
            <motion.div
                className="add-note-ctr"
                id="cardModal"
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{
                    backgroundColor: noteColor.color,
                    transition: `${isMounted && '0.3s'}`,
                }}
            >
                <div className="add-nt-title" style={{ backgroundColor: noteColor.color }}>
                    <input
                        placeholder="Título"
                        defaultValue={task.name}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ backgroundColor: noteColor.color }}
                    />
                    <motion.div id="star" initial={{ opacity: 0, scale: 0 }}>
                        <Star
                            stroke={isFavorite && 'black'}
                            color={isFavorite ? '#fffb00' : 'gray'}
                            weight={isFavorite ? 'fill' : 'light'}
                            onClick={() => setIsFavorite(!isFavorite)}
                        />
                    </motion.div>
                </div>

                <CustomTextArea value={description} setValue={setDescription} />

                <motion.button
                    className="add-note-btn"
                    id="btn"
                    initial={{ opacity: 0, y: 30 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => updateTask(task.id, body)}
                    whileHover={{ scale: 1.05, backgroundColor: '#e1e1e1' }}
                >
                    Atualizar
                </motion.button>

                <div className="ext-cfg-note">
                    <motion.div
                        className="color-note-btn"
                        id="btn"
                        initial={{ opacity: 0, y: 30 }}
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 1.05, backgroundColor: '#e1e1e1' }}
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
                        whileHover={{ scale: 1.05, backgroundColor: '#e1e1e1' }}
                        style={{ backgroundColor: noteColor.color === '#ffff' ? '#f1f1f1' : 'white' }}
                        onClick={() => openModal('color')}
                    >
                        Color
                    </motion.div>

                    <div className="tag-map">{tagMap}</div>

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
                    onClick={() => setUpdateNoteModal({ isVisible: false, task })}
                >
                    <X />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default UpdateNoteModal
