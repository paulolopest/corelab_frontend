import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useMedia from '../Hooks/useMedia'

export const GlobalContext = React.createContext('')

export const GlobalStorage = ({ children }) => {
    const [addNoteModal, setAddNoteModal] = useState(false)
    const [colorPicker, setColorPicker] = useState(false)
    const [updateNoteModal, setUpdateNoteModal] = useState({ isVisible: false, task: null })

    const mediumScreen = useMedia('(max-width: 1050px)')
    const smallScreen = useMedia('(max-width: 800px)')
    const mobileScreen = useMedia('(max-width: 600px)')

    return (
        <GlobalContext.Provider
            value={{
                addNoteModal,
                setAddNoteModal,
                colorPicker,
                setColorPicker,
                updateNoteModal,
                setUpdateNoteModal,
                mediumScreen,
                smallScreen,
                mobileScreen,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

GlobalStorage.propTypes = {
    children: PropTypes.node.isRequired,
}
