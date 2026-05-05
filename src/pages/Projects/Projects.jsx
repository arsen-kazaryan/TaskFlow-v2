import { useState } from 'react'
import './Style.css'

const Projects = () => {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: "Website Redesign", 
      desc: "Complete redesign of company website", 
      icon: "W", 
      color: "#1F88FF", 
      progress: 0, 
      tasks: { completed: 0, total: 2 }, 
      members: 2, 
      created: "01.05.2026",
      taskList: [
        { id: 101, title: "Design landing page", desc: "Create mockups for the new landing page", status: "todo", priority: "high", tags: ["design", "ui"], assignee: { name: "John Doe", avatar: "J" }, dueDate: "30 апр." },
        { id: 102, title: "Setup React project", desc: "Initialize React project with TypeScript", status: "inProgress", priority: "medium", tags: ["development"], assignee: { name: "Jane Smith", avatar: "J" }, dueDate: "25 апр." }
      ]
    },
    { 
      id: 2, 
      name: "Mobile App", 
      desc: "iOS and Android mobile application", 
      icon: "M", 
      color: "#1AC768", 
      progress: 0, 
      tasks: { completed: 0, total: 1 }, 
      members: 1, 
      created: "01.05.2026",
      taskList: []
    }
  ])

  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [priority, setPriority] = useState('All Priorities')
  const [assignee, setAssignee] = useState('All Assignees')
  const [formData, setFormData] = useState({
    title: '', desc: '', priority: 'medium', status: 'todo', tags: '', assignee: 'John Doe', dueDate: ''
  })

  const selectedProject = projects.find(p => p.id === selectedProjectId)

  const addTask = () => {
    if (!formData.title.trim()) return

    const newTask = {
      id: Date.now(),
      title: formData.title,
      desc: formData.desc,
      priority: formData.priority,
      status: formData.status,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      assignee: { name: formData.assignee, avatar: formData.assignee.charAt(0) },
      dueDate: formData.dueDate
    }

    setProjects(projects.map(p => 
      p.id === selectedProjectId
        ? { ...p, taskList: [...p.taskList, newTask] }
        : p
    ))

    setFormData({
      title: '', desc: '', priority: 'medium', status: 'todo', tags: '', assignee: 'John Doe', dueDate: ''
    })
    setShowAddForm(false)
  }

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { label: ' High', className: 'priority-high' },
      medium: { label: 'Medium', className: 'priority-medium' },
      low: { label: 'Low', className: 'priority-low' }
    }
    return badges[priority] || { label: priority, className: '' }
  }

  if (selectedProject) {
    const tasksByStatus = {
      todo: selectedProject.taskList.filter(t => t.status === 'todo'),
      inProgress: selectedProject.taskList.filter(t => t.status === 'inProgress'),
      done: selectedProject.taskList.filter(t => t.status === 'done')
    }

    const TaskCard = ({ task }) => {
      const { label, className: priorityClass } = getPriorityBadge(task.priority)
      return (
        <div className="task-card">
          <div className="task-title">{task.title}</div>
          <div className="task-description">{task.desc}</div>
          <div className="task-tags">
            <span className={`priority-badge ${priorityClass}`}>
              {label}
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
            <span className="due-date"> {task.dueDate}</span>
          </div>
        </div>
      )
    }

    const Column = ({ status, tasks, statusLabel }) => (
      <div className="board-column">
        <div className="column-header">
          <h3>{statusLabel}</h3>
          <span className="task-count">{tasks.length}</span>
        </div>
        <div className="tasks-list">
          {tasks.length === 0 ? (
            <div className="empty-state">No tasks</div>
          ) : (
            tasks.map(task => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    )

    return (
      <div className="board-container">
        <div className="board-header">
          <div>
            <h1>{selectedProject.name}</h1>
            <p>{selectedProject.desc}</p>
          </div>
          <button className="back-btn" onClick={() => setSelectedProjectId(null)}>← Back</button>
        </div>

        <div className="board-controls">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
            <option>All Assignees</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
          </select>
        </div>

        <div className="board-wrapper">
          <div className="board-grid">
            <Column status="todo" tasks={tasksByStatus.todo} statusLabel="To Do" />
            <Column status="inProgress" tasks={tasksByStatus.inProgress} statusLabel="In Progress" />
            <Column status="done" tasks={tasksByStatus.done} statusLabel="Done" />
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
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <textarea 
                  placeholder="Description"
                  value={formData.desc}
                  onChange={(e) => setFormData({...formData, desc: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
                <div className="form-row">
                  <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="form-row">
                  <select value={formData.assignee} onChange={(e) => setFormData({...formData, assignee: e.target.value})}>
                    <option>John Doe</option>
                    <option>Jane Smith</option>
                  </select>
                  <input 
                    type="date" 
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
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
        <h3>Manage your team projects</h3>
      </div>

      <div className="projects-grid">
        {projects.map(p => (
          <div key={p.id} className="project-card" onClick={() => setSelectedProjectId(p.id)} style={{ cursor: 'pointer' }}>
            <div className="project-header">
              <div className="project-icon" style={{ backgroundColor: p.color }}>
                {p.icon}
              </div>
              <div className="project-title-section">
                <h3 className="project-name">{p.name}</h3>
                <p className="project-description">{p.desc}</p>
              </div>
            </div>

            <div className="project-progress-section">
              <div className="progress-label-row">
                <span className="progress-label">Progress</span>
                <span className="progress-percentage">{p.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${p.progress}%` }}></div>
              </div>
            </div>

            <div className="project-footer">
              <div className="project-info">
                <span className="info-icon">✓</span>
                <span className="info-text">{p.tasks.completed}/{p.tasks.total} tasks</span>
              </div>
              <div className="project-info">
                <span className="info-icon"></span>
                <span className="info-text">{p.members}</span>
              </div>
              <div className="project-info">
                <span className="info-icon"></span>
                <span className="info-text">Created {p.created}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects