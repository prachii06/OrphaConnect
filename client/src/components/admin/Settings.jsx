import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Settings = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const fetchImages = async () => {
    const snapshot = await getDocs(collection(db, "orphanagePhotos"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `orphanage_photos/${uuidv4()}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "orphanagePhotos"), {
      url,
      createdAt: new Date(),
    });

    setMessage("Image uploaded successfully!");
    setFile(null);
    fetchImages();
  };

  const handleDelete = async (id, url) => {
    await deleteDoc(doc(db, "orphanagePhotos", id));

    // Delete from Firebase Storage
    const fileRef = ref(storage, url);
    await deleteObject(fileRef).catch((err) => console.log("Storage deletion skipped", err));

    fetchImages();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Orphanage Photo Management</h2>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <div className="flex items-center space-x-4 mb-6">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.url}
              alt="Orphanage"
              className="w-full h-40 object-cover rounded"
            />
            <button
              onClick={() => handleDelete(img.id, img.url)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;

