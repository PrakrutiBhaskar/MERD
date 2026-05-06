import React from 'react';

const HistoryScreen = ({ onBack }) => {
  const history = [
    { date: 'TODAY, 14:32', status: 'DELIVERED', meds: 'Atropine, Amiodarone' },
    { date: '12 OCT, 09:15', status: 'CANCELLED', meds: 'Insulin' },
    { date: '11 OCT, 18:40', status: 'DELIVERED', meds: 'Epinephrine' },
  ];

  return (
    <div className="screen history-screen">
      <div className="connectivity-bar">
        LOCAL STORAGE • LAST 10 ENTRIES
      </div>

      <div className="page-header">
        <button className="back-link" onClick={onBack}>← BACK</button>
        <h1>ACTIVITY LOG</h1>
      </div>

      <div className="log-list">
        {history.map((item, i) => (
          <div key={i} className="card log-card">
            <div className="log-head">
              <span className="log-date">{item.date}</span>
              <span className={`badge ${item.status === 'DELIVERED' ? 'badge-success' : 'badge-warning'}`}>
                {item.status}
              </span>
            </div>
            <div className="log-body">
              <h3>{item.meds}</h3>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .back-link {
          background: none;
          border: none;
          color: var(--accent-primary);
          font-weight: 800;
          font-size: 14px;
          margin-bottom: 12px;
          padding: 0;
          cursor: pointer;
        }
        .page-header { margin-bottom: 24px; }
        .log-list { display: flex; flex-direction: column; gap: 12px; }
        .log-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .log-date { font-size: 11px; font-weight: 800; color: var(--text-tertiary); }
        .log-body h3 { font-size: 18px; font-weight: 700; color: var(--text-primary); }
      `}} />
    </div>
  );
};

export default HistoryScreen;
