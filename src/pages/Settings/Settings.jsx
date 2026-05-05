import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings">
      <h1 className="title">Settings</h1>
      <p className="subtitle">⚙️ Manage your application preferences</p>

      <div className="card">
        <h2>Appearance</h2>
        <div className="row">
          <div>
            <p className="label">Theme</p>
            <p className="desc">Switch between light and dark mode</p>
          </div>
          <button className="btn dark">
            🌙 Dark Mode
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
          <button className="btn blue">⬇ Export</button>
        </div>

        <div className="divider" />

        <div className="row">
          <div>
            <p className="label">Import Data</p>
            <p className="desc">
              Upload a JSON file to restore your data
            </p>
          </div>
          <button className="btn green">⬆ Import</button>
        </div>

        <div className="divider" />

        <div className="row">
          <div>
            <p className="label">Clear All Data</p>
            <p className="desc">
              Remove all projects, tasks, and settings
            </p>
          </div>
          <button className="btn red">🗑 Clear All</button>
        </div>
      </div>
      {/* Storage Info */}
      <div className="card">
        <h2>Storage Info</h2>

        <div className="stats">
          <div className="stat-box blue-box">
            <p>Total Projects</p>
            <h3>2</h3>
          </div>

          <div className="stat-box green-box">
            <p>Total Columns</p>
            <h3>6</h3>
          </div>

          <div className="stat-box purple-box">
            <p>Total Tasks</p>
            <h3>3</h3>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>About</h2>

        <p className="about-text">
          <b>TaskFlow Team</b> - A powerful team task management application
        </p>
        <p className="about-text">
          Built with React, TypeScript, Tailwind CSS, and React DnD
        </p>
        <p className="about-text">
          All data is stored locally in your browser
        </p>
      </div>
    </div>
  );
}

export default Settings