import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  Heart,
  Droplets,
  Shield,
  Award,
  Clock,
  Calendar,
} from "lucide-react";

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

  const calculateAge = (dob) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const calculateNextEligibleDate = (lastDonation) => {
    const lastDate = new Date(lastDonation);
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 56);
    return nextDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBadges = (data) => {
    const badges = [];
    if (profileData.totalDonations >= 10)
      badges.push({ icon: Award, label: "Gold Donor", color: "bg-yellow-500" });
    if (profileData.totalDonations >= 5)
      badges.push({ icon: Heart, label: "Frequent Donor", color: "bg-red-500" });
    if (data.platelets === "Yes")
      badges.push({ icon: Droplets, label: "Platelet Hero", color: "bg-blue-500" });
    badges.push({ icon: Shield, label: "Verified Donor", color: "bg-green-500" });
    return badges;
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
    if (name === "lblooddonate") updateLBloodDate(value);
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

      if (!response.ok) throw new Error("Failed to update profile data");

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 mb-14">
      <ToastContainer />
      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading profile...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg font-semibold">{error}</p>
        ) : profileData ? (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900">Hello, {profileData.name.split(' ')[0]} 👋</h1>
              <p className="text-xl text-gray-600 mt-2">You&apos;re an <span className="text-red-600 font-semibold">{profileData.bloodgroup}</span> Lifesaver 💉</p>
              <p className="text-gray-600 mt-1">Thanks for your last donation on <span className="font-medium">{new Date(profileData.lblooddonate).toLocaleDateString()}</span>. You&apos;ve saved <span className="font-bold text-red-600">{profileData.totalDonations * 3} lives</span> so far!</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center">
              {getBadges(profileData).map((badge, i) => (
                <span key={i} className={`text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold ${badge.color}`}>
                  <badge.icon className="w-4 h-4" />
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <Droplets className="mx-auto text-red-500" />
                <p className="font-bold text-xl">{profileData.totalDonations}</p>
                <p className="text-gray-600 text-sm">Total Donations</p>
              </div>
              <div>
                <Heart className="mx-auto text-green-500" />
                <p className="font-bold text-xl">{profileData.totalDonations * 3}</p>
                <p className="text-gray-600 text-sm">Lives Saved</p>
              </div>
              <div>
                <Clock className="mx-auto text-blue-500" />
                <p className="font-bold text-xl">{Math.floor((new Date() - new Date(profileData.createdAt)) / (1000 * 60 * 60 * 24 * 30))}</p>
                <p className="text-gray-600 text-sm">Months Active</p>
              </div>
              <div>
                <Award className="mx-auto text-purple-500" />
                <p className="font-bold text-xl">{getBadges(profileData).length}</p>
                <p className="text-gray-600 text-sm">Badges Earned</p>
              </div>
            </div>

            {/* Next Eligibility */}
            <div className="bg-red-100 p-4 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Next Donation Eligibility</h3>
                <p className="text-sm text-gray-600">You can donate after <span className="text-red-600 font-medium">{calculateNextEligibleDate(profileData.lblooddonate)}</span></p>
              </div>
              <Calendar className="w-6 h-6 text-red-600" />
            </div>

            {/* Editable Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white shadow-lg p-6 rounded-xl border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Personal Details</h3>
                  {isEditing && <button onClick={handleCancel} className="text-sm text-red-600 hover:underline">Cancel</button>}
                </div>
                {["name","email","phoneno","dob","gender","bloodgroup","socialize","lblooddonate"].map((field, i) => (
                  <div key={i} className="mb-3">
                    <label className="block text-sm text-gray-600 capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}:</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name={field}
                        value={editableData[field] || ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 text-sm"
                        disabled={field === 'email' || 
          (field === 'socialize' && !canEditSocialize)}
                      />
                    ) : (
                      <p className="bg-gray-50 p-2 rounded-md border text-sm">{profileData[field]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-white shadow-lg p-6 rounded-xl border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Location Details</h3>
                </div>
                {["address","city","state","pincode"].map((field, i) => (
                  <div key={i} className="mb-3">
                    <label className="block text-sm text-gray-600 capitalize mb-1">{field}:</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name={field}
                        value={editableData[field] || ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 text-sm"
                      />
                    ) : (
                      <p className="bg-gray-50 p-2 rounded-md border text-sm">{profileData[field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-6">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg mr-4">Save</button>
                  <button onClick={handleCancel} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
                </>
              ) : (
                <button onClick={handleEdit} className="bg-green-600 text-white px-6 py-2 rounded-lg">Edit</button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
