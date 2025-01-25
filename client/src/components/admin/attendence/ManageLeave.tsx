import React, { useEffect, useState } from "react";
import { fetchPolicy, updatePolicy } from "../../../api/attendenceApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Input from "../../../shared/components/Input";
import { message } from "antd";

const ManageLeave = () => {
  const [policy, setPolicy] = useState({
    officeStartTime: "",
    officeEndTime: "",
    lateMarkAfterMinutes: 0,
    halfDayAfterHours: 0,
    totalWorkingHours: 0,
    leaveType: {
      casual: 0,
      sick: 0,
      vacation: 0,
    },
  });
  const [error, setError] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue =
      e.target.type === "number" ? Math.max(0, Number(value)) : value;

    if (["casual", "sick", "vacation"].includes(name)) {
      setPolicy((prevData) => ({
        ...prevData,
        leaveType: {
          ...prevData.leaveType,
          [name]: numericValue,
        },
      }));
    } else {
      setPolicy((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    }

    setError("");
  };

  const { user } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!policy.officeStartTime || !policy.officeEndTime) {
        setError("Please provide office start time and end time");
      }
      const res = await updatePolicy(policy, user?.organizationId);
      if (res.data.message === "Policy Updated successfully") {

        message.success("Policy updated successfully!", 2);

      } else {
        message.error("An error occurred. Please try again.", 2);

      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred. Please try again.", 2);
    }
  };

  useEffect(() => {
    const getPolicy = async () => {
      try {
        const res = await fetchPolicy(user?.organizationId);

        if (res.data.message === "Policy fetched successfully") {
          setPolicy(res.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPolicy();
  }, [user?.organizationId]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 ">
        <h1 className="text-2xl font-bold mb-6">
          Attendance Policy Management
        </h1>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Office Start Time"
            type="time"
            name="officeStartTime"
            value={policy.officeStartTime}
            onChange={handleInputChange}
          />
          <Input
            label="Office End Time"
            type="time"
            name="officeEndTime"
            value={policy.officeEndTime}
            onChange={handleInputChange}
          />
          <Input
            label="Late Mark After (Minutes)"
            type="number"
            name="lateMarkAfterMinutes"
            value={policy.lateMarkAfterMinutes}
            onChange={handleInputChange}
            min="0"
          />
          <Input
            label="Half Day After (Hours)"
            type="number"
            name="halfDayAfterHours"
            value={policy.halfDayAfterHours}
            onChange={handleInputChange}
            min="0"
          />
          <Input
            label="Total Working Hours"
            type="number"
            name="totalWorkingHours"
            value={policy.totalWorkingHours}
            onChange={handleInputChange}
            min="0"
          />
          <Input
            label="Casual"
            type="number"
            name="casual"
            value={policy.leaveType.casual}
            onChange={handleInputChange}
            min="0"
          />
          <Input
            label="Sick"
            type="number"
            name="sick"
            value={policy.leaveType.sick}
            onChange={handleInputChange}
            min="0"
          />
          <Input
            label="Vacation"
            type="number"
            name="vacation"
            value={policy.leaveType.vacation}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        <button
          type="submit"
          className="mt-4 sm: ml-24 lg:ml-0 px-6 py-3 bg-[#4361EE] text-white font-medium rounded-lg hover:bg-[#4361EE]"
        >
          Save Policy
        </button>
      </div>
    </form>
  );
};

export default ManageLeave;
