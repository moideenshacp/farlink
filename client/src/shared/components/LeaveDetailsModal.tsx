import React, { useEffect, useState } from "react";
import { Input, Select, Button, message } from "antd";
import { AllLeaves } from "../../interface/IfetchLeave";
import {
  editLeave,
  fetchRemainingLeaves,
  manageLeaveApplication,
} from "../../api/leaveApi";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const { Option } = Select;

interface LeaveDetailsModelProps {
  leave: AllLeaves;
  onClose: () => void;
  isAdmin?: boolean;
  onStatusChange?: () => void;
  onLeaveApplied?:() =>void
}

const LeaveDetailsModel: React.FC<LeaveDetailsModelProps> = ({
  leave,
  onClose,
  isAdmin,
  onStatusChange,
  onLeaveApplied
}) => {
  const [status, setStatus] = useState<string | undefined>(leave.status);
  const { user } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    leaveType: leave.leaveType,
    fromDate: new Date(leave.startDate),
    toDate: new Date(leave.endDate),
    reason: leave.reason,
  });
  const [reasonErr, setReasonErr] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leaveBalance, setLeaveBalance] = useState<any>([]);
  useEffect(() => {
    const fetchBalanceLeaves = async () => {
      try {
        const res = await fetchRemainingLeaves(
          user?.organizationId,
          user?.email
        );
        setLeaveBalance(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (user?.organizationId && user?.email) {
      fetchBalanceLeaves();
    }
  }, [user?.organizationId, user?.email]);
  useEffect(() => {
    setStatus(leave.status);
  }, [leave]);

  const handleSubmit = async () => {
    try {
      const res = await manageLeaveApplication(leave._id, status);
      if (res.data.message === "Leave Managed successfully..") {
        if (onStatusChange) {
          onStatusChange();
          onClose();
          message.success("Leave status updated successfully");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = (
    date: Date | null,
    field: "fromDate" | "toDate"
  ) => {
    setFormData({
      ...formData,
      [field]: date || new Date(),
    });
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setReasonErr("");
  };

  const handleEdit = async (e: React.FormEvent) => {
    console.log("editing");

    e.preventDefault();
    try {
      if (!formData.reason.trim()) {
        setReasonErr("Please enter a valid Reason! ");
        return;
      }
      const leaveData = {
        formData,
        organizationId: user?.organizationId,
        employeeEmail: user?.email,
      };
      const res = await editLeave(leave._id, leaveData);
      console.log(res.data, "from edit");
      if (res.data.message === "Leave edited successfully") {
        if (onLeaveApplied) {
          onClose();
          onLeaveApplied()
        }
        message.success("Leave edited successfully");
      } else {
        message.error("Error occured during editing leave");
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
          <form onSubmit={handleEdit}>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-[#232360]">
                Leave Type
              </label>
              {isAdmin || user?.position === "HR" || status !== "pending" ? (
  <Input
    name="leaveType"
    value={formData.leaveType}
    onChange={handleChange}
    readOnly
  />
) : (
  <select
    className="w-full border focus:outline-none rounded-lg p-2"
    value={formData.leaveType}
    name="leaveType"
    onChange={handleChange}
  >
    <option value="sick">Sick ({leaveBalance?.sick})</option>
    <option value="casual">Casual ({leaveBalance?.casual})</option>
    <option value="vacation">Vacation ({leaveBalance?.vacation})</option>
  </select>
)}

            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-[#232360]">
                From
              </label>
              <DatePicker
                name="fromDate"
                selected={formData.fromDate}
                onChange={(date) => handleDateChange(date, "fromDate")}
                className="w-full p-3 border rounded-lg focus:outline-none"
                disabled={isAdmin || status !== "pending"}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-[#232360]">
                To
              </label>
              <DatePicker
                name="toDate"
                selected={formData.toDate}
                onChange={(date) => handleDateChange(date, "toDate")}
                className="w-full p-3 border rounded-lg focus:outline-none"
                disabled={isAdmin || status !== "pending"}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-[#232360]">
                Reason
              </label>
              <Input.TextArea
                name="reason"
                onChange={handleChange}
                value={formData.reason}
                readOnly={isAdmin || status !== "pending"}
              />
              {reasonErr && <p className="text-red-600">{reasonErr}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-[#232360]">
                Status
              </label>
              {isAdmin ? (
                <Select value={status} onChange={setStatus} className="w-full">
                  <Option value="pending">Pending</Option>
                  <Option value="approved">Approved</Option>
                  <Option value="rejected">Rejected</Option>
                </Select>
              ) : (
                <Input value={status} readOnly />
              )}
            </div>

            {status === "pending" && !isAdmin && (
              <div className="flex justify-end space-x-3">
                <Button onClick={handleEdit} type="primary">
                  Submit
                </Button>
              </div>
            )}
          </form>
          {isAdmin && (
            <div className="flex justify-end space-x-3">
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveDetailsModel;
