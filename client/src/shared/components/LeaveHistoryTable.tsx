import React from "react";
import { AllLeaves } from "../../interface/IfetchLeave";

interface LeaveHistoryTableProps {
  leaves: AllLeaves[];
  onLeaveSelect: (leave: AllLeaves) => void;
}

const LeaveHistoryTable: React.FC<LeaveHistoryTableProps> = ({
  leaves,
  onLeaveSelect,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-500 border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="lg:px-5 sm: px-4 py-2">S.No</th>
            <th className="lg:px-16 sm: px-4 py-2">From</th>
            <th className="lg:px-16 sm: px-4 py-2">To</th>
            <th className="lg:px-16 sm: px-4 py-2">Status</th>
            <th className="lg:px-16 sm: px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="lg:px-5 sm: px-4 py-2 ">{index + 1}</td>
                <td className="lg:px-16 sm: px-4 py-2 whitespace-nowrap">
                  {new Date(leave.startDate).toISOString().split("T")[0]}
                </td>
                <td className="lg:px-16 sm: px-4 py-2 whitespace-nowrap ">
                  {new Date(leave.endDate).toISOString().split("T")[0]}
                </td>
                <td className="lg:px-16 sm: px-4 py-2 ">
                  <span
                    className={`rounded-2xl px-3 py-1 ${
                      leave.status === "Approved"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="lg:px-16 sm: px-4 py-2 whitespace-nowrap ">
                  <button
                    onClick={() => onLeaveSelect(leave)}
                    className="flex items-center px-4 py-2 bg-purple-100 text-[#4361EE] rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                    <span className="ml-2">View Details</span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No leaves found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveHistoryTable;
