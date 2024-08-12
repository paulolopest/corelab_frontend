import React, { useContext } from 'react'
import './MainPage.scss'
import { Star } from '@phosphor-icons/react'
import { GlobalContext } from './../../Contexts/GlobalContext'
import NoteCard from '../../Components/NoteCard.jsx/NoteCard'
import { motion } from 'framer-motion'

const MainPage = () => {
    const { setAddNoteModal } = useContext(GlobalContext)
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

                <div className="fav-ctr">
                    <h2>Favoritas</h2>
                    <motion.div
                        drag="x"
                        dragElastic={0.2}
                        dragConstraints={{ left: -1000, right: 0 }}
                        className="fav-carousel-ctr"
                    >
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                    </motion.div>
                </div>
                <div className="other-ctr">
                    <h2>Outras</h2>

                    <div className="otr-list-ctr">
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                    </div>
                </div>
            </div>
            <section />
            <section />
        </div>
    )
}

export default MainPage
