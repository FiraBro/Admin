import { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { claimService } from "../services/claimService";

const Claims = () => {
  const [claims, setClaims] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await claimService.getAllClaims();

        if (response.status && Array.isArray(response.data)) {
          setClaims(response.data);
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (error) {
        console.error("Error fetching claims:", error);
        setError(error.message || "Failed to load claims");
        setClaims([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const updateClaimStatus = async (id, status) => {
    try {
      await claimService.updateClaimStatus(id, status);
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim._id === id ? { ...claim, status } : claim
        )
      );
    } catch (error) {
      console.error("Error updating claim status:", error);
      setError(error.message || "Failed to update claim status");
    }
  };

  const filteredClaims =
    filter === "all"
      ? claims
      : claims.filter(
          (claim) => claim.status.toLowerCase() === filter.toLowerCase()
        );

  const statusOptions = ["all", "pending", "approved", "rejected"];

  return (
    <div className="p-8">
      <Fade triggerOnce>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Claims Review</h1>
      </Fade>

      {error && (
        <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-2 text-red-700 underline"
          >
            Retry
          </button>
        </div>
      )}

      <Slide direction="up" triggerOnce>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Claims Review</h3>
            <div className="flex space-x-2 mt-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
                    filter === status
                      ? status === "all"
                        ? "bg-blue-100 text-blue-800"
                        : status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-6 text-center text-gray-500">
                Loading claims...
              </div>
            ) : filteredClaims.length > 0 ? (
              filteredClaims.map((claim) => (
                <div
                  key={claim._id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        Policy: {claim.policyNumber}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        Reason: {claim.reason}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Submitted on{" "}
                        {new Date(claim.submittedAt).toLocaleDateString()}
                      </p>
                      <span
                        className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${
                          claim.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : claim.status.toLowerCase() === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {claim.status}
                      </span>
                    </div>
                    {claim.status.toLowerCase() === "pending" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            updateClaimStatus(claim._id, "Approved")
                          }
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateClaimStatus(claim._id, "Rejected")
                          }
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
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
