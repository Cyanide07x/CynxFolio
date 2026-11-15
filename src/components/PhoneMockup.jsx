import { useState, useRef } from 'react';
import { content } from '../data/content.js';

export default function PhoneMockup({ project, onTaskToggle }) {
  const [activeTab, setActiveTab] = useState('workspace');
  const calcynxProject = project || content.work.projects.find((p) => p.id === 'calcynx') || content.work.projects[0];
  const defaultTasks = [
    { id: 'task-1', title: 'Electricity bill', date: '14', completed: false },
    { id: 'task-2', title: 'Team sync notes', date: 'Today', completed: true },
    { id: 'task-3', title: 'Renew subscription', date: 'Mon', completed: false },
    { id: 'task-4', title: 'Plan next sprint', date: 'Next', completed: false },
  ];
  const [tasks, setTasks] = useState(calcynxProject?.tasks || defaultTasks);
  const [isWiping, setIsWiping] = useState(false);
  const cardRef = useRef(null);

  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setIsWiping(true);
    setTimeout(() => {
      setIsWiping(false);
    }, 280);
  };

  const handleTaskClick = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
    onTaskToggle?.(taskId);
  };

  // 3D perspective mouse tilt
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `perspective(1000px) rotateY(${x * 0.04}deg) rotateX(${-y * 0.04}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    }
  };

  return (
    <div
      ref={cardRef}
      className="phone-mockup-frame"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Phone Screen Shard Wipe Overlay */}
      <div className={`shard-wipe-layer ${isWiping ? 'is-active' : ''}`} aria-hidden="true" />

      {/* Top Segmented Controls */}
      <div className="phone-tabs-bar" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'workspace'}
          className={`phone-tab ${activeTab === 'workspace' ? 'is-active' : ''}`}
          onClick={() => handleTabSwitch('workspace')}
        >
          Workspace
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'calendar'}
          className={`phone-tab ${activeTab === 'calendar' ? 'is-active' : ''}`}
          onClick={() => handleTabSwitch('calendar')}
        >
          Calendar
        </button>
      </div>

      {/* Locked Screen Viewport (Size Never Changes) */}
      <div className="phone-screen-viewport">
        {/* Workspace Screen Pane */}
        <div className={`phone-tab-pane ${activeTab === 'workspace' ? 'is-active' : ''}`}>
          <div className="phone-screen-content">
            <div className="screen-header">
              <h4>YOUR WORKSPACE</h4>
              <p>Keep everything in sync.</p>
            </div>

            <div className="tasks-container">
              {(tasks || []).map((task) => (
                <div
                  key={task.id}
                  className={`workspace-task-row ${task.completed ? 'is-completed' : ''}`}
                  onClick={() => handleTaskClick(task.id)}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => e.key === 'Enter' && handleTaskClick(task.id)}
                >
                  <div className="task-left">
                    <span className={`task-checkbox ${task.completed ? 'checked' : ''}`}>
                      {task.completed ? '✓' : ''}
                    </span>
                    <span className="task-title-text">{task.title}</span>
                  </div>
                  <span className="task-badge">{task.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Screen Pane */}
        <div className={`phone-tab-pane ${activeTab === 'calendar' ? 'is-active' : ''}`}>
          <div className="phone-screen-content calendar-screen">
            <div className="screen-header">
              <h4>CALENDAR VIEW</h4>
              <p>Organize by date & milestone.</p>
            </div>

            <div className="mini-calendar-grid">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i} className="cal-day-header">
                  {d}
                </span>
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <span key={i} className={`cal-cell ${i === 13 ? 'has-event' : ''} ${i === 20 ? 'is-active' : ''}`}>
                  {i + 1}
                </span>
              ))}
            </div>
            <p className="cal-footer-note">◆ 4 upcoming deadlines in sync</p>
          </div>
        </div>
      </div>
    </div>
  );
}
