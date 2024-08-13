import React from 'react'
import axios from 'axios'

const useAxios = () => {
    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(null)

    const get = React.useCallback(async (url, options) => {
        try {
            setError(null)
            setLoading(true)

            const res = await axios.get(url, options)

            setData(res.data)
        } catch (err) {
            setData(null)
            setError(err.response.data)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [])

    const post = React.useCallback(async (url, body, config) => {
        try {
            setError(null)
            setLoading(true)

            await axios.post(url, body, config)
        } catch (err) {
            setData(null)
            setError(err.response.data)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [])

    const put = React.useCallback(async (url, body, config) => {
        try {
            setError(null)
            setLoading(true)

            await axios.put(url, body, config)
        } catch (err) {
            setData(null)
            setError(err.response.data)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [])

    const deleteReq = React.useCallback(async (url, options) => {
        try {
            setError(null)
            setLoading(true)

            await axios.delete(url, options)
        } catch (err) {
            setData(null)
            setError(err.response.data)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        data,
        error,
        loading,
        get,
        post,
        put,
        deleteReq,
    }
}

export default useAxios
