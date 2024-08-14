import { PropTypes } from 'prop-types'
import React, { createContext, useCallback } from 'react'
import axios from 'axios'

const BASE_URL = 'https://corelab-backend.vercel.app/task'
const token = window.localStorage.getItem('token')

const taskEndpoints = {
    CREATE_TASK: () => ({
        url: `${BASE_URL}/create`,
        options: { headers: { Authorization: token } },
    }),
    GET_ALL_TASKS: (limit, order, by) => ({
        url: `${BASE_URL}/get-all?limit=${limit}&order=${order}&by=${by}`,
        options: { headers: { Authorization: token } },
    }),
    SEARCH_TASK: (word, order, by) => ({
        url: `${BASE_URL}/search/${word}?order=${order || 'desc'}&by=${by || 'created_at'}`,
        options: { headers: { Authorization: token } },
    }),
    UPDATE_TASK: (id) => ({
        url: `${BASE_URL}/edit/${id}`,
        options: { headers: { Authorization: token } },
    }),
    DELETE_TASK: (id) => ({
        url: `${BASE_URL}/delete/${id}`,
        options: { headers: { Authorization: token } },
    }),
}

export const TaskContext = createContext()

export const TaskStorage = ({ children }) => {
    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(null)

    const fetchTasks = useCallback(async (limit, order, by) => {
        try {
            setError(null)
            setLoading(true)

            const { url, options } = taskEndpoints.GET_ALL_TASKS(
                limit || 30,
                order || 'desc',
                by || 'created_at',
            )

            const res = await axios.get(url, options)

            setData(res.data.response)
        } catch (error) {
            setData(null)
            setError(error.response.data)
        } finally {
            setLoading(false)
        }
    }, [])

    const createTask = useCallback(async (body) => {
        try {
            setError(null)
            setLoading(true)

            const { url, options } = taskEndpoints.CREATE_TASK()

            await axios.post(url, body, options)

            fetchTasks()
        } catch (error) {
            setData(null)
            setError(error.response.data)
        } finally {
            setLoading(false)
        }
    }, [])

    const searchTask = useCallback(async (word, order, by) => {
        try {
            setError(null)
            setLoading(true)

            const { url, options } = taskEndpoints.SEARCH_TASK(word, order, by)

            const res = await axios.get(url, options)

            setData(res.data.response)
        } catch (error) {
            setData(null)
            setError(error.response.data)
        } finally {
            setLoading(false)
        }
    }, [])

    const updateTask = useCallback(async (id, body) => {
        try {
            setError(null)
            setLoading(true)

            const { url, options } = taskEndpoints.UPDATE_TASK(id)

            await axios.put(url, body, options)

            fetchTasks()
        } catch (error) {
            setData(null)
            setError(error.response.data)
        } finally {
            setLoading(false)
        }
    }, [])

    const favoriteTask = useCallback(async (id, favorite) => {
        try {
            setError(null)
            setLoading(true)

            const { url, options } = taskEndpoints.UPDATE_TASK(id)

            await axios.put(url, { favorite: !favorite }, options)

            fetchTasks()
        } catch (error) {
            setData(null)
            setError(error.response.data)
        } finally {
            setLoading(false)
        }
    }, [])

    const deleteTask = useCallback(async (id) => {
        try {
            setError(null)
            setLoading(true)

            const { url, options } = taskEndpoints.DELETE_TASK(id)

            await axios.delete(url, options)

            fetchTasks()
        } catch (error) {
            setData(null)
            setError(error.response.data)
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <TaskContext.Provider
            value={{
                data,
                error,
                loading,
                fetchTasks,
                createTask,
                searchTask,
                favoriteTask,
                deleteTask,
                updateTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

TaskStorage.propTypes = {
    children: PropTypes.node.isRequired,
}
