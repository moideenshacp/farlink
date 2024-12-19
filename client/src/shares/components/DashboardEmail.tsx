import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const DashboardEmail = () => {

  const {user} = useSelector((state:RootState)=>state.user)
  return (
    <div>
      <div>
        <div className="mt-5">
          {/* <button className="bg-white border-2 border-[#D9DADE] py-2 px-6 rounded-xl">
            Cancel
          </button>
          <button className="bg-[#4361EE] py-2 px-6 rounded-xl text-white">
            Save
          </button> */}
        </div>
        <h4 className="font-semibold text-[#232360]">Email</h4>
        <input
          className="w-1/3 p-2 border mt-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
          type="text"
          placeholder="enter your email"
          defaultValue={user?.email}
        />
        <br />
        <button className="bg-[#4361EE] py-2 mt-5 px-6 rounded-xl text-white">
          Change Email
        </button>
        {/* Add email-related fields */}
      </div>
    </div>
  );
};

export default DashboardEmail;
