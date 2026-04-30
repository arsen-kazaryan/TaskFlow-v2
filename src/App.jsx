
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Board from './pages/Board'
import Projects from './pages/Projects'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import MainLayout from './layouts/MainLayout'


function App() {
const toggleTheme =()=>{
  document.documentElement.classList.toggle('dark')
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
