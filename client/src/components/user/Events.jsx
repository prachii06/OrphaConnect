import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) fetchRegistrations(user.uid);
    });

    fetchEvents();
    return () => unsub();
  }, []);

  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, "events"));
    setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const fetchRegistrations = async (userId) => {
    const q = query(
      collection(db, "registrations"),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);
    setRegisteredEvents(snapshot.docs.map((doc) => doc.data().eventId));
  };

  const handleRegister = async (eventId) => {
    if (!user || registeredEvents.includes(eventId)) return;

    await addDoc(collection(db, "registrations"), {
      eventId,
      userId: user.uid,
      registeredAt: new Date(),
    });

    setRegisteredEvents([...registeredEvents, eventId]); // update UI
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Events</h2>
      {events.map((event) => (
        <div
          key={event.id}
          className="mb-4 border p-4 rounded-lg shadow bg-white"
        >
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p>{event.description}</p>
          <p className="text-sm text-gray-600">Date: {event.date}</p>

          <button
            onClick={() => handleRegister(event.id)}
            disabled={registeredEvents.includes(event.id)}
            className={`mt-2 px-4 py-1 rounded ${
              registeredEvents.includes(event.id)
                ? "bg-green-100 text-green-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {registeredEvents.includes(event.id)
              ? "Registered"
              : "Register"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Events;
