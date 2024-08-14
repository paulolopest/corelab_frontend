import './MainPage.scss'
import { Star } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { TaskContext } from '../../Contexts/TaskContext'
import NoteCard from '../../Components/NoteCard.jsx/NoteCard'
import { GlobalContext } from '../../Contexts/GlobalContext'
import React, { useContext, useEffect, useState } from 'react'

const MainPage = () => {
    const [pageOrder, setPageOrder] = useState('desc')
    const [orderBy, setOrderBy] = useState('created_at')

    const { setAddNoteModal } = useContext(GlobalContext)
    const { data, fetchTasks } = useContext(TaskContext)

    useEffect(() => {
        fetchTasks()
    }, [])

    const taskMap =
        data && data.filter((task) => !task.favorite).map((task) => <NoteCard key={task.id} task={task} />)
    const favMap =
        data && data.filter((task) => task.favorite).map((task) => <NoteCard key={task.id} task={task} />)

    return (
        <div className="main-pg-ctr">
            <div>
                <div className="add-note-ctr">
                    <div className="add-note" onClick={() => setAddNoteModal(true)}>
                        <div className="add-nt-title">
                            <input placeholder="Título" />
                            <Star />
                        </div>

                        <div className="add-nt-bd">
                            <p>Criar nota...</p>
                        </div>
                    </div>
                </div>

                <section className="fav-ctr">
                    <h2>Favoritas</h2>
                    {favMap && favMap.length > 0 ? (
                        <motion.div
                            drag="x"
                            dragElastic={0.2}
                            dragConstraints={{ left: -200 * 1, right: 0 }}
                            className="fav-carousel-ctr"
                        >
                            <AnimatePresence>{favMap}</AnimatePresence>
                        </motion.div>
                    ) : (
                        <span className="nn-lst">Nenhuma nota favorita...</span>
                    )}
                </section>

                <section className="other-ctr">
                    <h2>Outras</h2>

                    <div className="otr-list-ctr">
                        <AnimatePresence>{taskMap}</AnimatePresence>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MainPage
