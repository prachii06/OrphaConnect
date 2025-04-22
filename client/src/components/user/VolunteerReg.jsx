import React, { useState } from 'react';

const VolunteerReg = () => {
  const [volunteerInfo, setVolunteerInfo] = useState({
    name: '',
    email: '',
    availability: '',
    expertise: '',
  });

  const handleRegister = () => {
    // Handle registration logic (e.g., send to backend)
    alert(`Thank you for registering as a volunteer, ${volunteerInfo.name}`);
  };

  const handleChange = (e) => {
    setVolunteerInfo({ ...volunteerInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Volunteer Registration</h2>
      <form>
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={volunteerInfo.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" value={volunteerInfo.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Availability: </label>
          <input type="text" name="availability" value={volunteerInfo.availability} onChange={handleChange} required />
        </div>
        <div>
          <label>Expertise: </label>
          <input type="text" name="expertise" value={volunteerInfo.expertise} onChange={handleChange} />
        </div>
        <button type="button" onClick={handleRegister}>Register as Volunteer</button>
      </form>
    </div>
  );
};

export default VolunteerReg;
