import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  percentage?: string;
  color?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, percentage, color = "text-gray-500", icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-64">
      <div className={`text-sm ${color} flex items-center gap-2`}>
        {icon} {title}
      </div>
      <div className="text-3xl font-bold">{value}</div>
      {percentage && <div className="text-sm text-gray-500 mt-2">{percentage}</div>}
    </div>
  );
};

export default StatCard;
