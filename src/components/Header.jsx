import './Header.css'

const Header = () => {
  return (
    <header className='header'>
      <div className='header__search'>
        <input
          type='text'
          className='header__input'
          placeholder='Search tasks, projects...'
        />
      </div>

      <div className='header__right'>
        <div className='header__actions'>
          <button className='header__action-btn  header__action-btn--toggle-theme' type='button' >
            X
          </button>
          <button className='header__action-btn header__action-btn--notification' >
            N
          </button>
        </div>

        <div className='header__profile'>
          <div className='header__profile-avatar'>JD</div>
          <div className='header__profile-info'>
            <p className='header__profile-name'>John Doe</p>
            <span className='header__profile-role'>Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
