import { Outlet } from "react-router-dom"
import './MainLayout.css'
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { useState } from "react"
import ModalProject from "../modal/ModalProject"

const MainLayout = ({ toggleTheme }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
}

  return (
    <div className="layout"> {/* layout- это общий каркас страницы, который повторяется на разных экранах  */}
      <SideBar openModal={openModal}/>
      <div className="page">
        <Header toggleTheme={toggleTheme} />
        <main className="content">
          <Outlet />
        </main>
      </div>
      {modalOpen && <ModalProject onClose={closeModal} />}
    </div>
  )
}

export default MainLayout

// MainLayout нужен, чтобы Sidebar и Header не копировать на каждой странице


/*
  Что делает Outlet
  Это место куда будет вставлятся текущая страница
*/