import './MainPage.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { Star } from '@phosphor-icons/react'
import useAxios from './../../Hooks/useAxios'
import { TaskRequest } from './../../Requests/TaskRequest'
import NoteCard from '../../Components/NoteCard.jsx/NoteCard'
import { GlobalContext } from './../../Contexts/GlobalContext'
import React, { useCallback, useContext, useEffect, useState } from 'react'

const MainPage = () => {
    const [pageLimit, setPageLimit] = useState(30)
    const [pageOrder, setPageOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('created_at')
    const { setAddNoteModal } = useContext(GlobalContext)

    const taskRequests = new TaskRequest()

    const userReq = useAxios()
    const taskReq = useAxios()

    const fetchTasks = useCallback(() => {
        const { url, options } = taskRequests.GET_ALL_TASKS(pageLimit, pageOrder, orderBy)
        userReq.get(url, options)
    }, [pageLimit, pageOrder, orderBy, taskRequests, userReq])

    const favoriteNote = useCallback(
        (id, favorite) => {
            const { url, options } = taskRequests.EDIT_TASK(id)
            taskReq.put(url, { favorite: !favorite }, options).then(() => {
                fetchTasks()
            })
        },
        [taskRequests, taskReq, fetchTasks],
    )

    const deleteNote = useCallback(
        (id) => {
            const { url, options } = taskRequests.DELETE_TASK(id)
            taskReq.deleteReq(url, options).then(() => {
                fetchTasks()
            })
        },
        [taskRequests, taskReq, fetchTasks],
    )

    useEffect(() => {
        fetchTasks()
    }, [])

    const taskMap =
        userReq.data &&
        userReq.data.response.map((task) => (
            <NoteCard key={task.id} task={task} favoriteNote={favoriteNote} deleteNote={deleteNote} />
        ))

    const favFilter = userReq.data && userReq.data.response.filter((task) => task.favorite === true)
    const favMap =
        favFilter &&
        favFilter.map((task) => (
            <NoteCard key={task.id} task={task} favoriteNote={favoriteNote} deleteNote={deleteNote} />
        ))

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
                            dragConstraints={{ left: -200 * 8, right: 0 }}
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

                    <div className="otr-list-ctr">{taskMap}</div>
                </section>
            </div>
        </div>
    )
}

export default MainPage
