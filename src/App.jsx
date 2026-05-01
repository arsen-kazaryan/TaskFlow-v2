
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Projects from './pages/Projects/Projects'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import MainLayout from './layouts/MainLayout'
import Board from './pages/Board'



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
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
