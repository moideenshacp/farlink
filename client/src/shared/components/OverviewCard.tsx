import React from "react";

interface OverviewCardProps {
  title: string;
  number: string | number;
  icon: React.ReactNode;
  chartColor: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  number,
  icon,
  chartColor,
}) => {
  return (
    <div>
      <div className="bg-white shadow-xl rounded-3xl p-4 h-52 w-96 hover:shadow-lg hover:scale-105 transition-transform">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 mt-10">
            <div className="size-6">{icon}</div>

            <div className="text-[#8C97A8] text-lg mt-1 font-medium">
              {title}
            </div>
          </div>
          <div className="text-black text-2xl font-semibold">{number}</div>
        </div>
        {/* Line Chart Placeholder */}
        <div className="mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 30"
            className="h-12 text-purple-500"
          >
            <path
              d="M0 20 Q25 5 50 15 Q75 25 100 10"
              stroke={chartColor}
              fill="none"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
