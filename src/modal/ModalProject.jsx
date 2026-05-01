import './ModalProject.css'

const ModalProject = ({ onClose }) => {
  return (
    <div className="modal-project-wrapper">
      <div className="modal-project__div">
        <div className="modal-project__header">
          <h1 className="modal-project__title">🚀New Project</h1>
          <button type="button" className="modal-project__close-btn" onClick={onClose}>X</button>
        </div>
        <div className="modal-project__content-container">
          <p className="modal-project__content-title">Project name</p>
          <input type="text" className="modal-project__input" placeholder="Enter project name" />
          <p className="modal-project__content-title">Description</p>
          <textarea className="modal-project__input" placeholder="Enter project description" />
        </div>
        <div className="modal-project__color-container">
          <p className="modal-project__content-title">🎨Choose Color</p>
          <div className="modal-project__color-list">
            <button type="button" className="modal-project__color-item modal-project__color-item--blue"></button>
            <button type="button" className="modal-project__color-item modal-project__color-item--green modal-project__color-item--active"></button>
            <button type="button" className="modal-project__color-item modal-project__color-item--purple"></button>
            <button type="button" className="modal-project__color-item modal-project__color-item--yellow"></button>
            <button type="button" className="modal-project__color-item modal-project__color-item--red"></button>
            <button type="button" className="modal-project__color-item modal-project__color-item--cyan"></button>
            <button type="button" className="modal-project__color-item modal-project__color-item--rose"></button>
            <button type="button" className="modal-project__color-item modal-project__color-item--orange"></button>
          </div>
        </div>
        <div className="modal-project__btn-container">
          <button type="button" className="modal-project__btn modal-project__btn--cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="modal-project__btn modal-project__btn--create">
            Create Project
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalProject