import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [12500, 19000, 15000, 22000],
        fill: false,
        backgroundColor: "rgba(234, 88, 12, 0.7)",
        borderColor: "rgba(234, 88, 12, 1)",
        tension: 0.3,
        pointBackgroundColor: "rgba(234, 88, 12, 1)",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Claims Paid ($)",
        data: [8000, 12000, 9000, 15000],
        fill: false,
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgba(59, 130, 246, 1)",
        tension: 0.3,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointRadius: 5,
        pointHoverRadius: 7,
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

  return <Line data={data} options={options} />;
};

export default LineChart;
