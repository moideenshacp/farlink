import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import DashboardAllEmployees from "./DashboardAllEmployees";
import { addPosition, fetchPositions } from "../../../api/employeeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast, ToastContainer } from "react-toastify";

const Myteam = () => {
  const {user} = useSelector((state:RootState)=>state.user)
  const [teams, setTeams] = useState([]); 
  const [newTeam, setNewTeam] = useState("");


  
  const refreshPositions = async()=>{
    try {
      const res = await fetchPositions(user?.organizationId)
      setTeams(res.data.result.positions)
    } catch (error) {
      console.log(error);
      
    }
  }
  const addTeam = async () => {
    try {
      if(!newTeam.trim()){
        toast.error("Please Add a valid position")
      }
      if (newTeam.trim()) {
        const res = await addPosition(user?.organizationId, newTeam.trim().toLocaleUpperCase());
        console.log("res from position", res);
        if(res.data.message === "Position added successfully"){

          toast.success("Team added successfully!");
          setNewTeam("")
          refreshPositions()
        }

      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(()=>{
    const fetchAllPositions = async()=>{
      try {
        const res = await fetchPositions(user?.organizationId)

        console.log(res.data.result.positions,"All positions")
        setTeams(res.data.result.positions)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchAllPositions()
  },[user?.organizationId])


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {/* Dropdown */}
          <div className="relative">
            <select className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded shadow focus:outline-none focus:shadow-outline">
              <option value="" disabled selected>
                My Teams
              </option>
              {teams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>

          {/* Add Team Input and Button */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
              placeholder="Enter new team name"
              className="border border-gray-300 py-2 px-4 rounded shadow focus:outline-none"
            />
            <button
              onClick={addTeam}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Add Position
            </button>
          </div>
        </div>

        {/* Add Employee Button */}
        <AddEmployee />
      </div>

      {/* Employee Dashboard */}
      <DashboardAllEmployees />
      <ToastContainer/>
    </div>
  );
};

export default Myteam;
