import './NoteCard.scss'
import React, { useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PaintBucket, PencilSimpleLine, Star, Warning, X } from '@phosphor-icons/react'
import { TaskContext } from '../../Contexts/TaskContext'
import { GlobalContext } from '../../Contexts/GlobalContext'

const NoteCard = ({ task }) => {
    const [showDelete, setShowDelete] = useState(false)

    const { setUpdateNoteModal } = useContext(GlobalContext)
    const { deleteTask, favoriteTask } = useContext(TaskContext)

    const handleDelete = async (id) => {
        await deleteTask(id)
        setShowDelete(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            style={{ backgroundColor: task.color }}
            className="nt-crd-ctr"
        >
            <div className="nt-crd-title">
                <p>{task.name}</p>
                <Star
                    stroke={task.favorite ? 'gray' : '#ffd752'}
                    color={task.favorite ? '#ffd752' : 'gray'}
                    weight={task.favorite ? 'fill' : 'light'}
                    onClick={() => favoriteTask(task.id, task.favorite)}
                />
            </div>
            <div className="nt-crd-body" dangerouslySetInnerHTML={{ __html: task.description }} />

            <div className="nt-crd-ftr">
                <div className="nt-crd-ftr-fst">
                    <div onClick={() => setUpdateNoteModal({ isVisible: true, task })}>
                        <PencilSimpleLine />
                    </div>
                    <div>
                        <PaintBucket />
                    </div>
                </div>

                <div className="nt-crd-ftr-scd" onClick={() => setShowDelete(true)}>
                    <X />
                </div>
            </div>

            <AnimatePresence>
                {showDelete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="dlt-mdl-ctr"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            exit={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="dlt-mdl"
                        >
                            <div className="dlt-mdl-icn">
                                <Warning />
                            </div>
                            <h1>Deletar Nota</h1>
                            <p>
                                Você está prestes a <span>deletar</span> uma nota. Esta ação é irreversível.
                                Deseja continuar?
                            </p>

                            <div>
                                <button className="dlt-mdl-btn1" onClick={() => setShowDelete(false)}>
                                    Não, manter.
                                </button>
                                <button className="dlt-mdl-btn2" onClick={() => handleDelete(task.id)}>
                                    Sim, deletar!
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default NoteCard
