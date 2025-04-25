import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const VolunteerRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Store the volunteer data in Firebase Firestore
      const docRef = await addDoc(collection(db, "volunteers"), formData);
      console.log("Volunteer registered with ID: ", docRef.id);
      setSubmitted(true); // Show success message
      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        skills: "",
        availability: "",
      });
    } catch (error) {
      console.error("Error registering volunteer: ", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Volunteer Registration</h2>
      {submitted ? (
        <p className="text-green-600">Thank you for registering! We will get in touch with you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter your skills"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Availability</label>
            <textarea
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="Enter your availability (days/times)"
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>

          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded mt-4">
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default VolunteerRegistration;
