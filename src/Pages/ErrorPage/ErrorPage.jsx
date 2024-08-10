import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div>
      <h1>Deu erro</h1>
      <p>Tu fez alguma merda, ta ai o error:</p>
      <p className="text-red-500">{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorPage
