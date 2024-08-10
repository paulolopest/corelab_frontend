import './Header.scss'
import React from 'react'
import NotePad from './../../Assets/NotePad'
import { MagnifyingGlass, User } from '@phosphor-icons/react'

const Header = () => {
  return (
    <div className="hdr-ctr">
      <div className="hdr-nav-ctr">
        <div className="hdr-logo">
          <NotePad />
          <p>CoreNotes</p>
        </div>

        <div className="src-ctr">
          <input placeholder="Pesquisar notas" />
          <div />
          <MagnifyingGlass color="#9e9e9e" />
        </div>
      </div>

      <div className="pfl-ctr">
        <User />
        <p>Paulo</p>
      </div>
    </div>
  )
}

export default Header
