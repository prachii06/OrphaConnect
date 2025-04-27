import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/gallery-data.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load images');
        return response.json();
      })
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-500 mb-4">Error: {error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-300">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          <Link to="/" className="mr-4 text-blue-500 hover:text-blue-700">
            ← Back to Home
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Photo Gallery</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {images.length === 0 ? (
          <p className="text-center py-12 text-gray-500">No photos available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <div 
                key={index} 
                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={img.path}
                  alt={img.caption}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <p className="text-white font-medium">{img.caption}</p>
                    {img.date && (
                      <p className="text-gray-200 text-sm">{img.date}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Gallery;

