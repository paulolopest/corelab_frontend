import './FilterModal.scss'
import { motion } from 'framer-motion'
import { colors } from '../../../Utils/Extra'
import React, { useContext, useState } from 'react'
import { TaskContext } from '../../../Contexts/TaskContext'
import { CaretUp, List, TagChevron } from '@phosphor-icons/react'

const FilterModal = ({ searchWord }) => {
    const [orderModal, setOrderModal] = useState({ isVisible: false, order: 'asc', reliable: 'Mais recente' })
    const [colorModal, setColorModal] = useState({ isVisible: false, color: '' })

    const { searchTask, fetchTasks } = useContext(TaskContext)

    const handleClickOrder = (e) => {
        if (e.target.innerText === 'Mais recentes') {
            setOrderModal({ isVisible: false, order: 'desc', reliable: 'Mais recente' })
        } else {
            setOrderModal({ isVisible: false, order: 'asc', reliable: 'Mais antigo' })
        }
    }

    const handleClickColor = (e) => {
        setColorModal({ isVisible: false, color: e.target.innerText.replaceAll('#', '') })
    }

    const handleFilter = () => {
        if (searchWord) {
            searchTask(searchWord, orderModal.order, 'created_at')
            console.log('1')
        } else if (colorModal.color) {
            searchTask(colorModal.color, orderModal.order, 'created_at')
            console.log('2')
        } else {
            fetchTasks(30, orderModal.order, 'created_at')
            console.log('3')
        }
    }

    const colorMap = colors.map((item, index) => (
        <p style={{ backgroundColor: item }} onClick={handleClickColor} key={index}>
            {item}
        </p>
    ))

    return (
        <motion.div
            className="flt-mdl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
            <div className="flt-order">
                <div className="flt-odr-title">
                    <List />
                    <p>Ordenar:</p>
                </div>

                <div className="flt-odr-tlt-btn-ctr">
                    <div
                        className="flt-odr-tlt-btn"
                        onClick={() =>
                            setOrderModal({
                                isVisible: !orderModal.isVisible,
                                order: orderModal.order,
                                reliable: orderModal.reliable,
                            })
                        }
                    >
                        <p>{orderModal.reliable}</p>
                        <CaretUp style={{ rotate: orderModal.isVisible && '180deg' }} />
                    </div>

                    {orderModal.isVisible && (
                        <div className="show-order">
                            <p onClick={handleClickOrder}>Mais recentes</p>
                            <p onClick={handleClickOrder}>Mais antigos</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flt-order">
                <div className="flt-odr-title">
                    <TagChevron />
                    <p>Cor:</p>
                </div>

                <div className="flt-odr-tlt-btn-ctr">
                    <div
                        className="flt-odr-tlt-btn"
                        onClick={() =>
                            setColorModal({ isVisible: !colorModal.isVisible, color: colorModal.color })
                        }
                    >
                        {colorModal.color ? (
                            <>
                                <p style={{ backgroundColor: `#${colorModal.color} || 'white'` }}>
                                    {colorModal.color}
                                </p>
                                <CaretUp style={{ rotate: colorModal.isVisible && '180deg' }} />
                            </>
                        ) : (
                            <>
                                <p>Selecionar:</p>
                                <CaretUp style={{ rotate: colorModal.isVisible && '180deg' }} />
                            </>
                        )}
                    </div>

                    {colorModal.isVisible && <div className="show-tag">{colorMap}</div>}
                </div>
            </div>

            <button className="flt-mdl-btn-cfm" onClick={handleFilter}>
                Confirmar
            </button>
        </motion.div>
    )
}

export default FilterModal
