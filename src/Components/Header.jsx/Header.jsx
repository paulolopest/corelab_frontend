import './Header.scss'
import NotePad from './../../Assets/NotePad'
import FilterModal from '../Modal/Filter/FilterModal'
import { AnimatePresence, motion } from 'framer-motion'
import { TaskContext } from '../../Contexts/TaskContext'
import { GlobalContext } from '../../Contexts/GlobalContext'
import React, { useContext, useEffect, useState } from 'react'
import { Funnel, MagnifyingGlass } from '@phosphor-icons/react'

const Header = () => {
    const [searchWord, setSearchWord] = useState('')
    const [filterModal, setFilterModal] = useState(false)

    const { smallScreen } = useContext(GlobalContext)
    const { searchTask, fetchTasks } = useContext(TaskContext)

    useEffect(() => {
        const handleSearch = () => {
            if (searchWord) {
                searchTask(searchWord)
            } else {
                fetchTasks(30, 'desc', 'created_at')
            }
        }

        const debounceTimeout = setTimeout(handleSearch, 500)

        return () => clearTimeout(debounceTimeout)
    }, [searchWord, searchTask, fetchTasks])

    return (
        <div className="hdr-ctr">
            <div className="hdr-nav-ctr">
                <div className="hdr-logo">
                    <NotePad />
                    {!smallScreen && <p>CoreNotes</p>}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="src-ctr"
                >
                    <motion.input
                        value={searchWord}
                        onChange={({ target }) => setSearchWord(target.value)}
                        placeholder="Pesquisar notas"
                    />
                    <div />
                    <MagnifyingGlass onClick={() => searchTask(searchWord)} color="#9e9e9e" />
                </motion.div>

                <motion.div
                    className="filter-ctr"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="filter-ctr-ctct" onClick={() => setFilterModal(!filterModal)}>
                        <Funnel />
                        <p>Filtrar</p>
                    </div>

                    <AnimatePresence>
                        {filterModal && <FilterModal searchWord={searchWord} />}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    )
}

export default Header
