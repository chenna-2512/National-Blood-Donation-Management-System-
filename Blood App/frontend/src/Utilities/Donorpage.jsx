import { useEffect, useState } from "react";
import {
  MapPin,
  Droplets,
  Phone,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Donorpage = () => {
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const totalDonations = localStorage.getItem("totalDonations");
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
                d.email !== loggedEmail &&
                d.socialize?.toLowerCase() === "yes"
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

  const handleFilterChange = (group) => {
    setSelectedGroup(group);
    applyFilters(group, selectedCity);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    applyFilters(selectedGroup, city);
  };

  const applyFilters = (group, city) => {
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

        if (city !== "All") {
          const normalizedCity = city.trim().toLowerCase();
          filtered = filtered.filter(
            (donor) =>
              donor.city &&
              donor.city.trim().toLowerCase() === normalizedCity
          );
        }

        setFilteredDonors(filtered);
      })
      .catch((err) => console.log("Error filtering donors: ", err));
  };

  const getDonorLevel = (count) => {
    if (count > 25) return "Super Donor";
    if (count > 20) return "Platinum Donor";
    if (count > 15) return "Diamond Donor";
    if (count > 10) return "Gold Donor";
    if (count > 5) return "Silver Donor";
    return "Rising Donor";
  };

  const getBadgeColor = (level) => {
    const colors = {
      "Rising Donor": "bg-gray-400",
      "Silver Donor": "bg-gray-500",
      "Gold Donor": "bg-yellow-500",
      "Diamond Donor": "bg-blue-500",
      "Platinum Donor": "bg-indigo-600",
      "Super Donor": "bg-purple-700",
    };
    return colors[level] || "bg-gray-400";
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
    <div className="bg-gradient-to-br from-gray-50 via-white to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-14">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
        Verified Donors In Your Area 🩸
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
        <div className="relative w-full max-w-xs">
          <Droplets className="absolute left-3 top-3.5 text-red-500 w-5 h-5" />
          <select
            value={selectedGroup}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full pl-10 pr-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
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

        <div className="relative w-full max-w-xs">
          <MapPin className="absolute left-3 top-3.5 text-red-500 w-5 h-5" />
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full pl-10 pr-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
          >
            <option value="All">All Cities</option>
            <option value="Kurnool">Kurnool</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>
      </div>

      {/* Donor Cards */}
      {filteredDonors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDonors.map((donor, index) => {
            const level = getDonorLevel(totalDonations || 0);
            return (
              <div
                key={index}
                onClick={() =>navigate(`donorpage/${donor._id}`, { state: { donor } })}
                className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600">
                      {donor.name}
                    </h3>
                  </div>
                  <span className={`text-sm font-semibold text-white text-center px-3 py-1 rounded-full animate-bounce ${getBadgeColor(level)}`}>
                    {level}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1 mb-1">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {donor.bloodgroup}
                      </span>
                    </div>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">{donor.city} , {donor.state}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{totalDonations}</div>
                    <div className="text-xs text-gray-500">Total Donations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {new Date(donor.lblooddonate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-xs text-gray-500">Last Donated</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a href={`tel:${donor.phoneno}`} className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </a>
                  <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center">
                    {donor.typeofdonar.charAt(0).toUpperCase() + donor.typeofdonar.slice(1)} Donor
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
            <Search className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No Donors Found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We couldn&apos;t find any donors matching your filters. Try adjusting your city or group.
          </p>
        </div>
      )}
    </div>
  );
};

export default Donorpage;
