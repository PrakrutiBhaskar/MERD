import React from 'react';

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'emergency', icon: '🚨', label: 'Emergency' },
    { id: 'history', icon: '📋', label: 'History' },
    { id: 'inventory', icon: '📦', label: 'Inventory' },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <div className="bottom-nav glass">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 450px;
          height: 80px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 16px;
          border-top: 1px solid var(--glass-border);
          z-index: 1000;
        }
        .nav-item {
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 8px;
          flex: 1;
        }
        .nav-item.active {
          color: var(--accent-primary);
        }
        .nav-icon {
          font-size: 20px;
        }
        .nav-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}} />
    </div>
  );
};

export default BottomNav;
