import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartBox = ({ revenue }) => {
  const numericRevenue =
    typeof revenue === "string"
      ? parseFloat(revenue.replace(/[^\d.]/g, ""))
      : revenue || 0;

  // Fake monthly breakdown for demo purposes
  const data = [
    { month: "Jan", value: numericRevenue * 0.1 },
    { month: "Feb", value: numericRevenue * 0.2 },
    { month: "Mar", value: numericRevenue * 0.2 },
    { month: "Apr", value: numericRevenue * 0.3 },
    { month: "May", value: numericRevenue * 0.2 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartBox;



