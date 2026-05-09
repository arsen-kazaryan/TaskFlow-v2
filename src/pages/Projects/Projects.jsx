import { useState } from 'react'
import './Style.css'
import { useProjectsStore } from '../../store/projectStore'

const getPriorityColor = (priority) => {
  const colors = { high: '#FF6B6B', medium: '#FFD93D', low: '#6BCB77' }
  return colors[priority] || '#999'
}

const TaskCard = ({ task }) => (
  <div className="task-card">
    <div className="task-title">{task.title}</div>
    <div className="task-description">{task.desc}</div>
    <div className="task-tags">
      <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
        {task.priority}
      </span>
      {task.tags.map((tag, idx) => (
        <span key={idx} className="tag">#{tag}</span>
      ))}
    </div>
    <div className="task-footer">
      <div className="assignee">
        <div className="avatar" style={{ backgroundColor: '#1F88FF' }}>
          {task.assignee.avatar}
        </div>
        <span className="assignee-name">{task.assignee.name}</span>
      </div>
      <span className="due-date">рџ“… {task.dueDate}</span>
    </div>
  </div>
)

const Column = ({ tasks, statusLabel }) => (
  <div className="board-column">
    <div className="column-header">
      <h3>{statusLabel}</h3>
      <span className="task-count">{tasks.length}</span>
    </div>
    <div className="tasks-list">
      {tasks.length === 0 ? (
        <div className="empty-state">No tasks</div>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  </div>
)

const Projects = () => {
  const projects = useProjectsStore((state) => state.projects)
  const createTask = useProjectsStore((state) => state.createTask)

  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [priority, setPriority] = useState('All Priorities')
  const [assignee, setAssignee] = useState('All Assignees')
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    priority: 'medium',
    status: 'todo',
    tags: '',
    assignee: 'John Doe',
    dueDate: ''
  })

  const selectedProject = projects.find((project) => project.id === selectedProjectId)

  const addTask = () => {
    if (!formData.title.trim()) return

    const newTask = {
      id: Date.now(),
      title: formData.title,
      desc: formData.desc,
      priority: formData.priority,
      status: formData.status,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
      assignee: { name: formData.assignee, avatar: formData.assignee.charAt(0) },
      dueDate: formData.dueDate
    }

    createTask({projectId: selectedProject.id, newTask})

    setFormData({
      title: '',
      desc: '',
      priority: 'medium',
      status: 'todo',
      tags: '',
      assignee: 'John Doe',
      dueDate: ''
    })
    setShowAddForm(false)
  }

  if (selectedProject) {
    const tasksByStatus = {
      todo: selectedProject.taskList.filter((task) => task.status === 'todo'),
      inProgress: selectedProject.taskList.filter((task) => task.status === 'inProgress'),
      done: selectedProject.taskList.filter((task) => task.status === 'done')
    }

    return (
      <div className="board-container">
        <div className="board-header">
          <div>
            <h1>{selectedProject.name}</h1>
            <p>{selectedProject.desc}</p>
          </div>
          <button className="back-btn" onClick={() => setSelectedProjectId(null)}>в†ђ Back</button>
        </div>

        <div className="board-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <span className="filter-icon"></span>
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option>All Priorities</option>
            <option>High</option><option>Medium</option>
            <option>Low</option>
          </select>
          <select value={assignee} onChange={(event) => setAssignee(event.target.value)}>
            <option>All Assignees</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
          </select>
        </div>

        <div className="board-wrapper">
          <div className="board-grid">
            <Column tasks={tasksByStatus.todo} statusLabel="To Do" />
            <Column tasks={tasksByStatus.inProgress} statusLabel="In Progress" />
            <Column tasks={tasksByStatus.done} statusLabel="Done" />
          </div>

          <div className="add-task-panel">
            {!showAddForm ? (
              <button className="open-form-btn" onClick={() => setShowAddForm(true)}>
                Add New Task
              </button>
            ) : (
              <div className="task-form">
                <h3>Create New Task</h3>
                <input
                  type="text"
                  placeholder="Task title"
                  value={formData.title}
                  onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                />
                <textarea
                  placeholder="Description"
                  value={formData.desc}
                  onChange={(event) => setFormData({ ...formData, desc: event.target.value })}
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={(event) => setFormData({ ...formData, tags: event.target.value })}
                />
                <div className="form-row">
                  <select value={formData.priority} onChange={(event) => setFormData({ ...formData, priority: event.target.value })}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <select value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value })}>
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="form-row">
                  <select value={formData.assignee} onChange={(event) => setFormData({ ...formData, assignee: event.target.value })}>
                    <option>John Doe</option>
                    <option>Jane Smith</option>
                  </select>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(event) => setFormData({ ...formData, dueDate: event.target.value })}
                  />
                </div>
                <div className="form-buttons">
                  <button className="btn-save" onClick={addTask}>Save Task</button>
                  <button className="btn-cancel" onClick={() => setShowAddForm(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>Projects</h1>
        <h3>рџљЂ Manage your team projects</h3>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card" onClick={() => setSelectedProjectId(project.id)} style={{ cursor: 'pointer' }}>
            <div className="project-header">
              <div className="project-icon" style={{ backgroundColor: project.color }}>
                {project.icon}
              </div>
              <div className="project-title-section">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.desc}</p>
                </div>
            </div>

            <div className="project-progress-section">
              <div className="progress-label-row">
                <span className="progress-label">Progress</span>
                <span className="progress-percentage">{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>

            <div className="project-footer">
              <div className="project-info">
                <span className="info-icon"></span>
                <span className="info-text">{project.tasks.completed}/{project.tasks.total} tasks</span>
              </div>
              <div className="project-info">
                <span className="info-icon"></span>
                <span className="info-text">{project.members}</span>
              </div>
              <div className="project-info">
                <span className="info-icon">…</span>
                <span className="info-text">Created {project.created}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects