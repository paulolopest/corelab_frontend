const BASE_URL = 'https://corelab-backend.vercel.app/task'
const token = window.localStorage.getItem('token')

export class TaskRequest {
    CREATE_TASK = () => {
        return {
            url: `${BASE_URL}/create`,
            options: {
                headers: {
                    Authorization: token,
                },
            },
        }
    }

    GET_ALL_TASKS = (limit, order, by) => {
        return {
            url: `${BASE_URL}/get-all?limit=${limit}&order=${order}&by=${by}`,
            options: {
                headers: {
                    Authorization: token,
                },
            },
        }
    }

    GET_TASK_BY_ID = (id) => {
        return {
            url: `${BASE_URL}/${id}`,
            options: {
                headers: {
                    Authorization: token,
                },
            },
        }
    }

    SEARCH_TASK = (word) => {
        return {
            url: `${BASE_URL}/search/${word}`,
            options: {
                headers: {
                    Authorization: token,
                },
            },
        }
    }

    EDIT_TASK = (id) => {
        return {
            url: `${BASE_URL}/edit/${id}`,
            options: {
                headers: {
                    Authorization: token,
                },
            },
        }
    }

    DELETE_TASK = (id) => {
        return {
            url: `${BASE_URL}/delete/${id}`,
            options: {
                headers: {
                    Authorization: token,
                },
            },
        }
    }
}
