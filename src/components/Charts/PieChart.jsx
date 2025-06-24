import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Approved", "Pending", "Rejected", "Under Review"],
    datasets: [
      {
        data: [45, 20, 10, 25],
        backgroundColor: [
          "rgba(16, 185, 129, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(59, 130, 246, 0.7)",
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(59, 130, 246, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: window.innerWidth < 768 ? "bottom" : "top", // Adjust legend position
        labels: {
          boxWidth: window.innerWidth < 768 ? 10 : 15, // Smaller boxes on mobile
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Smaller text on mobile
          },
        },
      },
    },
    // ... rest of your options
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
