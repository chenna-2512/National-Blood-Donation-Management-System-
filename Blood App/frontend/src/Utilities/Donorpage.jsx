import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Donorpage = () => {
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedEmail = localStorage.getItem("userEmail");

    if (!token || !loggedEmail) {
      setIsAuthenticated(false);
      alert("Please login first");
      return;
    }

    setIsAuthenticated(true);
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://national-blood-donation-management-system-y10q.onrender.com/getalldetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        const donorData = data.data;

        if (donorData) {
          const donorList = Array.isArray(donorData) ? donorData : [donorData];

          const filtered = donorList
            .filter(
              (d) =>
                d.email !== loggedEmail && d.socialize?.toLowerCase() === "yes" // ✅ Only socialize=YES
            )
            .sort((a, b) => {
              const donorTypeOrder = { emergency: 0, normal: 1 };
              const typeA = donorTypeOrder[a.typeofdonar?.toLowerCase()] ?? 2;
              const typeB = donorTypeOrder[b.typeofdonar?.toLowerCase()] ?? 2;
              return typeA - typeB;
            });

          setFilteredDonors(filtered);
        } else {
          setFilteredDonors([]);
        }
      } catch (err) {
        console.log("Error fetching data: ", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const group = e.target.value;
    setSelectedGroup(group);
    applyGroupFilter(group);
  };

  const applyGroupFilter = (group) => {
    const token = localStorage.getItem("token");
    const loggedEmail = localStorage.getItem("userEmail");

    fetch(
      `https://national-blood-donation-management-system-y10q.onrender.com/getalldetails`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let donorList = Array.isArray(data.data) ? data.data : [data.data];

        let filtered = donorList.filter(
          (d) => d.email !== loggedEmail && d.socialize === "Yes"
        );

        if (group !== "All") {
          const normalizedGroup = group.trim().toUpperCase();
          filtered = filtered.filter(
            (donor) =>
              donor.bloodgroup &&
              donor.bloodgroup.trim().toUpperCase() === normalizedGroup
          );
        }

        setFilteredDonors(filtered);
      })
      .catch((err) => console.log("Error filtering donors: ", err));
  };

  if (!isAuthenticated) {
    return (
      <h2 className="text-center text-red-500 text-xl mt-10">
        Please login first to view donors
      </h2>
    );
  }

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-600 mt-10">
        Loading donors...
      </p>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600">
        Donors Available ✨
      </h2>

      <div className="flex justify-center mb-4 gap-4 flex-wrap">
        <select
          value={selectedGroup}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
        >
          <option value="All">All Blood Groups</option>
          <option value="A Positive">A Positive</option>
          <option value="A Negative">A Negative</option>
          <option value="B Positive">B Positive</option>
          <option value="B Negative">B Negative</option>
          <option value="O Positive">O Positive</option>
          <option value="O Negative">O Negative</option>
          <option value="AB Positive">AB Positive</option>
          <option value="AB Negative">AB Negative</option>
        </select>
      </div>

      {filteredDonors.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDonors.map((donor, index) => (
            <div
              key={index}
              className="flex justify-between flex-col sm:flex-row p-5 border border-gray-200 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() =>
                navigate(`donorpage/${donor._id}`, { state: { donor } })
              }
            >
              <div className="mb-4 sm:mb-0">
                <p className="text-xl font-bold text-gray-800">{donor.name}</p>
                <p className="text-lg text-red-500 font-medium">
                  {donor.bloodgroup}
                </p>
                <p className="text-gray-600">{donor.city}</p>
              </div>
              <div className="self-end sm:self-center text-right">
                <p className="text-sm font-semibold text-blue-600">
                  {donor.typeofdonar}
                </p>
                <p className="text-sm font-semibold text-green-600">
                  Available
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-10">
          No socialize-available donors found.
        </p>
      )}
    </div>
  );
};

export default Donorpage;
