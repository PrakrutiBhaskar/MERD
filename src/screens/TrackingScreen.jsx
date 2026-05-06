import React from 'react';

const TrackingScreen = ({ onCancel }) => {
  const steps = [
    { label: 'Request received', status: 'done' },
    { label: 'Pharmacy matched', status: 'done' },
    { label: 'Drone loading', status: 'active' },
    { label: 'Drone dispatched', status: 'pending' },
    { label: 'ETA: 8 mins', status: 'pending' },
    { label: 'Delivered', status: 'pending' },
  ];

  return (
    <div className="screen tracking-screen">
      <div className="connectivity-bar">
        TRACKING • SIGNAL: MODERATE (2G)
      </div>

      <div className="page-header">
        <h1>DISPATCH #2847</h1>
        <p>Supply delivery in progress</p>
      </div>

      <div className="timeline">
        {steps.map((step, i) => (
          <div key={i} className={`timeline-item ${step.status}`}>
            <div className="node">
              {step.status === 'done' && '✓'}
              {step.status === 'active' && <div className="pulse"></div>}
            </div>
            {i < steps.length - 1 && <div className="line"></div>}
            <span className="label">{step.label}</span>
          </div>
        ))}
      </div>

      <div className="card otp-card">
        <label className="section-label">VERIFICATION CODE</label>
        <div className="otp-display">7842</div>
        <p className="otp-hint">Provide this to the operator upon arrival.</p>
      </div>

      <div className="sticky-bottom">
        <button className="secondary-button cancel-btn" onClick={onCancel}>CANCEL REQUEST</button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .page-header h1 { font-size: 20px; }
        .page-header p { color: var(--text-tertiary); font-weight: 700; font-size: 14px; }
        
        .timeline {
          margin: 32px 0;
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
        }
        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          min-height: 56px;
          position: relative;
        }
        .node {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid var(--bg-secondary);
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          z-index: 2;
        }
        .line {
          position: absolute;
          left: 14px;
          top: 32px;
          width: 4px;
          height: calc(100% - 32px);
          background: var(--bg-secondary);
          z-index: 1;
        }
        .timeline-item.done .node { border-color: var(--status-success); color: var(--status-success); }
        .timeline-item.done .line { background: var(--status-success); }
        .timeline-item.active .node { border-color: var(--status-warning); }
        .pulse {
          width: 12px;
          height: 12px;
          background: var(--status-warning);
          border-radius: 50%;
          animation: node-pulse 1.5s infinite;
        }
        @keyframes node-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .timeline-item.pending .label { color: var(--text-tertiary); }
        .label { font-weight: 700; font-size: 18px; margin-top: 4px; }

        .otp-card {
          padding: 32px;
          text-align: center;
          border-color: var(--accent-primary);
          background: rgba(216, 90, 48, 0.1);
        }
        .otp-display {
          font-size: var(--font-size-critical);
          font-weight: 800;
          letter-spacing: 8px;
          margin: 12px 0;
        }
        .otp-hint { font-size: 14px; color: var(--text-secondary); font-weight: 600; }

        .cancel-btn { color: var(--status-error); border-color: rgba(231, 76, 60, 0.3); }
      `}} />
    </div>
  );
};

export default TrackingScreen;
