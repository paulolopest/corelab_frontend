import { PaintBucket, PencilSimpleLine, Star, X } from '@phosphor-icons/react'
import './NoteCard.scss'
import React from 'react'
import { motion } from 'framer-motion'

const NoteCard = () => {
    return (
        <motion.div className="nt-crd-ctr">
            <div className="nt-crd-title">
                <p>Titulo</p>
                <Star />
            </div>
            <div className="nt-crd-body">
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                </p>
            </div>
            <div className="nt-crd-ftr">
                <div>
                    <PencilSimpleLine />
                    <PaintBucket />
                </div>

                <X />
            </div>
        </motion.div>
    )
}

export default NoteCard
