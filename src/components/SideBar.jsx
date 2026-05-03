import './SideBar.css'
import {  NavLink } from "react-router-dom"

const SideBar = ({openModal}) => {
  return (
    <>
      <aside className="sidebar">
        <div className='sidebar__logo-container'>

          <h2 className="sidebar__title">TaskFlow</h2>
          <p className='sidebar__desc'>Team manager</p>
        </div>
        <nav className="sidebar__link-list">
          <NavLink className={({ isActive }) => 
            isActive 
          ? 'sidebar__link-item sidebar__link-item--active' 
            : 'sidebar__link-item '} to='/'>Dashboard</NavLink>
          <NavLink className={({ isActive }) => 
            isActive 
          ? 'sidebar__link-item sidebar__link-item--active' 
            : 'sidebar__link-item '} to='/projects'>Projects</NavLink>
          <NavLink className={({ isActive }) => 
            isActive 
          ? 'sidebar__link-item sidebar__link-item--active' 
            : 'sidebar__link-item '} to='/analytics'>Analytics</NavLink>
          <NavLink className={({ isActive }) => 
            isActive 
          ? 'sidebar__link-item sidebar__link-item--active' 
            : 'sidebar__link-item '} to='/settings'>Settings</NavLink> {/*В дальнейшем надо использвовывать NavLink для отслеживания активного состояния */}
        </nav>

        <button className='sidebar__btn' onClick={openModal}>+ New Project</button>
      </aside>
    </>
  )
}

export default SideBar
