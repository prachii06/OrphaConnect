import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Donation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'donations'), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        amount: '',
      });
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Make a Donation</h2>
      {submitted ? (
        <p className="text-green-600">Thank you for your generous donation!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            className="w-full p-2 border rounded"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount to Donate"
            className="w-full p-2 border rounded"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            min="1"
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
            Donate
          </button>
        </form>
      )}
    </div>
  );
};

export default Donation;
