import React, { useState } from 'react';
import { db } from "../../firebase"; // Import your Firestore instance
import { collection, addDoc } from "firebase/firestore";

const Support = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send form data to Firestore
    try {
      await addDoc(collection(db, 'supportQueries'), {
        name: formData.name,
        message: formData.message,
        timestamp: new Date(), // Add timestamp for sorting purposes
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting query: ", error);
    }
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
            placeholder="Your Message(also mention ur contact info)"
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

