
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Projects from './pages/Projects/Projects'
import Settings from './pages/Settings/Settings'
import Analytics from './pages/Analytics'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import { useThemeStore } from './store/themeStore'
import { useEffect } from 'react'

function App() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', theme)
}, [theme])


  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
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
