import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { applyLeave, fetchRemainingLeaves } from "../../../api/leaveApi";
import { message } from "antd";

interface applyModalProps {
  onClose: () => void;
  onLeaveApplied: () => void;
}

const ApplyLeaveModal: React.FC<applyModalProps> = ({
  onClose,
  onLeaveApplied,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const organizationId = user?.organizationId;
  const employeeEmail = user?.email;
  const [formData, setFormData] = useState({
    leaveType: "sick",
    fromDate: new Date(),
    toDate: new Date(),
    reason: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leaveBalance, setLeaveBalance] = useState<any>([]);
  const [reasonErr, setReasonErr] = useState("");
  useEffect(() => {
    const fetchBalanceLeaves = async () => {
      try {
        const res = await fetchRemainingLeaves(organizationId, employeeEmail);
        setLeaveBalance(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (organizationId && employeeEmail) {
      fetchBalanceLeaves();
    }
  }, [organizationId, employeeEmail]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.reason.trim()) {
        setReasonErr("Please enter a valid Reason! ");
        return;
      }
      const leaveData = {
        formData,
        organizationId,
        employeeEmail,
      };
      const res = await applyLeave(leaveData);
      if (res.data.message === "Leave applied successfully") {
        setFormData({
          leaveType: "sick",
          fromDate: new Date(),
          toDate: new Date(),
          reason: "",
        });
        message.success("Leave Applied sucessfully", 2);
        onLeaveApplied();
        setTimeout(() => {
          onClose();
        }, 1000);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        message.warning(error.response.data.error, 2);
      } else {
        message.error(
          "An error occurred while applying Leave. Please try again",
          2
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#232360]">
              Leave Type
            </label>
            <select
              className="w-full border focus:outline-none rounded-lg p-2"
              value={formData.leaveType}
              name="leaveType"
              onChange={handleChange}
            >
              <option value="sick">
                Sick
                <span>({leaveBalance?.sick})</span>
              </option>

              <option value="casual">
                Casual
                <span>({leaveBalance?.casual})</span>
              </option>
              <option value="vacation">
                Vacation
                <span>({leaveBalance?.vacation})</span>
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#232360]">
              From
            </label>
            <DatePicker
              selected={formData.fromDate}
              onChange={(date) => handleDateChange(date, "fromDate")}
              className="w-full border rounded-lg p-2 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#232360]">To</label>
            <DatePicker
              selected={formData.toDate}
              onChange={(date) => handleDateChange(date, "toDate")}
              className="w-full p-3 border rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#232360]">
              Reason for Leave
            </label>
            <textarea
              className="w-full border focus:outline-none rounded-lg p-2"
              value={formData.reason}
              name="reason"
              onChange={handleChange}
            ></textarea>
            {reasonErr && <p className="text-red-600">{reasonErr}</p>}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-white border-2 border-[#D9DADE] py-2 px-6 rounded-xl"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-[#4361EE] text-white px-4 py-2 rounded-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ApplyLeaveModal;
