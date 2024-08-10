import { Outlet } from 'react-router-dom'
import { IndexStorage } from '../Contexts/IndexContext'
import Header from './../Components/Header.jsx/Header'
import ModalIndex from '../Components/Modal/ModalIndex'

const Root = () => {
  return (
    <IndexStorage>
      <ModalIndex />
      <Header />
      <Outlet />
    </IndexStorage>
  )
}

export default Root
