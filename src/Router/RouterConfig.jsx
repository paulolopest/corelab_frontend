import Root from './Root'
import MainPage from './../Pages/MainPage/MainPage'
import ErrorPage from './../Pages/ErrorPage/ErrorPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MainPage />,
            },
        ],
    },
])

export const RouterConfig = () => {
    return <RouterProvider router={router} />
}
