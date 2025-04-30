import { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const token = localStorage.getItem("token");
  const loggedEmail = localStorage.getItem("userEmail");

  const [requestData, setRequestData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [shownoData, setNoShowData] = useState(false);
  const [showSocialize, setShowSocialize] = useState(false);
  const [requestorEmail, setRequestorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [hasResponded, setHasResponded] = useState(() => {
    if (!loggedEmail) return false;
    return localStorage.getItem(`hasResponded_${loggedEmail}`) === "true";
  });

  const [submittedMessage, setSubmittedMessage] = useState(() => {
    if (!loggedEmail) return "";
    return localStorage.getItem(`submittedMessage_${loggedEmail}`) || "";
  });

  const [responseGiven, setResponseGiven] = useState(() => {
    if (!loggedEmail) return false;
    return localStorage.getItem(`responseGiven_${loggedEmail}`) === "true";
  });

  const handleChange = () => {
    setShowData(true);
    setNoShowData(false);
    setShowSocialize(true);
    setResponseGiven(true);
    localStorage.setItem(`responseGiven_${loggedEmail}`, "true");
  };

  const handlenoChange = () => {
    setShowData(false);
    setNoShowData(true);
    setShowSocialize(false);
    setResponseGiven(true);
    localStorage.setItem(`responseGiven_${loggedEmail}`, "true");
  };

  useEffect(() => {
    if (!token) {
      alert("Please login first");
      return;
    }

    if (!loggedEmail) {
      alert("Login first");
      return;
    }

    const fetchRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3002/getrequest?donorEmail=${loggedEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch requestors");
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data.data.donorEmail !== loggedEmail) {
          alert("You don't have any requests");
        } else {
          setRequestData([data.data]);
          setRequestorEmail(data.data.email);

          // Reset response state if this is a new request from the same donor
          if (data.data.email !== requestorEmail) {
            setHasResponded(false);
            localStorage.setItem(`hasResponded_${loggedEmail}`, "false");
            setShowData(false);
            setNoShowData(false);
            setShowSocialize(false);
          }
        }
      } catch (error) {
        console.log("Error getting requests:", error.message);
      }
      setLoading(false);
    };

    fetchRequest();
  }, [token, loggedEmail, requestorEmail]); // Add requestorEmail to dependencies

  const handleSubmit = async () => {
    if (!token || !loggedEmail) {
      alert("Please Login First");
      return;
    }

    const socializeValue = showSocialize ? "no" : "yes";

    try {
      await axios.put("http://localhost:3002/updateMessage", {
        email: loggedEmail,
        requestorEmail,
        message,
        socialize: socializeValue,
      });
      alert("Message sent successfully!");

      setHasResponded(true);
      setSubmittedMessage(message);

      localStorage.setItem(`hasResponded_${loggedEmail}`, "true");
      localStorage.setItem(`submittedMessage_${loggedEmail}`, message);
    } catch (error) {
      console.log("Error updating Socialize:", error);
    }
  };

  const followup = () => {
    if (hasResponded) {
      return (
        <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-600 text-green-800 rounded-xl">
          <h3 className="font-bold text-lg mb-2">✅ Message Sent:</h3>
          <p>{submittedMessage}</p>
        </div>
      );
    }

    return (
      <div>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message to the requestor and mention if you were able to contact them or not."
          className="w-full border border-gray-500 rounded-xl px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
        ></textarea>
        <button
          className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-all mt-4 w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 mb-24">
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading your requests...</p>
      ) : requestData.length === 0 ? (
        <p className="text-center text-gray-600 text-lg font-medium">🚫 No requests yet.</p>
      ) : (
        requestData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 m-4 transition-transform transform hover:scale-105 hover:shadow-2xl border border-red-200 max-w-3xl lg:max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-red-600">{item.name}</h1>
                <p className="text-gray-700 mt-2">
                  📧 <span className="font-medium">{item.email}</span>
                </p>
                <p className="text-gray-700 font-semibold mt-2">
                  📢 Please reach out to the requestor before this date: <span>{item.date}</span>
                </p>
                <p className="text-gray-700 mt-2">📍 {item.address}</p>
                <p className="text-gray-700 mt-2">📞 {item.phoneno}</p>
              </div>

              {!hasResponded && !responseGiven && (
                <div className="flex flex-col justify-center gap-4 mt-4 md:mt-0">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition duration-200"
                    onClick={handleChange}
                  >
                    ✅ Yes
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition duration-200"
                    onClick={handlenoChange}
                  >
                    ❌ No
                  </button>
                </div>
              )}
            </div>
            {(showData || shownoData || hasResponded) && followup()}
          </div>
        ))
      )}
    </div>
  );
};

export default History;
