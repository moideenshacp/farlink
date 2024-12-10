const DashboardOrg = () => {
    return (
      <div>
        <div className="space-y-3">
          <div className="mt-2 flex justify-end space-x-4">
            <button className="bg-white border-2 border-[#D9DADE] py-2 px-6 rounded-xl">
              Cancel
            </button>
            <button className="bg-[#4361EE] py-2 px-6 rounded-xl text-white">
              Save
            </button>
          </div>
  
          {/* Flexbox container for side-by-side layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="form-group">
              <label className="block font-medium text-[#232360]">Name</label>
              <input
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333]  font-semibold"
                type="text"
                defaultValue="Mars"
              />
            </div>
  
            <div className="form-group">
              <label className="block font-medium text-[#232360]">Industry</label>
              <input
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333]  font-semibold"
                type="text"
                defaultValue="IT"
              />
            </div>
  
            <div className="form-group">
              <label className="block font-medium text-[#232360]">Description</label>
              <input
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333]  font-semibold"
                type="text"
                defaultValue="high tech company"
              />
            </div>
  
            <div className="form-group">
              <label className="block font-medium text-[#232360]">Street</label>
              <input
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333]  font-semibold"
                type="text"
                defaultValue="kooriyad"
              />
            </div>
  
            <div className="form-group">
              <label className="block font-medium text-[#232360]">City</label>
              <input
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333]  font-semibold"
                type="text"
                defaultValue="tgdi"
              />
            </div>
  
            <div className="form-group">
              <label className="block font-medium text-[#232360]">State</label>
              <input
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333]  font-semibold"
                type="text"
                defaultValue="kerala"
              />
            </div>
  
            <div className="form-group">
              <label className="block font-medium text-[#232360]">Country</label>
              <input
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333]  font-semibold"
                type="text"
                defaultValue="india"
              />
            </div>
  
            <div className="form-group">
              <label className="block font-medium text-[#232360]">Zipcode</label>
              <input
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333]  font-semibold"
                type="text"
                defaultValue="676306"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardOrg;
  