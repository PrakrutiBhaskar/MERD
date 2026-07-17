# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"

# Start Pharmacist Dashboard
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd pharmacist-dashboard; npm run dev"

# Start Drone Sim
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd drone-sim; .\venv\Scripts\python.exe sim.py"

# Start Requester App
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd requester-app; npx expo start"

Write-Host "All MERD components have been launched in separate windows!" -ForegroundColor Green
