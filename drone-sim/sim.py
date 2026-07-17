import time
import requests
import json
import math

BACKEND_URL = "http://localhost:3000/api"

def update_status(status):
    print(f"Status Update: {status}")
    try:
        requests.post(f"{BACKEND_URL}/drone/update", json={"status": status})
    except Exception as e:
        print("Failed to update status:", e)

def calculate_distance(lat1, lon1, lat2, lon2):
    # simplistic distance estimation for simulation purposes
    return math.sqrt((lat2-lat1)**2 + (lon2-lon1)**2) * 111000  # in meters approx

def simulate_flight(target_lat, target_lng):
    # Starting coordinates (mock pharmacy)
    current_lat = 37.7749
    current_lng = -122.4194
    
    update_status("taking_off")
    time.sleep(2)
    
    update_status("flying_to_target")
    # Simulate flight time
    for i in range(5):
        print(f"Flying... {i+1}/5")
        time.sleep(1)
        
    update_status("arrived_waiting_for_auth")
    
    print("Arrived at target. Hovering and waiting for doctor to authenticate (Code 1234).")
    
    # Wait for backend to update status to 'verified_dropping'
    auth_verified = False
    while not auth_verified:
        try:
            res = requests.get(f"{BACKEND_URL}/drone/mission")
            data = res.json()
            if data and data.get("mission") and data["mission"].get("status") == "verified_dropping":
                auth_verified = True
                break
        except Exception as e:
            pass
        time.sleep(2)
        print("Still waiting for auth...")
        
    update_status("dropping_medicine")
    print("Initiating drop sequence. Sensor checks passed.")
    time.sleep(3)
    
    update_status("returning")
    print("Return to Launch (RTL) initiated.")
    
    for i in range(5):
        print(f"Returning... {i+1}/5")
        time.sleep(1)
        
    update_status("landed_and_ready")
    print("Drone has landed back at the pharmacy.")

def main():
    print("MERD Drone Simulation Started.")
    while True:
        try:
            res = requests.get(f"{BACKEND_URL}/drone/mission")
            data = res.json()
            mission = data.get("mission")
            
            if mission and mission.get("status") == "flying":
                print(f"New mission received! Target: {mission['targetLat']}, {mission['targetLng']}")
                simulate_flight(mission['targetLat'], mission['targetLng'])
        except Exception as e:
            pass
            
        time.sleep(3)

if __name__ == "__main__":
    main()
