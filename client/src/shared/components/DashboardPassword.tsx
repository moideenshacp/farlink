import Input from "./Input";

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

        <Input
          label="Current Password"
          type="password"
          placeholder="Enter your current password"
          name="currentPassword"
          value=""
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#768396]"
        />

        {/* New Password */}
        <Input
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          name="newPassword"
          value=""
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#768396]"
        />

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your new password"
          name="confirmPassword"
          value=""
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#768396]"
        />
      </div>
    </div>
  );
};

export default DashboardPassword;
