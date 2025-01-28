import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import DashboardAllEmployees from "./DashboardAllEmployees";
import { addPosition, fetchPositions } from "../../../api/employeeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Input from "../../../shared/components/Input";
import { message } from "antd";

const Myteam = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const refreshPositions = async () => {
    try {
      const res = await fetchPositions(user?.organizationId);
      setTeams(res.data.result.positions);
    } catch (error) {
      console.log(error);
    }
  };
  const addTeam = async () => {
    try {
      if (!newTeam.trim()) {
        message.error("Please Add a valid position", 2);
      }
      if (newTeam.trim()) {
        const res = await addPosition(
          user?.organizationId,
          newTeam.trim().toLocaleUpperCase()
        );
        console.log("res from position", res);
        if (res.data.message === "Position added successfully") {
          message.success("Team added successfully!", 2);
          setNewTeam("");
          refreshPositions();
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message, 2);
      } else {
        message.error("An unexpected error occurred. Please try again.", 2);
      }
    }
  };

  useEffect(() => {
    const fetchAllPositions = async () => {
      try {
        const res = await fetchPositions(user?.organizationId);

        console.log(res.data.result.positions, "All positions");
        setTeams(res.data.result.positions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPositions();
  }, [user?.organizationId]);

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* Dropdown */}
          <div className="relative w-full md:w-auto">
            <select
              className="block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded shadow focus:outline-none focus:shadow-outline"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="" disabled selected>
                All positions
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
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <Input
              type="text"
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
              placeholder="Enter new team name"
              className="border lg:mt-2 border-gray-300 py-2 px-4 rounded shadow focus:outline-none w-full md:w-auto"
            />
            <button
              onClick={addTeam}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 w-full md:w-auto"
            >
              Add Position
            </button>
          </div>
        </div>

        {/* Add Employee Button */}
        <div className="w-full md:w-auto">
          <AddEmployee />
        </div>
      </div>

      {/* Employee Dashboard */}
      <DashboardAllEmployees selectedPosition={selectedPosition} />
    </div>
  );
};

export default Myteam;
