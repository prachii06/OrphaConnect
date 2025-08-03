import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="fixed bottom-4 left-4 text-yellow-600 font-medium hover:text-gray-900 underline"
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
      aria-label="Return to Home"
    >
      {'< Return to Home'}
    </button>
  );
};

export default HomeButton;
