import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartBox = ({ totalPolicies }) => {
  const data = [
    { name: "Policies", value: totalPolicies || 0 },
    { name: "Target", value: 1000 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" />
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChartBox;


