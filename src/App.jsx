import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import EmergencyScreen from './screens/EmergencyScreen';
import ConfirmRequestScreen from './screens/ConfirmRequestScreen';
import TrackingScreen from './screens/TrackingScreen';
import HistoryScreen from './screens/HistoryScreen';
import SuccessScreen from './screens/SuccessScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const handleLogin = () => setCurrentScreen('emergency');
  const handleDispatchClick = () => setCurrentScreen('confirm');
  const handleConfirmDispatch = () => setCurrentScreen('tracking');
  const handleEditDispatch = () => setCurrentScreen('emergency');
  const handleCancelTracking = () => setCurrentScreen('emergency');
  const handleNewRequest = () => setCurrentScreen('emergency');
  const handleViewHistory = () => setCurrentScreen('history');
  const handleBackFromHistory = () => setCurrentScreen('emergency');

  // Simulation: After 8 seconds of tracking, go to success
  React.useEffect(() => {
    if (currentScreen === 'tracking') {
      const timer = setTimeout(() => {
        setCurrentScreen('success');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'emergency':
        return <EmergencyScreen onDispatch={handleDispatchClick} />;
      case 'confirm':
        return <ConfirmRequestScreen onConfirm={handleConfirmDispatch} onEdit={handleEditDispatch} />;
      case 'tracking':
        return <TrackingScreen onCancel={handleCancelTracking} />;
      case 'history':
        return <HistoryScreen onBack={handleBackFromHistory} />;
      case 'success':
        return <SuccessScreen onNewRequest={handleNewRequest} onViewHistory={handleViewHistory} />;
      default:
        return <EmergencyScreen onDispatch={handleDispatchClick} />;
    }
  };

  return (
    <div className="app-container">
      {renderScreen()}
    </div>
  );
}

export default App;
