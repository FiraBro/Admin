import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "New Policies",
        data: [65, 59, 80, 81, 56, 55, 40, 72, 88, 94, 101, 87],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Renewed Policies",
        data: [28, 48, 40, 19, 86, 27, 90, 35, 42, 51, 38, 49],
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderColor: "rgba(16, 185, 129, 1)",
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

  return <Bar data={data} options={options} />;
};

export default BarChart;
