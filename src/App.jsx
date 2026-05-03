
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Board from './pages/Board'
import Projects from './pages/Projects'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import MainLayout from './layouts/MainLayout'
import { useEffect, useState } from 'react'


function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout toggleTheme={toggleTheme}/>}>
          <Route index element={<Board/>}/>
          <Route path='analytics' element={<Analytics/>}/>
          <Route path='projects' element={<Projects/>}/>
          <Route path='settings' element={<Settings/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
