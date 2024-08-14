import React from 'react'
import { PropTypes } from 'prop-types'
import { UserStorage } from './UserContext'
import { TaskStorage } from './TaskContext'
import { GlobalStorage } from './GlobalContext'

export const IndexContext = React.createContext()

export const IndexStorage = ({ children }) => {
    return (
        <IndexContext.Provider value={{}}>
            <UserStorage>
                <TaskStorage>
                    <GlobalStorage>{children}</GlobalStorage>
                </TaskStorage>
            </UserStorage>
        </IndexContext.Provider>
    )
}

IndexStorage.propTypes = {
    children: PropTypes.node.isRequired,
}
