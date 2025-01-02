import React, { useState } from "react";

const ManageLeave = () => {
  const [policy, setPolicy] = useState({
    officeStartTime: "",
    officeEndTime: "",
    lateMarkAfterMinutes: 0,
    halfDayAfterHours: 0,
    totalWorkingHours: 0,
    casual: 0,
    sick: 0,
    vacation: 0,
  });


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPolicy((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    
  };

  return (
    <form onSubmit={handleSubmit}>

    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Attendance Policy Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Office Timings */}
        <div>
          <label className="block font-medium mb-2">Office Start Time</label>
          <input
            type="time"
            name="officeStartTime"
            value={policy.officeStartTime}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Office End Time</label>
          <input
            type="time"
            name="officeEndTime"
            value={policy.officeEndTime}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Late Mark and Half-Day */}
        <div>
          <label className="block font-medium mb-2">
            Late Mark After (Minutes)
          </label>
          <input
            type="number"
            name="lateMarkAfterMinutes"
            value={policy.lateMarkAfterMinutes}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">
            Half Day After (Hours)
          </label>
          <input
            type="number"
            value={policy.halfDayAfterHours}
            onChange={handleInputChange}
            name="halfDayAfterHours"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Total Working Hours */}
        <div>
          <label className="block font-medium mb-2">Total Working Hours</label>
          <input
            type="number"
            value={policy.totalWorkingHours}
            onChange={handleInputChange}
            name="totalWorkingHours"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Leave Types */}
        <div className="col-span-2">
          <label className="block font-medium mb-2">Leave Types</label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Casual</label>
              <input
                type="number"
                name="casual"
                value={policy.casual}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sick</label>
              <input
                type="number"
                value={policy.sick}
                name="sick"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Vacation</label>
              <input
                type="number"
                value={policy.vacation}
                name="vacation"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
      >
        Save Policy
      </button>
    </div>
    </form>
  );
};

export default ManageLeave;
