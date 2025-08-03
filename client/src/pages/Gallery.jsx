import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import HomeButton from "../components/HomeButton";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "orphanagePhotos"));
      const imageData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(imageData);
    } catch (err) {
      console.error("Error fetching gallery images:", err);
      setError("Failed to load gallery. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  return (
    <div className="max-w-6xl bg-gray-100 mx-auto p-6">
      <HomeButton />
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Orphanage Photo Gallery
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading images...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : images.length === 0 ? (
        <div className="text-center text-gray-500">No images found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img.id} className="shadow-md rounded-lg overflow-hidden">
              <img
                src={img.imageBase64}
                alt={img.filename || "Uploaded Image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 text-center text-sm text-gray-700">
              {img.filename?.split(".").slice(0, -1).join(".")}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
