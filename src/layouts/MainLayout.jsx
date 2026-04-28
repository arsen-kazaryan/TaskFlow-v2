import { Link, Outlet } from "react-router-dom"
import './MainLayout.css'
import Header from "../components/Header"
import SideBar from "../components/SideBar"

const MainLayout = () => {
  return (
    <div className="layout"> {/* layout- это общий каркас страницы, который повторяется на разных экранах  */}
      <SideBar/>
      <div className="page">
        <Header/>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout

// MainLayout нужен, чтобы Sidebar и Header не копировать на каждой странице


/*
  Что делает Outlet
  Это место куда будет вставлятся текущая страница
*/