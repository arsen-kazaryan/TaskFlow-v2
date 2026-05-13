import { useState } from 'react'
import { useProjectStore } from '../../store/projectStore'
import './Style.css'

const getPriorityColor = (priority) => {
  const colors = { high: '#FF6B6B', medium: '#FFD93D', low: '#6BCB77' }
  return colors[priority] || '#999'
}

const getProjectColor = (colorClass) => {
  const colors = {
    'dashboard__project-dot--blue': '#1F88FF',
    'dashboard__project-dot--green': '#1AC768',
    'dashboard__project-dot--purple': '#A855F7',
    'dashboard__project-dot--yellow': '#FACC15',
    'dashboard__project-dot--red': '#F87171',
    'dashboard__project-dot--cyan': '#06B6D4',
    'dashboard__project-dot--rose': '#BC8F8F',
    'dashboard__project-dot--orange': '#FB923C',
  }

  return colors[colorClass] || '#1F88FF'
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
      <span className="due-date">Due: {task.dueDate}</span>
    </div>
  </div>
)

const Column = ({ tasks, statusLabel, priority }) => {
  const visibleTasks = tasks.filter(
    (task) =>
      priority === 'All Priorities' ||
      task.priority.toLowerCase() === priority.toLowerCase()
  )

  return (
    <div className="board-column">
      <div className="column-header">
        <h3>{statusLabel}</h3>
        <span className="task-count">{visibleTasks.length}</span>
      </div>
      <div className="tasks-list">
        {visibleTasks.length === 0 ? (
          <div className="empty-state">No tasks</div>
        ) : (
          visibleTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  )
}

const Projects = () => {
  const projects = useProjectStore((state) => state.projects)
  const createTask = useProjectStore((state) => state.createTask)
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

  const resetBoardState = () => {
    setShowAddForm(false)
    setSearchTerm('')
    setPriority('All Priorities')
    setAssignee('All Assignees')
    setFormData({
      title: '',
      desc: '',
      priority: 'medium',
      status: 'todo',
      tags: '',
      assignee: 'John Doe',
      dueDate: ''
    })
  }

  const openProject = (projectId) => {
    resetBoardState()
    setSelectedProjectId(projectId)
  }

  const closeProject = () => {
    resetBoardState()
    setSelectedProjectId(null)
  }

  const selectedProject = projects.find((project) => project.id === selectedProjectId)

  const addTask = (event) => {
    event?.preventDefault()

    if (!formData.title.trim()) return

    const newTask = {
      title: formData.title,
      desc: formData.desc,
      priority: formData.priority,
      status: formData.status,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
      assignee: { name: formData.assignee, avatar: formData.assignee.charAt(0) },
      dueDate: formData.dueDate
    }

    createTask({ projectId: selectedProjectId, task: newTask })

    resetBoardState()
    setShowAddForm(false)
  }

  if (selectedProject) {
    const filteredTasks = selectedProject.taskList.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.desc.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesAssignee = assignee === 'All Assignees' || task.assignee.name === assignee

      return matchesSearch && matchesAssignee
    })

    const tasksByStatus = {
      todo: filteredTasks.filter((task) => task.status === 'todo'),
      inProgress: filteredTasks.filter((task) => task.status === 'inProgress'),
      done: filteredTasks.filter((task) => task.status === 'done')
    }

    return (
      <div className="board-container">
        <div className="board-header">
          <div>
            <h1>{selectedProject.title}</h1>
            <p>{selectedProject.description}</p>
          </div>
          <button className="back-btn" onClick={closeProject}>Back</button>
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
          <span className="filter-icon">Filter</span>
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
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
            <Column tasks={tasksByStatus.todo} statusLabel="To Do" priority={priority} />
            <Column tasks={tasksByStatus.inProgress} statusLabel="In Progress" priority={priority} />
            <Column tasks={tasksByStatus.done} statusLabel="Done" priority={priority} />
          </div>

          <div className="add-task-panel">
            {!showAddForm ? (
              <button className="open-form-btn" onClick={() => setShowAddForm(true)}>
                Add New Task
              </button>
            ) : (
              <form className="task-form" onSubmit={addTask}>
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
                  <button type="submit" className="btn-save">Save Task</button>
                  <button type="button" className="btn-cancel" onClick={() => setShowAddForm(false)}>Cancel</button>
                </div>
              </form>
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
        <h3>Manage your team projects</h3>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card" onClick={() => openProject(project.id)} style={{ cursor: 'pointer' }}>
            <div className="project-header">
              <div className="project-icon" style={{ backgroundColor: getProjectColor(project.colorClass) }}>
                {project.title.charAt(0)}
              </div>
              <div className="project-title-section">
                <h3 className="project-name">{project.title}</h3>
                <p className="project-description">{project.description}</p>
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
                <span className="info-icon">Tasks</span>
                <span className="info-text">{project.tasks.completed}/{project.tasks.total} tasks</span>
              </div>
              <div className="project-info">
                <span className="info-icon">Team</span>
                <span className="info-text">{project.members}</span>
              </div>
              <div className="project-info">
                <span className="info-icon">Created</span>
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
