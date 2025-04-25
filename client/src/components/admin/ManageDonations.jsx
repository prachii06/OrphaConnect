import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const ManageDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const donationSnapshot = await getDocs(collection(db, "donations"));
      const donationData = donationSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDonations(donationData);
    };

    fetchDonations();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Donations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-indigo-700 text-white">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone Number</th>
              <th className="py-2 px-4 text-left">Amount (₹)</th>
              <th className="py-2 px-4 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(donation => (
              <tr key={donation.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{donation.name || "N/A"}</td>
                <td className="py-2 px-4">{donation.phone || "N/A"}</td>
                <td className="py-2 px-4">₹{donation.amount || 0}</td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {donation.timestamp?.toDate().toLocaleString() || "N/A"}
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No donations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonations;
