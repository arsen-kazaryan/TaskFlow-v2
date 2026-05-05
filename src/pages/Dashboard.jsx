import './Dashboard.css'

const stats = [ // в будущем все выведу отдельный файл - {иконки взяты с win + .}
  { id: 1, icon: '📚', value: 3, label: 'Total Tasks', color: 'blue', accent: 'dashboard__stat-card--blue' },
  { id: 2, icon: '⚡', value: 1, label: 'In Progress', color: 'yellow', accent: 'dashboard__stat-card--yellow' },
  { id: 3, icon: '🎉', value: 0, label: 'Completed', color: 'green', accent: 'dashboard__stat-card--green' },
  { id: 4, icon: '⭐', value: 1, label: 'Favorites', color: 'purple', accent: 'dashboard__stat-card--purple' }
]
// accent это цвета кругов в card и они будут вставлятся вторыйм классом 

const projects = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Complete redesign of company website',
    colorClass: 'dashboard__project-dot--blue',
    completed: 0,
    total: 2,
    progress: 2
  },
  {
    id: 2,
    title: 'Mobile App',
    description: 'iOS and Android mobile application',
    colorClass: 'dashboard__project-dot--green',
    completed: 0,
    total: 1,
    progress: 0
  }
]

const upcomingDeadlines = [
  { id: 1, title: 'Setup React project', assignee: 'Jane Smith', date: '25.04.2026' },
  { id: 2, title: 'Design landing page', assignee: 'John Doe', date: '30.04.2026' },
  { id: 3, title: 'Design app icon', assignee: 'Mike Johnson', date: '05.05.2026' }
]

const Dashboard = () => {
  return (

    <section className="dashboard">
      {/* --------------------------------------Dasboard (верхняя часть)----------------------------------*/}
      <div className="dashboard__top">
        <h2 className="dashboard__title">Dashboard</h2>
        <p className="dashboard__subtitle">👋 Welcome back! Here's your project overview</p>
      </div>

      <div className="dashboard__stats">
        {stats.map((stat) => (
          <article key={stat.id} className={`dashboard__stat-card ${stat.accent}`}>
            <div className="dashboard__stat-head">
              <span className="dashboard__stat-icon">{stat.icon}</span>
              <span className="dashboard__stat-ring" aria-hidden="true"></span>
            </div>
            <p className={`dashboard__stat-value dashboard__stat-value--${stat.color}`}>{stat.value}</p>
            <p className="dashboard__stat-label">{stat.label}</p>
          </article>
        ))}
      </div>


      <div className="dashboard__grid" >
      {/* --------------------------------------Active Projects (левая секция)----------------------------------*/}
        <section className="dashboard__panel dashboard__panel--projects" >
          <h2 className="dashboard__panel-title">Active Projects</h2>
          <div className="dashboard__project-list">
            {projects.map((project) => (
              <article key={project.id} className="dashboard__project-card" >
                <div className="dashboard__project-head">
                  <div className={`dashboard__project-dot ${project.colorClass}`}></div>
                  <h3 className="dashboard__project-title" >{project.title}</h3>
                </div>
                <p className="dashboard__project-description">{project.description}</p>
                <div className="dashboard__project-progress-row">
                  <div className="dashboard__project-progress-bar" >
                    <div className="dashboard__project-progress-fill" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  {/* принцип работы прогресс бар 
                  dashboard__project-progress-bar - это внешняя пустая полоска 
                  dashboard__project-progress-fill - это внутренняя цветная полоска
                  style={{ width: ${project.progress}% }} - задает, на сколько процентов она заполнена
                  работает потому что ширина заполняющей части меняется динамический с помощью syle
                  */}
                  <span className="dashboard__project-progress-text">
                    {project.completed}/{project.total}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --------------------------------------High Priority Tasks(правая секция)----------------------------------*/}

        <div className="dashboard__side-panels">
          <section className="dashboard__panel">
            <h2 className="dashboard__panel-title">High Priority Tasks</h2>

            <article className="dashboard__priority-card">
              <h3 className="dashboard__priority-title">Design landing page</h3>
              <p className="dashboard__priority-meta">John Doe • 30.04.2026</p>
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
