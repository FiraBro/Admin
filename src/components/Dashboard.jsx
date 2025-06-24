import { Fade } from "react-awesome-reveal";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import LineChart from "./Charts/LineChart";

const Dashboard = () => {
  const stats = {
    totalUsers: 1245,
    totalPolicies: 876,
    approvedClaims: 342,
    revenue: "$124,567",
  };

  return (
    <div className="p-4 md:p-8">
      <Fade triggerOnce>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Dashboard
        </h1>
      </Fade>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color="blue"
          icon="👥"
        />
        <StatCard
          title="Total Policies"
          value={stats.totalPolicies}
          color="green"
          icon="📄"
        />
        <StatCard
          title="Approved Claims"
          value={stats.approvedClaims}
          color="purple"
          icon="✅"
        />
        <StatCard
          title="Revenue"
          value={stats.revenue}
          color="yellow"
          icon="💰"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Policies</h3>
          <div className="h-64 md:h-80">
            <BarChart />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Claims Distribution</h3>
          <div className="h-64 md:h-80">
            <PieChart />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <div className="h-64 md:h-80">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, icon }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
            {value}
          </p>
        </div>
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${colorClasses[color]} flex items-center justify-center text-xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
