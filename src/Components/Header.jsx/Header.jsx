import './Header.scss'
import React, { useState } from 'react'
import NotePad from './../../Assets/NotePad'
import { Funnel, MagnifyingGlass, User } from '@phosphor-icons/react'
import FilterModal from '../Modal/Filter/FilterModal'
import { AnimatePresence } from 'framer-motion'

const Header = () => {
    const [tag, setTag] = useState('')
    const [filterModal, setFilterModal] = useState(false)
    const [order, setOrder] = React.useState('Mais recentes')
    return (
        <div className="hdr-ctr">
            <div className="hdr-nav-ctr">
                <div className="hdr-logo">
                    <NotePad />
                    <p>CoreNotes</p>
                </div>

                <div className="src-ctr">
                    <input placeholder="Pesquisar notas" />
                    <div />
                    <MagnifyingGlass color="#9e9e9e" />
                </div>

                <div className="filter-ctr">
                    <div className="filter-ctr-ctct" onClick={() => setFilterModal(!filterModal)}>
                        <Funnel />
                        <p>Filtrar</p>
                    </div>

                    <AnimatePresence>
                        {filterModal && (
                            <FilterModal order={order} setOrder={setOrder} tag={tag} setTag={setTag} />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="pfl-ctr">
                <User />
                <p>Paulo</p>
            </div>
        </div>
    )
}

export default Header
