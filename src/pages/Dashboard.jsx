import './Dashboard.css'
import { useProjectStore } from '../store/projectStore'

const upcomingDeadlines = [
  { id: 1, title: 'Setup React project', assignee: 'Jane Smith', date: '25.04.2026' },
  { id: 2, title: 'Design landing page', assignee: 'John Doe', date: '30.04.2026' },
  { id: 3, title: 'Design app icon', assignee: 'Mike Johnson', date: '05.05.2026' },
]

const Dashboard = () => {
  const projects = useProjectStore((state) => state.projects)
  const getDashboardStats = useProjectStore((state) => state.getDashboardStats)

  const statsData = getDashboardStats(projects)

  const stats = [
    { id: 1, value: statsData.total, label: 'Total Tasks', color: 'blue', accent: 'dashboard__stat-card--blue' },
    { id: 2, value: statsData.inProgress, label: 'In Progress', color: 'yellow', accent: 'dashboard__stat-card--yellow' },
    { id: 3, value: statsData.completed, label: 'Completed', color: 'green', accent: 'dashboard__stat-card--green' },
    { id: 4, value: statsData.favorites, label: 'Favorites', color: 'purple', accent: 'dashboard__stat-card--purple' },
  ]

  return (
    <section className="dashboard">
      <div className="dashboard__top">
        <h2 className="dashboard__title">Dashboard</h2>
        <p className="dashboard__subtitle">Welcome back! Here's your project overview</p>
      </div>

      <div className="dashboard__stats">
        {stats.map((stat) => (
          <article key={stat.id} className={`dashboard__stat-card ${stat.accent}`}>
            <div className="dashboard__stat-head">
              <span className="dashboard__stat-ring" aria-hidden="true"></span>
            </div>
            <p className={`dashboard__stat-value dashboard__stat-value--${stat.color}`}>{stat.value}</p>
            <p className="dashboard__stat-label">{stat.label}</p>
          </article>
        ))}
      </div>

      <div className="dashboard__grid">
        <section className="dashboard__panel dashboard__panel--projects">
          <h2 className="dashboard__panel-title">Active Projects</h2>
          <div className="dashboard__project-list">
            {projects.map((project) => (
              <article key={project.id} className="dashboard__project-card">
                <div className="dashboard__project-head">
                  <div className={`dashboard__project-dot ${project.colorClass}`}></div>
                  <h3 className="dashboard__project-title">{project.title}</h3>
                </div>
                <p className="dashboard__project-description">{project.description}</p>
                <div className="dashboard__project-progress-row">
                  <div className="dashboard__project-progress-bar">
                    <div
                      className="dashboard__project-progress-fill"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="dashboard__project-progress-text">
                    {project.tasks.completed}/{project.tasks.total}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="dashboard__side-panels">
          <section className="dashboard__panel">
            <h2 className="dashboard__panel-title">High Priority Tasks</h2>

            <article className="dashboard__priority-card">
              <h3 className="dashboard__priority-title">Design landing page</h3>
              <p className="dashboard__priority-meta">Arsen Kazaryan - 30.04.2026</p>
            </article>
          </section>

          <section className="dashboard__panel">
            <h2 className="dashboard__panel-title">Upcoming Deadlines</h2>

            <div className="dashboard__deadline-list">
              {upcomingDeadlines.map((deadline) => (
                <article key={deadline.id} className="dashboard__deadline-card">
                  <div>
                    <h3 className="dashboard__deadline-title">{deadline.title}</h3>
                    <p className="dashboard__deadline-assignee">{deadline.assignee}</p>
                  </div>
                  <span className="dashboard__deadline-date">{deadline.date}</span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
