import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { id } from "../assets/id";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SERVICE_ID = id.service_id;
const TEMPLATE_YES_ID = id.template_id;
const TEMPLATE_NO_ID = id.template_noid;
const PUBLIC_KEY = id.public_key;

const RequestHistory = () => {
  const [donorData, setDonorData] = useState([]);
  const [clickedStates, setClickedStates] = useState({});
  const [showTextarea, setShowTextarea] = useState({});
  const [noMessages, setNoMessages] = useState({});

  const loggedEmail = localStorage.getItem("userEmail");

  // Load clicked states per user
  useEffect(() => {
    if (loggedEmail) {
      const storedClicks =
        JSON.parse(localStorage.getItem(`clickedStates_${loggedEmail}`)) || {};
      setClickedStates(storedClicks);
    }
  }, [loggedEmail]);

  // Fetch donor data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !loggedEmail) {
      toast.error("Please login first");
      return;
    }

    const fetchRequestor = async () => {
      try {
        const encodedEmail = encodeURIComponent(loggedEmail);
        const response = await fetch(
          `https://national-blood-donation-management-system-y10q.onrender.com/getRequestor?requestorEmail=${encodedEmail}`
        );

        const data = await response.json();
        if (!data.data || data.data.length === 0) {
          toast.error("You don’t have any donors");
        } else {
          setDonorData(data.data);
        }
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchRequestor();
  }, [loggedEmail]);

  const updateClickedStates = (email) => {
    const updatedStates = { ...clickedStates, [email]: true };
    setClickedStates(updatedStates);
    if (loggedEmail) {
      localStorage.setItem(
        `clickedStates_${loggedEmail}`,
        JSON.stringify(updatedStates)
      );
    }
  };

  const sendEmail = (templateId, toName, toEmail, message) => {
    const templateParams = {
      to_name: toName,
      to_email: toEmail,
      message: message,
      from_email: loggedEmail,
      website_link: "https://bloodconnect.in",
      company_phone: "+91 8317547212",
      company_email: "support@bloodconnect.in",
      user_unsubscribe: "https://bloodconnect.in/unsubscribe",
    };

    return emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
  };

  const handleYesClick = async (donor) => {
    try {
      await sendEmail(
        TEMPLATE_YES_ID,
        donor.name,
        donor.email,
        `Hi ${donor.name},\n\nThank you so much for your blood donation. You're a lifesaver! ❤️\n\nFrom, ${loggedEmail}`
      );
      await axios.put(
        "https://national-blood-donation-management-system-y10q.onrender.com/updatedate",
        {
          email: donor.email,
          lblooddonate: new Date().toISOString().split("T")[0], 
          totalDonations : donor.totalDonations,
        }
      );

      toast.success("✅ Thank you email sent!");
      updateClickedStates(donor.email);
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("❌ Failed to send email. Please try again later.");
    }
  };

  const handleNoClick = (email) => {
    setShowTextarea((prev) => ({ ...prev, [email]: true }));
  };

  const handleTextareaChange = (email, value) => {
    setNoMessages((prev) => ({ ...prev, [email]: value }));
  };

  const handleNoSubmit = async (donor) => {
    try {
      await sendEmail(
        TEMPLATE_NO_ID,
        donor.name,
        donor.email,
        `Hi ${donor.name},\n\nRegarding your recent blood donation request:\n${
          noMessages[donor.email]
        }\n\nThank you for being there!\n- ${loggedEmail}`
      );
      await axios.put(
        "https://national-blood-donation-management-system-y10q.onrender.com/updateSocialize",
        {
          email: donor.email,
          socialize: "yes",
        }
      );
      alert("✅ Feedback email sent!");
      updateClickedStates(donor.email);
    } catch (error) {
      console.error("Error sending feedback:", error);
      alert("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer/>
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        🩸 Request History
      </h2>

      {donorData.length === 0 ? (
        <p className="text-center text-gray-500">No donor records found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donorData.map((donor, index) => (
            <div
              key={donor.email}
              className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:scale-105 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {donor.name}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {donor.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {donor.phoneno}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Weight:</strong> {donor.weight} kg
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Height:</strong> {donor.height} cm
                </p>
                <p className="text-sm text-gray-600 mt-2 italic font-semibold">
                  &quot;{donor.message}&quot;
                </p>
              </div>

              <div className="pt-6">
                <h1 className="text-lg font-semibold text-gray-800 mb-4">
                  🩸 Did the donor actually donate blood to you?
                </h1>

                <div className="flex flex-wrap gap-4 mb-4">
                  <button
                    onClick={() => handleYesClick(donor)}
                    disabled={clickedStates[donor.email]}
                    className={`flex-1 ${
                      clickedStates[donor.email]
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white font-medium px-4 py-2 rounded-xl`}
                  >
                    ✅ Yes
                  </button>
                  <button
                    onClick={() => handleNoClick(donor.email)}
                    disabled={clickedStates[donor.email]}
                    className={`flex-1 ${
                      clickedStates[donor.email]
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white font-medium px-4 py-2 rounded-xl`}
                  >
                    ❌ No
                  </button>
                </div>

                {showTextarea[donor.email] && (
                  <div className="space-y-3">
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 resize-none"
                      rows={4}
                      placeholder="Please provide a reason..."
                      value={noMessages[donor.email] || ""}
                      onChange={(e) =>
                        handleTextareaChange(donor.email, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleNoSubmit(donor)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl w-full"
                    >
                      📤 Submit Feedback
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestHistory;
