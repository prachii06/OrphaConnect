import React, { useState } from 'react';

const Support = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Later: send formData to backend
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Support / Contact Us</h2>
      {submitted ? (
        <p className="text-green-600">Thanks for reaching out! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 border rounded"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Send</button>
        </form>
      )}
    </div>
  );
};

export default Support;
