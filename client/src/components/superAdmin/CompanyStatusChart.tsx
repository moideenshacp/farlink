"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CompanyStatusChartProps {
  totalCompanies: number;
  blockedCompanies: number;
}

export const CompanyStatusChart: React.FC<CompanyStatusChartProps> = ({
  totalCompanies,
  blockedCompanies,
}) => {
  const activeCompanies = totalCompanies - blockedCompanies;

  const chartData = {
    labels: ["Active Companies", "Blocked Companies"],
    datasets: [
      {
        data: [activeCompanies, blockedCompanies],
        backgroundColor: ["#4CAF50", "#FF4C4C"], // Green for active, Red for blocked
        hoverBackgroundColor: ["#45A049", "#E53935"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="w-[300px] h-[300px] flex justify-center items-center">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};
