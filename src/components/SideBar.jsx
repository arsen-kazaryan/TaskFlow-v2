import './SideBar.css'
import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <>
      <div className="sidebar">
        <h2 className="sidebar__title">TaskFlow</h2>

        <nav className="sidebar__link-list">
          <Link to='/'>Home</Link>
          <Link to='/board'>board</Link>
          <Link to='/projects'>projects</Link>
          <Link to='/analytics'>Analytics</Link>
          <Link to='/settings'>settings</Link> {/*В дальнейшем надо использвовывать NavLink для отслеживания активного состояния */}
        </nav>
      </div>
    </>
  )
}

export default SideBar