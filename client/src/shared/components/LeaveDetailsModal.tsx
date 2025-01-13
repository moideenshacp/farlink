import React, { useEffect, useState } from "react";
import { AllLeaves } from "../../interface/IfetchLeave";
import { manageLeaveApplication } from "../../api/leaveApi";

interface LeaveDetailsModelProps {
  leave: AllLeaves;
  onClose: () => void;
  isAdmin?: boolean;
  onStatusChange?: () => void;
}

const LeaveDetailsModel: React.FC<LeaveDetailsModelProps> = ({
  leave,
  onClose,
  isAdmin,
  onStatusChange,
}) => {
  const [status, setStatus] = useState<string | undefined>(leave.status);

  useEffect(() => {
    setStatus(leave.status);
  }, [leave]);

  const handleSubmit = async () => {
    try {
      console.log("get in manafe leavee---------------------------------");
      const res = await manageLeaveApplication(leave._id, status);
      if (res.data.message === "Leave Managed successfully..") {
        if (onStatusChange) {
          onStatusChange();
          onClose();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg w-full max-w-lg p-6 mx-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-500 text-2xl hover:text-gray-800"
            >
              &times;
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4">Leave Details</h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#232360]">
              Leave Type
            </label>
            <p className="border px-3 py-2 rounded-lg">{leave.leaveType}</p>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#232360]">
              From
            </label>
            <p className="border px-3 py-2 rounded-lg">
              {new Date(leave.startDate).toLocaleDateString()}
            </p>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#232360]">To</label>
            <p className="border px-3 py-2 rounded-lg">
              {new Date(leave.endDate).toLocaleDateString()}
            </p>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#232360]">
              Reason
            </label>
            <p className="border px-3 py-2 rounded-lg">{leave.reason}</p>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#232360]">
              Status
            </label>
            {isAdmin ? (
              <select
                name="leaveStatus"
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="border px-6 py-3 rounded-lg focus:outline-none"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            ) : (
              <p className="border px-3 py-2 rounded-lg">{leave.status}</p>
            )}
          </div>
          {isAdmin ? (
            <div className="flex justify-end space-x-3">
              <button
                className="bg-[#4361EE] text-white px-4 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveDetailsModel;
