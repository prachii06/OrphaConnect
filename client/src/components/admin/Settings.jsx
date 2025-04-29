import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Settings = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchImages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orphanagePhotos"));
      const imagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(imagesData);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to load images. Please refresh the page.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    if (!file.type.match("image.*")) {
      setError("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError("");
    setMessage("");
    setUploadProgress(0);

    try {
      const base64Image = await convertToBase64(file);

      await addDoc(collection(db, "orphanagePhotos"), {
        imageBase64: base64Image,
        filename: file.name,
        size: file.size,
        type: file.type,
        createdAt: new Date(),
      });

      setMessage("Image uploaded successfully!");
      setFile(null);
      fetchImages();
    } catch (err) {
      console.error("Base64 upload error:", err);
      setError("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteDoc(doc(db, "orphanagePhotos", id));
      setMessage("Image deleted successfully!");
      fetchImages();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete image.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Orphanage Photo Settings (Base64)
      </h1>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}

      {/* Upload Section */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setError("");
            }}
            className="flex-1 p-2 border border-gray-300 rounded-md"
            disabled={isUploading}
          />
          <button
            onClick={handleUpload}
            disabled={isUploading || !file}
            className={`px-6 py-2 rounded-md font-medium ${
              isUploading || !file
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {file && (
          <div className="mt-4 p-3 bg-white border border-gray-200 rounded-md">
            <h3 className="font-medium text-gray-700">Selected File:</h3>
            <p className="text-sm">Name: {file.name}</p>
            <p className="text-sm">Size: {(file.size / 1024).toFixed(1)} KB</p>
            <p className="text-sm">Type: {file.type}</p>
          </div>
        )}
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} className="relative group">
              <img
                src={img.imageBase64}
                alt="Orphanage"
                className="w-full h-48 object-cover rounded-lg shadow-sm"
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            {isUploading ? "Uploading your first image..." : "No images uploaded yet"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
