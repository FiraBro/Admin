import { useState, useEffect } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { adminService } from "../services/adminService";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    coverage: "",
    price: "",
    duration: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await adminService.getPlans();
        console.log(data);
        setPlans(data.data);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to fetch plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleInputChange = (e) => {
    setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formattedPlan = {
        name: newPlan.name,
        description: newPlan.description,
        premium: Number(newPlan.price),
        durationMonths: Number(newPlan.duration),
      };

      const createdPlan = await adminService.addPlan(formattedPlan);
      setPlans([...plans, createdPlan]);

      // Reset form
      setNewPlan({
        name: "",
        description: "",
        coverage: "",
        price: "",
        duration: "",
      });
      setError("");
    } catch (err) {
      setError(err.message || "Failed to add plan");
    } finally {
      setLoading(false);
    }
  };

  const handlePlanDelete = async (id) => {
    try {
      setLoading(true);
      await adminService.deletePlan(id);
      setPlans(plans.filter((plan) => plan.id !== id));
      setError("");
    } catch (err) {
      setError(err.message || "Failed to delete plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Fade triggerOnce>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Insurance Plans
        </h1>
      </Fade>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-md">
          Processing...
        </div>
      )}

      <Slide direction="up" triggerOnce>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Plan List */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Existing Plans</h2>
            {plans.length === 0 ? (
              <p className="text-gray-500">No plans available.</p>
            ) : (
              <ul className="space-y-4">
                {plans.map((plan) => (
                  <li key={plan.id} className="p-4 bg-white rounded shadow-md">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                    <p>
                      <strong>Description:</strong> ${plan.description}
                    </p>
                    <p>
                      <strong>Price:</strong> ${plan.premium}
                    </p>
                    <p>
                      <strong>Duration:</strong> {plan.duration} months
                    </p>
                    <button
                      onClick={() => handlePlanDelete(plan._id)}
                      className="mt-2 px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Add Plan Form */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Add New Plan</h2>
            <form
              onSubmit={handlePlanSubmit}
              className="bg-white p-6 rounded shadow-md space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Plan Name"
                value={newPlan.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newPlan.description}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="coverage"
                placeholder="Coverage Details"
                value={newPlan.coverage}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newPlan.price}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                name="duration"
                placeholder="Duration (months)"
                value={newPlan.duration}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add Plan
              </button>
            </form>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Plans;
