import React from 'react';

const SuccessScreen = ({ onNewRequest, onViewHistory }) => {
  return (
    <div className="screen success-screen">
      <div className="connectivity-bar">
        STATUS: TRANSACTION SECURED
      </div>

      <div className="success-hero">
        <div className="hero-icon">✅</div>
        <h1>MEDICINE DELIVERED</h1>
      </div>

      <div className="card details-card">
        <label className="section-label">PAYLOAD SUMMARY</label>
        <div className="med-summary">
          <div className="sum-row"><span>ATROPINE</span><span>2x</span></div>
          <div className="sum-row"><span>AMIODARONE</span><span>1x</span></div>
        </div>
        <div className="divider"></div>
        <div className="meta-info">
          <div className="meta-item">
            <label>TIME</label>
            <span>14:32 PM</span>
          </div>
          <div className="meta-item">
            <label>DESTINATION</label>
            <span>Ballari Civil Hospital</span>
          </div>
        </div>
      </div>

      <div className="sticky-bottom actions">
        <button className="primary-button" onClick={onNewRequest}>🚨 NEW EMERGENCY REQUEST</button>
        <button className="secondary-button" style={{ marginTop: '12px' }} onClick={onViewHistory}>VIEW HISTORY</button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .success-hero {
          text-align: center;
          margin: 40px 0;
        }
        .hero-icon { font-size: 64px; margin-bottom: 16px; }
        .success-hero h1 { font-size: 24px; letter-spacing: 1px; }
        
        .med-summary { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        .sum-row { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; }
        
        .divider { height: 1px; background: var(--divider); margin: 20px 0; }
        
        .meta-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .meta-item label { display: block; font-size: 10px; font-weight: 800; color: var(--text-tertiary); margin-bottom: 4px; }
        .meta-item span { font-weight: 700; font-size: 14px; }
      `}} />
    </div>
  );
};

export default SuccessScreen;
