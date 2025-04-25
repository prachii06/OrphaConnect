import React from 'react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'Annual Cultural Evening',
      description: 'An evening of dance, music, and performances by children from our homes.',
      date: '2025-05-15',
      time: '6:00 PM - 9:00 PM',
      location: 'Town Hall, Surat',
      registerLink: '#',
    },
    {
      id: 2,
      title: 'Summer Donation Drive',
      description: 'We’re collecting clothes, toys, and books for children this summer.',
      date: '2025-05-20',
      time: '10:00 AM - 4:00 PM',
      location: 'Hope Foundation Campus, Ahmedabad',
      registerLink: '#',
    },
    {
      id: 3,
      title: 'Volunteer Orientation Program',
      description: 'Interested in volunteering? Join our session to get started.',
      date: '2025-05-25',
      time: '11:00 AM - 1:00 PM',
      location: 'Online (Google Meet)',
      registerLink: '#',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Join Our Upcoming Public Events</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-800">{event.title}</h3>
            <p className="text-gray-700 mt-2">{event.description}</p>
            <p className="text-sm text-gray-500 mt-3">
              <strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}
            </p>
            <p className="text-sm text-gray-600"><strong>Location:</strong> {event.location}</p>
            <a
              href={event.registerLink}
              className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Register / Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
