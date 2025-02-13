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
import { ITaskDetails } from "../../../interface/ItaskDetails";

interface DashboardChartProps {
  projects: IProject[];
  tasks: ITaskDetails[];
}

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Project & Task Overview",
    },
  },
};

export const DashboardChart: React.FC<DashboardChartProps> = ({
  projects,
  tasks,
}) => {
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

  const totalProjects = new Array(12).fill(0);
  const completedProjects = new Array(12).fill(0);
  const totalTasks = new Array(12).fill(0);
  const completedTasks = new Array(12).fill(0);

  projects.forEach((project) => {
    const monthIndex = project.startDate
      ? new Date(project.startDate).getMonth()
      : null;
    if (monthIndex !== null) {
      totalProjects[monthIndex] += 1;
      if (project.status === "completed") {
        completedProjects[monthIndex] += 1;
      }
    }
  });

  tasks.forEach((task) => {
    const monthIndex = task.startDate
      ? new Date(task.startDate).getMonth()
      : null;
    if (monthIndex !== null) {
      totalTasks[monthIndex] += 1;
      if (task.status === "completed") {
        completedTasks[monthIndex] += 1;
      }
    }
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Total Projects",
        data: totalProjects,
        backgroundColor: "#2563eb",
        borderRadius: 4,
      },
      {
        label: "Completed Projects",
        data: completedProjects,
        backgroundColor: "#60a5fa",
        borderRadius: 4,
      },
      {
        label: "Total Tasks",
        data: totalTasks,
        backgroundColor: "#f59e0b",
        borderRadius: 4,
      },
      {
        label: "Completed Tasks",
        data: completedTasks,
        backgroundColor: "#22c55e",
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
