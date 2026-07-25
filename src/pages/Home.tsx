import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Project } from '../types';

export default function HomePage() {
  const [projects] = useLocalStorage<Project[]>('pm-projects', []);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = projects.reduce((acc, p) => acc + p.tasks.filter((t) => t.completed).length, 0);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {greeting}! 👋
          </h1>
          <p className="hero-subtitle">
            Welcome to <strong>ProjectFlow</strong> — your all-in-one project management solution.
            Organize tasks, track progress, and deliver results.
          </p>

          {projects.length > 0 && (
            <div className="hero-stats">
              <div className="hero-stat-item">
                <span className="hero-stat-value">{projects.length}</span>
                <span className="hero-stat-label">Projects</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-item">
                <span className="hero-stat-value">{totalTasks}</span>
                <span className="hero-stat-label">Tasks</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-item">
                <span className="hero-stat-value">{completedTasks}</span>
                <span className="hero-stat-label">Completed</span>
              </div>
            </div>
          )}

          <div className="hero-actions">
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Go to Dashboard →
            </Link>
            {projects.length === 0 && (
              <p className="hero-hint">Start by creating your first project!</p>
            )}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-emoji">🚀</div>
          <div className="floating-elements">
            <span className="float-item" style={{ animationDelay: '0s' }}>📋</span>
            <span className="float-item" style={{ animationDelay: '0.5s' }}>✅</span>
            <span className="float-item" style={{ animationDelay: '1s' }}>🎯</span>
            <span className="float-item" style={{ animationDelay: '1.5s' }}>📊</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why ProjectFlow?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📁</div>
            <h3>Project Management</h3>
            <p>Create, edit, and organize projects with ease. Track status, priority, and deadlines.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Task Tracking</h3>
            <p>Break down projects into manageable tasks. Mark completion and monitor progress.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Auto Save</h3>
            <p>All data is automatically saved to your browser. Your work is always safe.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Modern Design</h3>
            <p>Clean, intuitive interface with customizable themes and responsive layout.</p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      {projects.length > 0 && (
        <section className="recent-section">
          <h2 className="section-title">Recent Projects</h2>
          <div className="recent-projects">
            {projects.slice(-3).reverse().map((project) => (
              <Link to="/dashboard" key={project.id} className="recent-project-card">
                <div className="recent-project-color" style={{ backgroundColor: project.color }} />
                <div className="recent-project-info">
                  <h4>{project.title}</h4>
                  <p>{project.tasks.length} tasks • {project.tasks.filter(t => t.completed).length} done</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

