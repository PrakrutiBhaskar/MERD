import React, { useState } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const EmergencyScreen = ({ onDispatch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showMap, setShowMap] = useState(false);
  const [pinPos, setPinPos] = useState({ lat: 15.1394, lng: 76.9214 });
  const [selectedMeds, setSelectedMeds] = useState([
    { id: 1, name: 'ADRENALINE', dose: '1mg', count: 0, checked: false },
    { id: 2, name: 'ATROPINE', dose: '0.6mg', count: 0, checked: false },
    { id: 3, name: 'AMIODARONE', dose: '150mg', count: 0, checked: false },
    { id: 4, name: 'INSULIN', dose: '10 Units', count: 0, checked: false },
  ]);

  const categories = ['All', 'Cardiac', 'Trauma', 'Poison', 'Paeds'];

  const toggleMed = (id) => {
    setSelectedMeds(meds => meds.map(med => 
      med.id === id ? { ...med, checked: !med.checked, count: !med.checked ? 1 : 0 } : med
    ));
  };

  const updateCount = (id, delta) => {
    setSelectedMeds(meds => meds.map(med => 
      med.id === id ? { ...med, count: Math.max(1, med.count + delta) } : med
    ));
  };

  const handleMapClick = (e) => {
    if (e.detail.latLng) {
      setPinPos(e.detail.latLng);
    }
  };

  const filteredMeds = selectedMeds.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const hasSelection = selectedMeds.some(m => m.checked);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="screen emergency-screen">
      <div className="connectivity-bar">
        CONNECTED • LAST SYNCED: 2 MIN AGO
      </div>

      <div className="location-section">
        <div className="loc-main">
          <span className="pin">📍</span>
          <div className="loc-details">
            <h2>Ballari, Karnataka</h2>
            <span className="badge badge-success">High Accuracy ✓</span>
          </div>
        </div>
        <button className="secondary-button pin-btn" onClick={() => setShowMap(true)}>MAP PIN</button>
      </div>

      {showMap && (
        <div className="map-modal">
          <div className="map-content glass">
            <div className="map-mockup">
              {apiKey && apiKey !== 'YOUR_API_KEY_HERE' ? (
                <Map
                  defaultCenter={pinPos}
                  defaultZoom={15}
                  mapId="bf50a9134251540d"
                  onClick={handleMapClick}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                  colorScheme='DARK'
                >
                  <AdvancedMarker position={pinPos}>
                    <Pin background={'#D85A30'} glyphColor={'#FFF'} borderColor={'#FFF'} />
                  </AdvancedMarker>
                </Map>
              ) : (
                <div className="map-fallback" onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const lat = 15.1394 + (0.5 - (e.clientY - rect.top) / rect.height) * 0.01;
                  const lng = 76.9214 + ((e.clientX - rect.left) / rect.width - 0.5) * 0.01;
                  setPinPos({ lat, lng });
                }}>
                  <div className="map-grid"></div>
                  <div className="pulsing-pin" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="pin-head"></div>
                    <div className="pin-pulse"></div>
                  </div>
                  <div className="api-notice">API KEY REQUIRED FOR LIVE MAP</div>
                </div>
              )}
              <div className="map-label">{pinPos.lat.toFixed(4)}° N, {pinPos.lng.toFixed(4)}° E</div>
            </div>
            <div className="map-actions">
              <p>Tap map to refine dispatch destination</p>
              <button className="primary-button" onClick={() => setShowMap(false)}>CONFIRM LOCATION</button>
            </div>
          </div>
        </div>
      )}

      <div className="search-box">
        <input 
          type="text" 
          className="input-field search-input" 
          placeholder="SEARCH MEDICINE..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>}
      </div>

      <div className="category-scroll">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="med-scroll-area">
        <label className="section-label">SELECT MEDICINES</label>
        {filteredMeds.map(med => (
          <div key={med.id} className={`med-row ${med.checked ? 'active' : ''}`} onClick={() => toggleMed(med.id)}>
            <div className="med-info-box">
              <div className="med-checkbox">
                {med.checked && <div className="check-inner"></div>}
              </div>
              <div className="med-text">
                <span className="med-name">{med.name}</span>
                <span className="med-dose">{med.dose}</span>
              </div>
            </div>
            
            {med.checked && (
              <div className="qty-controls" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => updateCount(med.id, -1)}>−</button>
                <span>{med.count}</span>
                <button onClick={() => updateCount(med.id, 1)}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sticky-bottom dispatch-area">
        <button 
          className="primary-button dispatch-btn" 
          disabled={!hasSelection}
          onClick={onDispatch}
        >
          🚨 DISPATCH REQUEST 🚨
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .emergency-screen { padding-top: 0; padding-bottom: 90px; }
        .location-section {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .loc-main { display: flex; gap: 12px; align-items: center; }
        .loc-details h2 { font-size: 18px; }
        .pin-btn { width: auto; padding: 0 16px; font-size: 12px; height: 40px; }

        .search-box {
          margin-top: 16px;
          position: relative;
        }
        .search-input {
          padding-right: 48px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .clear-search {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--bg-tertiary);
          border: none;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .map-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.85);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .map-content {
          width: 100%;
          max-width: 400px;
          border-radius: 24px;
          overflow: hidden;
          padding: 12px;
        }
        .map-mockup {
          height: 300px;
          background: #12181F;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .map-grid {
          position: absolute;
          width: 200%;
          height: 200%;
          background-image: 
            linear-gradient(rgba(216, 90, 48, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(216, 90, 48, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          transform: rotate(15deg);
        }
        .pulsing-pin {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .pin-head {
          width: 20px;
          height: 20px;
          background: var(--accent-primary);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
        }
        .pin-pulse {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid var(--accent-primary);
          border-radius: 50%;
          animation: map-pin-pulse 2s infinite;
        }
        @keyframes map-pin-pulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .map-label {
          position: absolute;
          bottom: 20px;
          background: rgba(0,0,0,0.7);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-family: monospace;
          color: var(--accent-primary);
          font-weight: 700;
          z-index: 20;
        }
        .api-notice {
          position: absolute;
          top: 20px;
          background: var(--status-error);
          color: white;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          z-index: 20;
        }
        .map-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: crosshair;
        }
        .map-actions {
          padding: 20px 8px 8px;
          text-align: center;
        }
        .map-actions p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 20px;
          font-weight: 600;
        }
        
        .category-scroll {
          display: flex;
          gap: 8px;
          margin: 20px 0;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .cat-pill {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 2px solid var(--divider);
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 14px;
          white-space: nowrap;
        }
        .cat-pill.active {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .section-label {
          display: block;
          font-size: 12px;
          font-weight: 800;
          color: var(--text-tertiary);
          margin-bottom: 12px;
          letter-spacing: 1px;
        }

        .med-scroll-area {
          flex: 1;
          overflow-y: auto;
        }

        .med-row {
          background: var(--bg-secondary);
          border: 2px solid var(--divider);
          border-radius: var(--border-radius-md);
          margin-bottom: 8px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 80px;
        }
        .med-row.active {
          border-color: var(--accent-primary);
          background: rgba(216, 90, 48, 0.05);
        }
        .med-info-box { display: flex; align-items: center; gap: 16px; }
        .med-checkbox {
          width: 28px;
          height: 28px;
          border: 3px solid var(--text-tertiary);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .med-row.active .med-checkbox { border-color: var(--accent-primary); }
        .check-inner {
          width: 16px;
          height: 16px;
          background: var(--accent-primary);
          border-radius: 2px;
        }
        .med-text { display: flex; flex-direction: column; }
        .med-name { font-weight: 800; font-size: 16px; }
        .med-dose { font-size: 12px; color: var(--text-secondary); }

        .qty-controls {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--bg-primary);
          padding: 4px;
          border-radius: 8px;
        }
        .qty-controls button {
          width: 44px;
          height: 44px;
          background: var(--bg-tertiary);
          border: none;
          color: white;
          font-size: 24px;
          font-weight: 700;
          border-radius: 6px;
        }
        .qty-controls span {
          font-size: 20px;
          font-weight: 800;
          min-width: 24px;
          text-align: center;
        }
        
        .dispatch-btn { height: 64px; font-size: 20px; }
      `}} />
    </div>
  );
};

export default EmergencyScreen;
