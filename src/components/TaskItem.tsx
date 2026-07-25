import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const priorityColors: Record<string, string> = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <label className="task-checkbox-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="checkmark"></span>
      </label>

      <div className="task-content">
        <div className="task-title-row">
          <span className={`task-title ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </span>
          <span
            className="priority-dot"
            style={{ backgroundColor: priorityColors[task.priority] }}
            title={task.priority}
          />
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          {task.dueDate && (
            <span className={`task-due-date ${isOverdue ? 'overdue-text' : ''}`}>
              📅 {new Date(task.dueDate).toLocaleDateString()}
              {isOverdue && ' ⚠️ Overdue'}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="task-action-btn edit"
          onClick={() => onEdit(task)}
          title="Edit Task"
        >
          ✏️
        </button>
        <button
          className="task-action-btn delete"
          onClick={() => onDelete(task.id)}
          title="Delete Task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

