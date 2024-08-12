import './FilterModal.scss'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { tags } from '../../../Utils/Extra'
import { CaretUp, List, TagChevron } from '@phosphor-icons/react'

const FilterModal = ({ order, setOrder, tag, setTag }) => {
    const [showOrder, setShowOrder] = useState(false)
    const [showTag, setShowTag] = useState(false)

    const handleClickOrder = (e) => {
        setOrder(e.target.innerText)
        setShowOrder(false)
    }

    const handleClickTag = (e) => {
        setTag(e.target.innerText)
        setShowTag(false)
    }

    const tagMap = tags.map((item, index) => (
        <p onClick={handleClickTag} key={index}>
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
                    <div className="flt-odr-tlt-btn" onClick={() => setShowOrder(!showOrder)}>
                        <p>{order}</p>
                        <CaretUp style={{ rotate: showOrder && '180deg' }} />
                    </div>

                    {showOrder && (
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
                    <p>Tag:</p>
                </div>

                <div className="flt-odr-tlt-btn-ctr">
                    <div className="flt-odr-tlt-btn" onClick={() => setShowTag(!showTag)}>
                        {tag ? (
                            <>
                                <p>{tag}</p>
                                <CaretUp style={{ rotate: showTag && '180deg' }} />
                            </>
                        ) : (
                            <>
                                <p>Selecionar:</p>
                                <CaretUp style={{ rotate: showTag && '180deg' }} />
                            </>
                        )}
                    </div>

                    {showTag && <div className="show-tag">{tagMap}</div>}
                </div>
            </div>
        </motion.div>
    )
}

export default FilterModal
