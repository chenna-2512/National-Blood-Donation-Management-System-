import { useEffect, useState } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});

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

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditableData(profileData);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!token) {
      setError("You must be logged in to update your profile.");
      return;
    }

    // Ensure you are sending the correct data from editableData
    console.log("Sending data to the backend:", editableData);

    try {
      const response = await fetch("https://national-blood-donation-management-system-y10q.onrender.com/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editableData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile data");
      }

      const updatedData = await response.json();
      console.log("Updated data from backend:", updatedData);
      setProfileData(updatedData.data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error("Error updating profile:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 mb-10">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        {loading && (
          <p className="text-gray-500 text-center">Loading profile...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!token ? (
          <p className="text-center text-gray-700 font-medium">
            Please login first.
          </p>
        ) : profileData ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              {isEditing ? "Edit Profile" : "Profile"}
            </h2>

            <div className="space-y-4">
              {[
                { label: "Name", key: "name", type: "text" },
                { label: "Email", key: "email", type: "email", disabled: true },
                { label: "Phone", key: "phoneno", type: "text" },
                { label: "Date of Birth", key: "dob", type: "text" },
                {
                  label: "Gender",
                  key: "gender",
                  type: "select",
                  options: ["Male", "Female", "Transgender"],
                },
                {
                  label: "Last Blood Donation",
                  key: "lblooddonate",
                  type: "text",
                },
                {
                  label: "Platelets Donation",
                  key: "platelets",
                  type: "select",
                  options: ["Yes", "No"],
                },
                {
                  label: "Socialize",
                  key: "socialize",
                  type: "select",
                  options: ["Yes", "No"],
                },
                {
                  label: "Blood Group",
                  key: "bloodgroup",
                  type: "select",
                  options: [
                    "A Positive",
                    "A Negative",
                    "B Positive",
                    "B Negative",
                    "AB Positive",
                    "AB Negative",
                    "O Positive",
                    "O Negative",
                  ],
                },
                { label: "Address", key: "address", type: "text" },
                { label: "City", key: "city", type: "text" },
                { label: "State", key: "state", type: "text" },
                { label: "Pincode", key: "pincode", type: "text" },
              ].map(({ label, key, type, options, disabled }) => (
                <div key={key} className="flex flex-col">
                  <label className="text-gray-600 text-sm">{label}:</label>
                  {isEditing ? (
                    type === "select" ? (
                      <select
                        name={key}
                        value={editableData[key] || "Select"}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        name={key}
                        value={editableData[key] || ""}
                        onChange={handleChange}
                        disabled={disabled}
                        className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                          disabled ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    )
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {profileData[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Edit
                </button>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
