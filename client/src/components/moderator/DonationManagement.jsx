import React from 'react';

const DonationManagement = () => {
  return (
    <div>
      <h2>Donation Management</h2>
      <p>Here you can approve, reject, or manage donations made by users.</p>
      {/* List of donations would be dynamically fetched from backend */}
      <ul>
        <li>Donation 1 - Pending</li>
        <li>Donation 2 - Approved</li>
      </ul>
    </div>
  );
};

export default DonationManagement;
