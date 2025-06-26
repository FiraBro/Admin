import { useEffect, useState } from "react";
import { dashService } from "../services/dashService";
import { Fade } from "react-awesome-reveal";

import BarChartBox from "./Charts/BarChartBox";
import PieChartBox from "./Charts/PieChartBox";
import LineChartBox from "./Charts/LineChartBox";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPolicies: 0,
    approvedClaims: 0,
    totalClaims: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, policies, claims, revenue, totalClaims] =
          await Promise.all([
            dashService.AllUserCount(),
            dashService.AllPlanCount(),
            dashService.AllAprovedClaim(),
            dashService.TotalPremium(),
            dashService.TotalClaims(),
          ]);
          console.log(totalClaims)
        setStats({
          totalUsers: users.count || 0,
          totalPolicies: policies.count || 0,
          approvedClaims: claims.count || 0,
          totalClaims: totalClaims.count || 0,
          revenue: revenue.data.totalPremiums || 0,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

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
          value={`$${stats.revenue}`}
          color="yellow"
          icon="💰"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Policies</h3>
          <div className="h-64 md:h-80">
            <BarChartBox totalPolicies={stats.totalPolicies} />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Claims Distribution</h3>
          <div className="h-64 md:h-80">
            <PieChartBox
              approvedClaims={stats.approvedClaims}
              totalClaims={stats.totalClaims}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <div className="h-64 md:h-80">
          <LineChartBox revenue={stats.revenue} />
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
