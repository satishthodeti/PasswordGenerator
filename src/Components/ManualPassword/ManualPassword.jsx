import React, { useState } from 'react';

const ManulPassword = () => {
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const ManulPassword = () => {
    const length = 12; // Length of the generated password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {
    const basicCriteria = password.length >= 6;
    const strongCriteria = password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+]/.test(password);

    if (strongCriteria) {
      setValidationMessage("Strong Password ✔️");
    } else if (basicCriteria) {
      setValidationMessage("Basic Password (6+ characters) ⚠️");
    } else {
      setValidationMessage("Password must be at least 6 characters long ❌");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    });
  };

  return (
    <div className="password-container">
      <h2>Password Manager</h2>
      <div className="input-group">
        <label htmlFor="manualPassword">Enter Password:</label>
        <input
          type="password"
          id="manualPassword"
          className="password-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
        />
        <button className="generate-button" onClick={ManulPassword}>
          Generate Password
        </button>
      </div>
      <div className="validation">
        <p>{validationMessage}</p>
      </div>
      <button className="copy-button" onClick={handleCopy}>
        Copy
      </button>
    </div>
  );
};

export default ManulPassword;
