import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
  });

  const fetchData = async () => {
    const eventsSnapshot = await getDocs(collection(db, "events"));
    const eventsData = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEvents(eventsData);

    const regSnapshot = await getDocs(collection(db, "registrations"));
    const regData = regSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRegistrations(regData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get registrations per event
  const getRegisteredUsers = (eventId) =>
    registrations.filter((reg) => reg.eventId === eventId);

  // Submit new event
  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date) return;

    await addDoc(collection(db, "events"), {
      ...newEvent,
      createdAt: Timestamp.now(),
    });

    setNewEvent({ title: "", description: "", date: "" });
    setShowForm(false);
    fetchData(); // refresh event list
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Event
          </button>
        )}
      </div>

      {/* Event Form */}
      {showForm && (
        <div className="mb-6 bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Create New Event</h3>
          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddEvent}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Event Cards */}
      {events.map((event) => (
        <div
          key={event.id}
          className="mb-4 border p-4 rounded-lg shadow bg-white"
        >
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <p>{event.description}</p>
          <p className="text-sm text-gray-600 mb-2">Date: {event.date}</p>

          <div className="mt-2">
            <p className="font-medium">
              Registrations: {getRegisteredUsers(event.id).length}
            </p>
            <ul className="ml-4 list-disc text-sm text-gray-700">
              {getRegisteredUsers(event.id).map((reg) => (
                <li key={reg.id}>User ID: {reg.userId}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageEvents;
