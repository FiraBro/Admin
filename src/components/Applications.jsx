import { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { adminService } from "../services/adminService"; // adjust path as needed

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch all applications from the backend
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await adminService.getApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Update application status (approve/reject)
  const updateApplicationStatus = async (id, status) => {
    try {
      await adminService.updateApplicationStatus(id, status);
      await fetchApplications(); // Refetch the latest list after status update
    } catch (error) {
      console.error("Error updating application status:", error.message);
    }
  };

  // Filter applications based on status filter
  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status.toLowerCase() === filter);

  return (
    <div className="p-8">
      <Fade triggerOnce>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Policy Applications
        </h1>
      </Fade>

      <Slide direction="up" triggerOnce>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Policy Applications</h3>
            <div className="flex space-x-2 mt-2">
              {["all", "pending", "approved", "rejected"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
                    filter === type
                      ? type === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : type === "approved"
                        ? "bg-green-100 text-green-800"
                        : type === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading applications...
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <div
                    key={app._id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">
                          {app.user?.email || "Unknown User"}
                        </h4>
                        <p className="text-gray-600 mt-1">
                          Applied for {app.plan?.name || app.plan} on{" "}
                          {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                        <span
                          className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${
                            app.status.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : app.status.toLowerCase() === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>

                      {/* Always show approve/reject buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            updateApplicationStatus(app._id, "Approved")
                          }
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateApplicationStatus(app._id, "Rejected")
                          }
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-200"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No applications available
                </div>
              )}
            </div>
          )}
        </div>
      </Slide>
    </div>
  );
};

export default Applications;
