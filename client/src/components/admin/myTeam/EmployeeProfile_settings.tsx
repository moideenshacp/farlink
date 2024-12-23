
const EmployeeProfile_settings = () => {
  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Employee Invitation</h3>
        <p className="text-sm text-[#6A7181] mb-4">
          Send an invitation to the employee for access to the FarL<span className="text-blue-800">i</span>nk app.
        </p>
        <button className="bg-[#4361EE] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#4361EE]">
          Send Invitation
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold ">Employee Termination</h3>
        <p className="text-sm text-[#6A7181] mb-4">
          Terminate the employee to remove their access from the FarL<span className="text-blue-800">i</span>nk app.
        </p>
        <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600">
          Terminate Employee
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfile_settings;
