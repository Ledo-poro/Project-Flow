import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Project, Task, ViewMode } from '../types';
import ProjectCard from '../components/ProjectCard';
import TaskItem from '../components/TaskItem';
import ProjectForm from '../components/ProjectForm';
import TaskForm from '../components/TaskForm';

export default function DashboardPage() {
  const [projects, setProjects] = useLocalStorage<Project[]>('pm-projects', []);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Modal states
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = projects.reduce((acc, p) => acc + p.tasks.filter((t) => t.completed).length, 0);

  // Filtered projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Project CRUD
  const handleSaveProject = (project: Project) => {
    setProjects((prev) => {
      const existing = prev.findIndex((p) => p.id === project.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = project;
        return updated;
      }
      return [...prev, project];
    });
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (selectedProject?.id === id) setSelectedProject(null);
    }
  };

  // Task CRUD
  const handleSaveTask = (task: Task) => {
    if (!selectedProject) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === selectedProject.id) {
          const tasks = p.tasks.some((t) => t.id === task.id)
            ? p.tasks.map((t) => (t.id === task.id ? task : t))
            : [...p.tasks, task];
          return { ...p, tasks };
        }
        return p;
      })
    );
  };

  const handleToggleTask = (taskId: string) => {
    if (!selectedProject) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === selectedProject.id) {
          return {
            ...p,
            tasks: p.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: !t.completed } : t
            ),
          };
        }
        return p;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    if (!selectedProject || !window.confirm('Delete this task?')) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === selectedProject.id) {
          return { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) };
        }
        return p;
      })
    );
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const getFilteredTasks = () => {
    if (!selectedProject) return [];
    return selectedProject.tasks;
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Manage your projects and tasks</p>
        </div>
        <button
          className="btn btn-primary add-btn"
          onClick={() => {
            setEditingProject(null);
            setShowProjectForm(true);
          }}
        >
          + New Project
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}>📁</div>
          <div className="stat-info">
            <span className="stat-value">{totalProjects}</span>
            <span className="stat-label">Total Projects</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#22c55e20', color: '#22c55e' }}>✅</div>
          <div className="stat-info">
            <span className="stat-value">{activeProjects}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#8b5cf620', color: '#8b5cf6' }}>✔️</div>
          <div className="stat-info">
            <span className="stat-value">{completedProjects}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f59e0b20', color: '#f59e0b' }}>📋</div>
          <div className="stat-info">
            <span className="stat-value">{completedTasks}/{totalTasks}</span>
            <span className="stat-label">Tasks Done</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              ▦
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className={`projects-container ${viewMode}`}>
        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No projects found</h3>
            <p>{searchQuery ? 'Try a different search' : 'Create your first project to get started'}</p>
            {!searchQuery && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditingProject(null);
                  setShowProjectForm(true);
                }}
              >
                Create Project
              </button>
            )}
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onSelect={setSelectedProject}
            />
          ))
        )}
      </div>

      {/* Selected Project - Task Panel */}
      {selectedProject && (
        <div className="task-panel">
          <div className="task-panel-header">
            <div className="task-panel-title">
              <h2>{selectedProject.title}</h2>
              <span className="task-count">{selectedProject.tasks.length} tasks</span>
            </div>
            <div className="task-panel-actions">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskForm(true);
                }}
              >
                + Add Task
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedProject(null)}
              >
                ✕ Close
              </button>
            </div>
          </div>

          {getFilteredTasks().length === 0 ? (
            <div className="empty-state small">
              <div className="empty-icon">📝</div>
              <p>No tasks yet. Add your first task!</p>
            </div>
          ) : (
            <div className="tasks-list">
              {getFilteredTasks().map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {showProjectForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }}
        />
      )}

      {showTaskForm && selectedProject && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

