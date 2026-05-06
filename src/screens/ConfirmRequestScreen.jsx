import React, { useState, useEffect } from 'react';

const ConfirmRequestScreen = ({ onConfirm, onEdit }) => {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft <= 0) {
      onConfirm();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="screen confirm-screen">
      <div className="connectivity-bar">
        STATUS: PREPARING PACKET
      </div>

      <div className="page-header">
        <h1>CONFIRM REQUEST</h1>
      </div>

      <div className="card location-card">
        <label className="section-label">DESTINATION</label>
        <div className="loc-display">
          <h3>Near Ballari Civil Hospital</h3>
          <p>15.1394° N, 76.9214° E</p>
        </div>
      </div>

      <div className="card summary-card">
        <label className="section-label">MEDICINES</label>
        <div className="summary-list">
          <div className="summary-item">
            <span>ATROPINE</span>
            <span className="qty">2x</span>
          </div>
          <div className="summary-item">
            <span>AMIODARONE</span>
            <span className="qty">1x</span>
          </div>
        </div>
      </div>

      <div className="auto-confirm-bar">
        <div className="progress-bg">
          <div className="progress-fill" style={{ width: `${(timeLeft/5)*100}%` }}></div>
        </div>
        <p>Auto-confirming in <span>{timeLeft}s</span></p>
      </div>

      <div className="sticky-bottom actions">
        <div className="action-row">
          <button className="secondary-button" onClick={onEdit}>EDIT</button>
          <button className="primary-button" onClick={onConfirm}>CONFIRM NOW</button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .page-header { margin: 20px 0; }
        .location-card, .summary-card { padding: 20px; }
        .section-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: var(--text-tertiary);
          margin-bottom: 12px;
          letter-spacing: 1.5px;
        }
        .loc-display h3 { font-size: 20px; margin-bottom: 4px; }
        .loc-display p { color: var(--accent-primary); font-family: monospace; font-weight: 700; }
        
        .summary-list { display: flex; flex-direction: column; gap: 12px; }
        .summary-item {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 700;
        }
        .summary-item .qty { color: var(--text-secondary); }

        .auto-confirm-bar {
          margin-top: auto;
          text-align: center;
          margin-bottom: 100px;
        }
        .progress-bg {
          height: 6px;
          background: var(--bg-secondary);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .progress-fill {
          height: 100%;
          background: var(--status-warning);
          transition: width 1s linear;
        }
        .auto-confirm-bar p { font-weight: 700; color: var(--text-secondary); }
        .auto-confirm-bar span { color: var(--text-primary); font-size: 20px; margin-left: 4px; }

        .action-row { display: grid; grid-template-columns: 1fr 2fr; gap: 12px; }
      `}} />
    </div>
  );
};

export default ConfirmRequestScreen;
