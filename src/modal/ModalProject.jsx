import { useState } from 'react'
import './ModalProject.css'
import { useProjectStore } from '../store/projectStore'

const colorOptions = [
  'dashboard__project-dot--blue',
  'dashboard__project-dot--green',
  'dashboard__project-dot--purple',
  'dashboard__project-dot--yellow',
  'dashboard__project-dot--red',
  'dashboard__project-dot--cyan',
  'dashboard__project-dot--rose',
  'dashboard__project-dot--orange',
]

const ModalProject = ({ onClose }) => {
  const addProject = useProjectStore((state) => state.addProject)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [selectedColor, setSelectedColor] = useState(colorOptions[1])

  const handleCreateProject = () => {
    const trimmedName = projectName.trim()
    const trimmedDescription = projectDescription.trim()

    if (!trimmedName) {
      return
    }

    addProject({
      title: trimmedName,
      description: trimmedDescription || 'Project description will be added later',
      colorClass: selectedColor,
    })

    setProjectName('')
    setProjectDescription('')
    setSelectedColor(colorOptions[1])
    onClose()
  }

  return (
    <div className="modal-project-wrapper">
      <div className="modal-project__div">
        <div className="modal-project__header">
          <h1 className="modal-project__title">New Project</h1>
          <button type="button" className="modal-project__close-btn" onClick={onClose}>X</button>
        </div>
        <div className="modal-project__content-container">
          <p className="modal-project__content-title">Project name</p>
          <input
            type="text"
            className="modal-project__input"
            placeholder="Enter project name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          />
          <p className="modal-project__content-title">Description</p>
          <textarea
            className="modal-project__input"
            placeholder="Enter project description"
            value={projectDescription}
            onChange={(event) => setProjectDescription(event.target.value)}
          />
        </div>
        <div className="modal-project__color-container">
          <p className="modal-project__content-title">Choose Color</p>
          <div className="modal-project__color-list">
            {colorOptions.map((colorClass) => {
              const colorModifier = colorClass.replace('dashboard__project-dot--', 'modal-project__color-item--')

              return (
                <button
                  key={colorClass}
                  type="button"
                  className={`modal-project__color-item ${colorModifier} ${selectedColor === colorClass ? 'modal-project__color-item--active' : ''}`}
                  onClick={() => setSelectedColor(colorClass)}
                ></button>
              )
            })}
          </div>
        </div>
        <div className="modal-project__btn-container">
          <button type="button" className="modal-project__btn modal-project__btn--cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="modal-project__btn modal-project__btn--create"
            onClick={handleCreateProject}
            disabled={!projectName.trim()}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalProject
