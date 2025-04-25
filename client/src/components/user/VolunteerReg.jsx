import React, { useState } from 'react';

const VolunteerReg = () => {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    availability: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Volunteer Registration Submitted!');
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Volunteer Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Your Skills"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Availability (e.g. Weekends)"
          value={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VolunteerReg;
