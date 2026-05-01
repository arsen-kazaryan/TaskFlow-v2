import './SideBar.css'
import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <>
      <div className="sidebar">
        <h2 className="sidebar__title">TaskFlow</h2>

        <nav className="sidebar__link-list">
          <Link to='/'>Home</Link>
          <Link to='/projects'>Projects</Link>
          <Link to='/analytics'>Analytics</Link>
          <Link to='/settings'>Settings</Link>
        </nav>
      </div>
    </>
  )
}

export default SideBar