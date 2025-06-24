import { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";

const Plans = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic Plan",
      description: "Basic coverage",
      coverage: "$10,000",
      price: "$50/month",
      duration: "1 year",
    },
    {
      id: 2,
      name: "Premium Plan",
      description: "Premium coverage",
      coverage: "$50,000",
      price: "$150/month",
      duration: "1 year",
    },
  ]);

  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    coverage: "",
    price: "",
    duration: "",
  });

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    const newId =
      plans.length > 0 ? Math.max(...plans.map((p) => p.id)) + 1 : 1;
    setPlans([...plans, { id: newId, ...newPlan }]);
    setNewPlan({
      name: "",
      description: "",
      coverage: "",
      price: "",
      duration: "",
    });
  };

  const handlePlanDelete = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <div className="p-4 md:p-8">
      <Fade triggerOnce>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Insurance Plans
        </h1>
      </Fade>

      <Slide direction="up" triggerOnce>
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Current Plans</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {plans.length > 0 ? (
                  plans.map((plan) => (
                    <div
                      key={plan.id}
                      className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-lg">{plan.name}</h4>
                          <p className="text-gray-600 mt-1 text-sm md:text-base">
                            {plan.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1 md:gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {plan.coverage} coverage
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {plan.price}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {plan.duration}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handlePlanDelete(plan.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 self-end sm:self-auto"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No plans available
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Add New Plan</h3>
              <form
                onSubmit={handlePlanSubmit}
                className="space-y-3 md:space-y-4"
              >
                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Plan Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    value={newPlan.name}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, name: e.target.value })
                    }
                    required
                  />
                </div>
                {/* Other form fields... */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
                >
                  Add Plan
                </button>
              </form>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Plans;
