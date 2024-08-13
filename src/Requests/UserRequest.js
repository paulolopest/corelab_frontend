const BASE_URL = 'https://corelab-backend.vercel.app/user'
const token = window.localStorage.getItem('token')

export class UserRequest {
    USER_LOGIN = () => {
        return {
            url: `${BASE_URL}/login`,
        }
    }

    USER_SIGNUP = () => {
        return {
            url: `${BASE_URL}/create`,
        }
    }

    GET_PROFILE = () => {
        return {
            url: `${BASE_URL}/profile`,
            options: {
                headers: {
                    Authorization: token,
                },
            },
        }
    }
}
