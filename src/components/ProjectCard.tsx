import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onEdit, onDelete, onSelect }: ProjectCardProps) {
  const completedTasks = project.tasks.filter((t) => t.completed).length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const priorityColors: Record<string, string> = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  const statusLabels: Record<string, string> = {
    active: 'Active',
    completed: 'Completed',
    'on-hold': 'On Hold',
  };

  const statusColors: Record<string, string> = {
    active: '#3b82f6',
    completed: '#22c55e',
    'on-hold': '#f59e0b',
  };

  return (
    <div
      className="project-card"
      style={{ borderTop: `4px solid ${project.color}` }}
      onClick={() => onSelect(project)}
    >
      <div className="project-card-header">
        <div className="project-card-title-row">
          <h3 className="project-card-title">{project.title}</h3>
          <span
            className="priority-badge"
            style={{ backgroundColor: priorityColors[project.priority] }}
          >
            {project.priority}
          </span>
        </div>
        <span
          className="status-badge"
          style={{ backgroundColor: statusColors[project.status] }}
        >
          {statusLabels[project.status]}
        </span>
      </div>

      <p className="project-card-description">{project.description}</p>

      <div className="project-card-progress">
        <div className="progress-header">
          <span className="progress-text">
            Tasks: {completedTasks}/{totalTasks}
          </span>
          <span className="progress-percent">{progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%`, backgroundColor: project.color }}
          />
        </div>
      </div>

      <div className="project-card-footer">
        <span className="project-due-date">
          📅 {new Date(project.dueDate).toLocaleDateString()}
        </span>
        <div className="project-card-actions">
          <button
            className="action-btn edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
            title="Edit Project"
          >
            ✏️
          </button>
          <button
            className="action-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project.id);
            }}
            title="Delete Project"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

