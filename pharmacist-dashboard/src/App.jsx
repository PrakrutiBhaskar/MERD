import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const BACKEND_URL = 'http://localhost:3000/api'

function App() {
  const [alert, setAlert] = useState(null)
  const [droneStatus, setDroneStatus] = useState(null)
  
  useEffect(() => {
    const pollAlerts = setInterval(async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/alerts`)
        if (res.data.alert) {
          setAlert(res.data.alert)
        }
      } catch (err) {
        console.error("Failed to fetch alerts", err)
      }
    }, 2000)
    
    return () => clearInterval(pollAlerts)
  }, [])
  
  useEffect(() => {
    const pollDrone = setInterval(async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/drone/status`)
        if (res.data.mission) {
          setDroneStatus(res.data.mission.status)
        }
      } catch (err) {
        console.error("Failed to fetch drone status", err)
      }
    }, 2000)
    
    return () => clearInterval(pollDrone)
  }, [])

  const handleDispatch = async () => {
    if (!alert) return
    try {
      await axios.post(`${BACKEND_URL}/dispatch`, { alertId: alert.id })
      // Alert status will update on next poll
    } catch (err) {
      console.error("Dispatch failed", err)
    }
  }

  return (
    <div className="container">
      <h1>Pharmacist Dashboard - MERD System</h1>
      
      <div className="card">
        <h2>Active Alerts</h2>
        {alert ? (
          <div className={`alert-box ${alert.status}`}>
            <h3>🚨 EMERGENCY DISPATCH REQUIRED 🚨</h3>
            <p><strong>Medicine:</strong> {alert.medicine}</p>
            <p><strong>Target:</strong> {alert.targetLat}, {alert.targetLng}</p>
            <p><strong>Pharmacy Source:</strong> {alert.pharmacy}</p>
            <p><strong>Status:</strong> {alert.status}</p>
            
            {alert.status === 'pending_dispatch' && (
              <button className="dispatch-btn" onClick={handleDispatch}>
                LOAD PAYLOAD & GO
              </button>
            )}
          </div>
        ) : (
          <p>No active emergencies.</p>
        )}
      </div>
      
      <div className="card">
        <h2>Drone Telemetry</h2>
        <div className="telemetry-box">
          <p><strong>Current Status:</strong> {droneStatus || "Idle"}</p>
        </div>
      </div>
    </div>
  )
}

export default App
