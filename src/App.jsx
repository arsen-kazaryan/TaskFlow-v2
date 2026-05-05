
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Settings from "./pages/Settings/Settings";
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
        <Route path='/' element={<MainLayout toggleTheme={toggleTheme} theme={theme}/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='analytics' element={<Analytics/>}/>
          <Route path='projects' element={<Projects/>}/>
          <Route path='settings' element={<Settings/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
