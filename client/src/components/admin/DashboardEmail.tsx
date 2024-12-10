const DashboardEmail = () => {
  return (
    <div>
      <div>
      <div className="mt-2 flex justify-end space-x-4">
          <button className="bg-white border-2 border-[#D9DADE] py-2 px-6 rounded-xl">
            Cancel
          </button>
          <button className="bg-[#4361EE] py-2 px-6 rounded-xl text-white">
            Save
          </button>
        </div>
        <h2 className="text-xl font-bold">Email</h2>
        {/* Add email-related fields */}
      </div>
    </div>
  );
};

export default DashboardEmail;
