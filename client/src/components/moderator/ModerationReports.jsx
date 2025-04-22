import React, { useState, useEffect } from 'react';

const ModerationReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState('');

  // Simulate fetching reports from an API
  useEffect(() => {
    // You can replace this with an actual API call to get reports
    const fetchedReports = [
      { id: 1, title: 'Event Registration Issue', type: 'Event', status: 'Pending' },
      { id: 2, title: 'Donation Not Processed', type: 'Donation', status: 'Resolved' },
      { id: 3, title: 'User Misbehavior', type: 'User', status: 'Pending' },
      { id: 4, title: 'Event Feedback Issue', type: 'Event', status: 'Resolved' },
      { id: 5, title: 'Missing Resource', type: 'Resource', status: 'Pending' },
    ];

    setReports(fetchedReports);
    setFilteredReports(fetchedReports);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);

    // Filter the reports based on the selected filter
    const filtered = reports.filter(report =>
      report.type.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredReports(filtered);
  };

  const handleStatusChange = (id, newStatus) => {
    // Update the status of a report (this would typically be sent to a backend)
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: newStatus } : report
    ));
  };

  return (
    <div>
      <h2>Moderation Reports</h2>
      
      <div>
        <label htmlFor="filter">Filter by Type: </label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter event, donation, user, etc."
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map(report => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.title}</td>
              <td>{report.type}</td>
              <td>{report.status}</td>
              <td>
                {report.status === 'Pending' ? (
                  <>
                    <button onClick={() => handleStatusChange(report.id, 'Resolved')}>Mark as Resolved</button>
                    <button onClick={() => handleStatusChange(report.id, 'Rejected')}>Reject</button>
                  </>
                ) : (
                  <span>Resolved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModerationReports;
