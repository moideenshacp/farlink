"use client";

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

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample data
const chartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Desktop",
      data: [186, 305, 237, 73, 209, 214],
      backgroundColor: "#2563eb",
      borderRadius: 4,
    },
    {
      label: "Mobile",
      data: [80, 200, 120, 190, 130, 140],
      backgroundColor: "#60a5fa",
      borderRadius: 4,
    },
  ],
};

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Device Usage",
    },
  },
};

export const DashboardChart = () => {
  return (
    <div className="w-full h-[500px] flex justify-center">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
