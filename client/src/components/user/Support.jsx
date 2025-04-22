import React, { useState } from 'react';

const Support = () => {
  const [supportType, setSupportType] = useState('');

  const handleSupport = () => {
    // Handle support submission logic (e.g., send to backend)
    alert(`You have offered your support as: ${supportType}`);
  };

  return (
    <div>
      <h2>Offer Your Support</h2>
      <p>Select the type of support you would like to offer:</p>
      <select value={supportType} onChange={(e) => setSupportType(e.target.value)}>
        <option value="">Select Support Type</option>
        <option value="Resources">Resources</option>
        <option value="Time">Time</option>
        <option value="Mentorship">Mentorship</option>
      </select>
      <button onClick={handleSupport}>Submit Support</button>
    </div>
  );
};

export default Support;
