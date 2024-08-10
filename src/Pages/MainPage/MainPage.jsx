import React from 'react'
import './MainPage.scss'
import { Star } from '@phosphor-icons/react'

const MainPage = () => {
  return (
    <div className="main-pg-ctr">
      <div>
        <div className="add-note-ctr">
          <div className="add-note">
            <div className="add-nt-title">
              <input placeholder="Título" />
              <Star />
            </div>

            <div className="add-nt-bd">
              <p>Criar nota...</p>
            </div>
          </div>
        </div>
      </div>
      <section></section>
      <section></section>
    </div>
  )
}

export default MainPage
