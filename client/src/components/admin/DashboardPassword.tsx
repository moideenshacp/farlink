const DashboardPassword = () => {
  return (
    <div>
      <div className="space-y-2">
      <div className="mt-2 flex justify-end space-x-4">
          <button className="bg-white border-2 border-[#D9DADE] py-2 px-6 rounded-xl">
            Cancel
          </button>
          <button className="bg-[#4361EE] py-2 px-6 rounded-xl text-white">
            Save
          </button>
        </div>
        <div className="form-group">
          <label className="block font-semibold text-[#232360]">Current Password</label>
          <input className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#768396]" type="password" />
        </div>
        <div className="form-group">
          <label className="block font-semibold text-[#232360]">New Password</label>
          <input className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#768396]" type="password" />
        </div>
        <div className="form-group">
          <label className="block font-semibold text-[#232360]">Confirm Password</label>
          <input className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#768396]" type="password" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPassword;
