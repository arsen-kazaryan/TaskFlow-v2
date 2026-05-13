import { useRef } from 'react'
import './Settings.css'
import { useThemeStore } from '../../store/themeStore'
import { useProjectStore } from '../../store/projectStore'

const downloadJsonFile = (fileName, data) => {
  const json = JSON.stringify(data, null, 2)
  const fileContent = encodeURIComponent(json)
  const downloadLink = document.createElement('a')

  downloadLink.href = 'data:application/json;charset=utf-8,' + fileContent
  downloadLink.download = fileName
  downloadLink.click()
}

const Settings = () => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const resetTheme = useThemeStore((state) => state.resetTheme)
  const projects = useProjectStore((state) => state.projects)
  const importProjects = useProjectStore((state) => state.importProjects)
  const clearProjects = useProjectStore((state) => state.clearProjects)
  const fileInputRef = useRef(null)

  const totalProjects = projects.length 
  const totalColumns = totalProjects * 3         // Статистика
  let totalTasks = 0

  for (let i = 0; i < projects.length; i++) { // Подсчет с помощью цикла 
    const project = projects[i]

    if (project.taskList) {
      totalTasks = totalTasks + project.taskList.length
    }
  }

  const openImportFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleExportData = () => {
    downloadJsonFile('taskflow-data.json', { projects }) // Export 
  }

  const handleImportFile = (event) => {
    const file = event.target.files[0]  

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = (fileEvent) => {
      try {
        const text = fileEvent.target.result
        const data = JSON.parse(text)
        const projects = data.projects

        if (!Array.isArray(projects)) {
          alert('Import file must contain projects array') // Логика импорта 
          return
        }

        importProjects(projects)
        alert('Projects imported')
      } catch {
        alert('Cannot import this file')
      }
    }

    reader.readAsText(file)
    event.target.value = ''
  }

  const handleClearAll = () => {
    const shouldClear = confirm('Clear all projects, tasks, and settings?')

    if (!shouldClear) {
      return
    }

    clearProjects()
    resetTheme()
  }

  return (
    <div className="settings">
      <h1 className="title">Settings</h1>
      <p className="subtitle">Manage your application preferences</p>

      <div className="card">
        <h2>Appearance</h2>
        <div className="row">
          <div>
            <p className="label">Theme</p>
            <p className="desc">Switch between light and dark mode</p>
          </div>
          <button className="btn theme-btn" type="button" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Data Management</h2>

        <div className="row">
          <div>
            <p className="label">Export Data</p>
            <p className="desc">
              Download all your projects and tasks as JSON
            </p>
          </div>
          <button className="btn blue" type="button" onClick={handleExportData}>Export</button>
        </div>

        <div className="divider" />

        <div className="row">
          <div>
            <p className="label">Import Data</p>
            <p className="desc">
              Upload a JSON file to restore your data
            </p>
          </div>
          <button className="btn green" type="button" onClick={openImportFile}>
            <img src="/import.png" alt="" />
            Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="file-input"
            onChange={handleImportFile}
          />
        </div>

        <div className="divider" />

        <div className="row">
          <div>
            <p className="label">Clear All Data</p>
            <p className="desc">
              Remove all projects, tasks, and settings
            </p>
          </div>
          <button className="btn red" type="button" onClick={handleClearAll}>Clear All</button>
        </div>
      </div>

      <div className="card">
        <h2>Storage Info</h2>

        <div className="stats">
          <div className="stat-box blue-box">
            <p>Total Projects</p>
            <h3>{totalProjects}</h3>
          </div>

          <div className="stat-box green-box">
            <p>Total Columns</p>
            <h3>{totalColumns}</h3>
          </div>

          <div className="stat-box purple-box">
            <p>Total Tasks</p>
            <h3>{totalTasks}</h3>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>About</h2>

        <p className="about-text">
          <b>TaskFlow Team</b> - A team task management application
        </p>
        <p className="about-text">
          Built with React, Vite, CSS, React Router, and Zustand
        </p>
        <p className="about-text">
          All data is stored locally in your browser
        </p>
      </div>
    </div>
  )
}

export default Settings
