import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [canEditSocialize, setCanEditSocialize] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    const loggedEmail = localStorage.getItem("userEmail");
    if (!loggedEmail) {
      setError("Email not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const url = `https://national-blood-donation-management-system-y10q.onrender.com/getdetails?email=${encodeURIComponent(
          loggedEmail
        )}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch profile data");
        }

        const data = await response.json();

        if (data.data.email !== loggedEmail) {
          setError("You haven't filled the application. Please fill it.");
          setProfileData(null);
        } else {
          setProfileData(data.data);
          setEditableData(data.data);
          updateLBloodDate(data.data.lblooddonate);
        }
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const updateLBloodDate = (lblooddonate) => {
    const lastDonationDate = new Date(lblooddonate);
    const currentDate = new Date();
    const diffInDays = Math.floor(
      (currentDate - lastDonationDate) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays >= 90) {
      setCanEditSocialize(true);
    } else {
      setCanEditSocialize(false);
      setEditableData((prev) => ({ ...prev, socialize: "No" }));
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditableData(profileData);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...editableData, [name]: value };
    setEditableData(updatedData);

    if (name === "lblooddonate") {
      updateLBloodDate(value);
    }
  };

  const handleSave = async () => {
    if (!token) {
      setError("You must be logged in to update your profile.");
      return;
    }

    try {
      const response = await fetch(
        "https://national-blood-donation-management-system-y10q.onrender.com/updateprofile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editableData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile data");
      }

      const updatedData = await response.json();
      setProfileData(updatedData.data);
      setIsEditing(false);
      setError(null);
      updateLBloodDate(updatedData.data.lblooddonate);
    } catch (err) {
      console.error("Error updating profile:", err.message);
      setError(err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mb-10">
        <div className="max-w-2xl w-full bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
          {loading && (
            <p className="text-gray-500 text-center text-lg">Loading profile...</p>
          )}
          {error && (
            <p className="text-red-500 text-center text-lg font-semibold">{error}</p>
          )}

          {!token ? (
            <p className="text-center text-gray-700 font-medium text-lg">
              Please login first.
            </p>
          ) : profileData ? (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {isEditing ? "Edit Profile" : "Profile"}
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {[ 
                  { label: "Name", key: "name", type: "text" },
                  { label: "Email", key: "email", type: "email", disabled: true },
                  { label: "Phone", key: "phoneno", type: "text" },
                  { label: "Date of Birth", key: "dob", type: "text" },
                  { label: "Gender", key: "gender", type: "select", options: ["Male", "Female", "Transgender"] },
                  { label: "Last Blood Donation", key: "lblooddonate", type: "text" },
                  { label: "Platelets Donation", key: "platelets", type: "select", options: ["Yes", "No"] },
                  { label: "Socialize", key: "socialize", type: "select", options: ["Yes", "No"] },
                  { label: "Blood Group", key: "bloodgroup", type: "select", options: ["A Positive", "A Negative", "B Positive", "B Negative", "AB Positive", "AB Negative", "O Positive", "O Negative"] },
                  { label: "Address", key: "address", type: "text" },
                  { label: "City", key: "city", type: "text" },
                  { label: "State", key: "state", type: "text" },
                  { label: "Pincode", key: "pincode", type: "text" },
                ].map(({ label, key, type, options, disabled }) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-gray-700 font-medium text-base mb-1">{label}:</label>
                    {isEditing ? (
                      type === "select" ? (
                        <select
                          name={key}
                          value={editableData[key] || "Select"}
                          onChange={handleChange}
                          disabled={key === "socialize" && !canEditSocialize}
                          className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                            key === "socialize" && !canEditSocialize ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        >
                          {options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={type}
                          name={key}
                          value={editableData[key] || ""}
                          onChange={handleChange}
                          disabled={disabled}
                          className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                            disabled ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        />
                      )
                    ) : (
                      <p className="text-gray-800 text-base font-semibold bg-gray-50 p-2 rounded-md border border-gray-200">
                        {profileData[key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
                  >
                    Edit
                  </button>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Profile;