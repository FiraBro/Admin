import { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";

const Claims = () => {
  const [claims, setClaims] = useState([
    {
      id: 1,
      user: "John Doe",
      plan: "Basic Plan",
      amount: "$5,000",
      status: "pending",
      date: "2023-05-10",
    },
    {
      id: 2,
      user: "Jane Smith",
      plan: "Premium Plan",
      amount: "$15,000",
      status: "approved",
      date: "2023-05-11",
    },
    {
      id: 3,
      user: "Robert Johnson",
      plan: "Basic Plan",
      amount: "$8,000",
      status: "rejected",
      date: "2023-05-12",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const updateClaimStatus = (id, status) => {
    setClaims(
      claims.map((claim) => (claim.id === id ? { ...claim, status } : claim))
    );
  };

  const filteredClaims =
    filter === "all"
      ? claims
      : claims.filter((claim) => claim.status === filter);

  return (
    <div className="p-8">
      <Fade triggerOnce>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Claims Review</h1>
      </Fade>

      <Slide direction="up" triggerOnce>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Claims Review</h3>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
                  filter === "all"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
                  filter === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
                  filter === "approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter("rejected")}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
                  filter === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredClaims.length > 0 ? (
              filteredClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{claim.user}</h4>
                      <p className="text-gray-600 mt-1">
                        Claim for {claim.plan} - Amount: {claim.amount}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Submitted on {claim.date}
                      </p>
                      <span
                        className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${
                          claim.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : claim.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {claim.status}
                      </span>
                    </div>
                    {claim.status === "pending" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            updateClaimStatus(claim.id, "approved")
                          }
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateClaimStatus(claim.id, "rejected")
                          }
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-200"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No claims available
              </div>
            )}
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Claims;
