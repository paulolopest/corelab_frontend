import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useMedia from '../Hooks/useMedia'

export const GlobalContext = React.createContext('')

export const GlobalStorage = ({ children }) => {
    const [addNoteModal, setAddNoteModal] = useState(true)
    const [colorPicker, setColorPicker] = useState(false)

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
