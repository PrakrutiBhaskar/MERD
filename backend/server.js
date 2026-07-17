const express = require('express');
const cors = require('cors');
const CryptoJS = require('crypto-js');

const app = express();
app.use(cors());
app.use(express.json());

const ENCRYPTION_KEY = "merd-secret-key-123";

// In-memory mock database for pharmacies
const pharmacies = [
  { id: 1, name: "Central Pharmacy", lat: 37.7749, lng: -122.4194, inventory: ["Epinephrine", "Insulin"] },
  { id: 2, name: "North Clinic", lat: 37.7849, lng: -122.4294, inventory: ["Epinephrine"] }
];

// To simulate drone deployment state
let activeDroneMission = null;
let latestAlert = null;

// Endpoint for receiving SMS/Doctor request
app.post('/api/incoming-request', (req, res) => {
  const { encryptedPayload } = req.body;
  if (!encryptedPayload) return res.status(400).json({ error: "Missing payload" });

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPayload, ENCRYPTION_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
    console.log("Decrypted incoming request:", decryptedData);
    
    // Find nearest pharmacy with requested medicine
    const { medicine, lat, lng } = decryptedData;
    
    const availablePharmacies = pharmacies.filter(p => p.inventory.includes(medicine));
    
    if (availablePharmacies.length === 0) {
      return res.status(404).json({ error: "Medicine not found in any nearby pharmacy" });
    }
    
    // Simplistic distance check (just take the first one for this mock)
    const selectedPharmacy = availablePharmacies[0];
    
    // Create an alert for the pharmacist dashboard
    latestAlert = {
      id: Date.now(),
      medicine,
      targetLat: lat,
      targetLng: lng,
      pharmacy: selectedPharmacy.name,
      status: "pending_dispatch"
    };
    
    res.json({ message: "Request received and routed to " + selectedPharmacy.name, alertId: latestAlert.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to decrypt or process request" });
  }
});

// Endpoint for pharmacist dashboard to poll alerts
app.get('/api/alerts', (req, res) => {
  res.json({ alert: latestAlert || null });
});

// Endpoint for pharmacist dashboard to trigger drone
app.post('/api/dispatch', (req, res) => {
  const { alertId } = req.body;
  
  if (!latestAlert || latestAlert.id !== alertId) {
    return res.status(400).json({ error: "Invalid alert ID" });
  }
  
  latestAlert.status = "dispatched";
  
  activeDroneMission = {
    targetLat: latestAlert.targetLat,
    targetLng: latestAlert.targetLng,
    status: "flying"
  };
  
  res.json({ message: "Drone dispatched!", mission: activeDroneMission });
});

// Endpoint for drone sim to fetch mission
app.get('/api/drone/mission', (req, res) => {
  res.json({ mission: activeDroneMission });
});

// Endpoint for drone sim to update status
app.post('/api/drone/update', (req, res) => {
  const { status } = req.body;
  if (activeDroneMission) {
    activeDroneMission.status = status;
  }
  if (latestAlert && status === 'returning') {
      latestAlert.status = "completed";
  }
  console.log(`[DRONE STATUS]: ${status}`);
  res.json({ message: "Status updated" });
});

// Endpoint for Doctor to verify drop
app.post('/api/drone/verify', (req, res) => {
  const { code } = req.body;
  if (code === "1234" && activeDroneMission) {
    activeDroneMission.status = "verified_dropping";
    res.json({ message: "Code verified. Medicine is being dropped." });
  } else {
    res.status(400).json({ error: "Invalid code or no active mission" });
  }
});

// Get drone status for dashboard
app.get('/api/drone/status', (req, res) => {
  res.json({ mission: activeDroneMission });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MERD Central Backend running on port ${PORT}`);
});
