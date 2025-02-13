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
import { IProject } from "../../../interface/IprojectDetails";

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardChartProps {
  projects: IProject[];
}
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Project Overview",
    },
  },
};
export const DashboardChart: React.FC<DashboardChartProps> = ({ projects }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const projectCounts = new Array(12).fill(0);
  const completedCounts = new Array(12).fill(0);

  projects.forEach((project) => {
    const monthIndex = new Date(project.startDate).getMonth();
    projectCounts[monthIndex] += 1;

    if (project.status === "completed") {
      completedCounts[monthIndex] += 1;
    }
  });
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Total Projects",
        data: projectCounts,
        backgroundColor: "#2563eb",
        borderRadius: 4,
      },
      {
        label: "Completed Projects",
        data: completedCounts,
        backgroundColor: "#60a5fa",
        borderRadius: 4,
      },
    ],
  };
  return (
    <div className="w-full h-[500px] flex justify-center">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
