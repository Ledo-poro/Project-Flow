export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About ProjectFlow</h1>
        <p className="page-subtitle">Learn more about this project management tool</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="about-card main">
            <div className="about-icon">🚀</div>
            <h2>What is ProjectFlow?</h2>
            <p>
              ProjectFlow is a modern, browser-based project management application built with React and TypeScript.
              It helps individuals and small teams organize their work, track tasks, and stay productive.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title">Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-bullet">📁</span>
              <div>
                <h3>Project Dashboard</h3>
                <p>Central hub to view, filter, and manage all your projects in grid or list view.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-bullet">📝</span>
              <div>
                <h3>Task Management</h3>
                <p>Add tasks with priorities, due dates, and descriptions. Track completion status.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-bullet">💾</span>
              <div>
                <h3>Local Storage</h3>
                <p>All data is stored locally in your browser — no server required, your data stays private.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-bullet">🎨</span>
              <div>
                <h3>Modern UI</h3>
                <p>Clean, responsive design with color themes, priority badges, and progress tracking.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-bullet">🔍</span>
              <div>
                <h3>Search & Filters</h3>
                <p>Quickly find projects with search and filter by status or priority.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-bullet">📊</span>
              <div>
                <h3>Statistics</h3>
                <p>Real-time stats showing project counts, task progress, and completion rates.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <strong>React 19</strong>
              <p>UI Framework</p>
            </div>
            <div className="tech-item">
              <strong>TypeScript</strong>
              <p>Type Safety</p>
            </div>
            <div className="tech-item">
              <strong>Vite</strong>
              <p>Build Tool</p>
            </div>
            <div className="tech-item">
              <strong>React Router</strong>
              <p>Navigation</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-card privacy">
            <div className="about-icon">🔒</div>
            <h2>Privacy First</h2>
            <p>
              ProjectFlow stores all your data locally in your browser using localStorage.
              No data is ever sent to any server. Your projects and tasks remain completely private and under your control.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

