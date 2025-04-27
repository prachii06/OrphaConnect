import { useState } from 'react'; // Add this import

export default function GalleryImage({ img }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 aspect-square">
      <img
        src={img.path}
        alt={img.caption}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          loaded ? 'group-hover:scale-105' : 'blur-sm'
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-medium">{img.caption}</p>
          {img.date && <p className="text-gray-200 text-sm">{img.date}</p>}
        </div>
      </div>
    </div>
  );
}