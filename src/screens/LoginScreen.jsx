import React, { useState, useEffect } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [phone] = useState('+91 98765 43210');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpInput = (index, val) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    // Auto-focus next
    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="screen login-screen">
      <div className="login-header">
        <div className="merd-logo">✳️</div>
        <h1>MERD</h1>
        <p>Emergency Medicine Dispatch</p>
      </div>

      <div className="login-body">
        <div className="input-group">
          <label>Phone Number</label>
          <input type="text" className="input-field" value={phone} readOnly />
          <button className="primary-button" style={{ marginTop: '12px' }}>SEND OTP</button>
        </div>

        <div className="otp-group">
          <div className="otp-label-row">
            <label>6-Digit OTP</label>
            <span className="resend-text">{timer > 0 ? `Resend in ${timer}s` : 'Resend Now'}</span>
          </div>
          <div className="otp-inputs">
            {otp.map((d, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="number"
                className="otp-input"
                value={d}
                onChange={(e) => handleOtpInput(i, e.target.value)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="sticky-bottom">
        <button className="primary-button" onClick={onLogin}>LOG IN</button>
        <p className="help-text">Having trouble? Call dispatch: <span>1800-123-4567</span></p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .login-header {
          text-align: center;
          margin: 40px 0 60px;
        }
        .merd-logo {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .login-header h1 {
          font-size: 32px;
          letter-spacing: 2px;
        }
        .login-header p {
          color: var(--text-secondary);
          font-weight: 600;
        }
        .input-group label, .otp-group label {
          display: block;
          font-size: 12px;
          font-weight: 800;
          color: var(--text-tertiary);
          text-transform: uppercase;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }
        .otp-group { margin-top: 40px; }
        .otp-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .resend-text {
          font-size: 12px;
          font-weight: 700;
          color: var(--status-warning);
        }
        .otp-inputs {
          display: flex;
          gap: 6px;
          width: 100%;
        }
        .otp-input {
          flex: 1;
          min-width: 0; /* Allows inputs to shrink below default size */
          height: 64px;
          background: var(--bg-secondary);
          border: 2px solid var(--divider);
          border-radius: 8px;
          text-align: center;
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          -moz-appearance: textfield;
        }
        .otp-input::-webkit-outer-spin-button,
        .otp-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .otp-input:focus {
          border-color: var(--accent-primary);
        }
        .help-text {
          text-align: center;
          margin-top: 24px;
          font-size: 12px;
          color: var(--text-tertiary);
        }
        .help-text span {
          color: var(--text-primary);
          font-weight: 800;
        }
      `}} />
    </div>
  );
};

export default LoginScreen;
