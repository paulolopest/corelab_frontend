import React, { useEffect } from 'react'
import axios from 'axios'
import { PropTypes } from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { UserRequest } from '../Requests/UserRequest'

export const UserContext = React.createContext('')

const userRequest = new UserRequest()

export const UserStorage = ({ children }) => {
    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [login, setLogin] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const navigate = useNavigate()
    const token = window.localStorage.getItem('token')

    const userLogout = () => {
        setData(null)
        setError(null)
        setLoading(false)

        window.localStorage.removeItem('token')
        window.location.reload()
        setLogin(false)
    }

    const userLogin = React.useCallback(async (username, password) => {
        let req
        try {
            setData(null)
            setError(null)
            setLoading(true)

            const body = {
                username,
                password,
            }

            const { url } = userRequest.USER_LOGIN()
            req = await axios.post(url, body)

            window.localStorage.setItem('token', req.data.token)

            await getProfile(token)

            setLogin(true)
        } catch (err) {
            setData(null)
            setError(err.response.data)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [])

    const userRegister = React.useCallback(async (email, password, username) => {
        let req
        try {
            setData(null)
            setError(null)
            setLoading(true)

            const body = {
                email,
                password,
                username,
            }

            const { url } = userRequest.USER_SIGNUP()
            req = await axios.post(url, body)

            window.localStorage.setItem('token', req.data)

            await getProfile()
            setLogin(true)
            navigate('/')
        } catch (err) {
            setData(null)
            setError(err.response.data)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [])

    const getProfile = React.useCallback(async (token) => {
        try {
            setData(null)
            setError(null)
            setLoading(true)

            const { url, options } = userRequest.GET_PROFILE(token)

            const req = await axios.get(url, options)

            setData(req.data.response)
        } catch (err) {
            setData(null)
            setError(err.response.data)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        userLogin('User', '12345')
    }, [])

    return (
        <UserContext.Provider
            value={{ userLogin, userRegister, userLogout, getProfile, data, error, login, loading }}
        >
            {children}
        </UserContext.Provider>
    )
}

UserStorage.propTypes = {
    children: PropTypes.node.isRequired,
}
