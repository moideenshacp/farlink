import React, { useEffect, useRef, useState } from "react";
import { IEmployee } from "../../../interface/IemployeeDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getAllEmployees } from "../../../api/employeeApi";
import Input from "../../../shared/components/Input";
interface SidebarProps {
  onSelectEmail: (email: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectEmail }) => {
  const [employeees, setEmployeees] = useState<IEmployee[]>([]);
  const [activeMember, setActiveMember] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEmployees, setFilteredEmployees] = useState<IEmployee[]>([]);
  const organizationId = useSelector(
    (state: RootState) => state.user?.user?.organizationId
  );
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await getAllEmployees(organizationId);
      setEmployeees(res?.data.employees);
      setFilteredEmployees(res?.data.employees);

      if (isInitialLoad.current && res?.data.employees?.length > 0) {
        const firstEmployee = res?.data.employees[0];
        setActiveMember(`${firstEmployee.firstName} ${firstEmployee.lastName}`);
        onSelectEmail(firstEmployee.email);
        isInitialLoad.current = false;
      }
    };
    fetchEmployees();
  }, [organizationId, onSelectEmail]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = employeees.filter((emp) =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredEmployees(filtered);
  }, [searchQuery, employeees]);

  return (
    <div className="w-64 border-r -ml-6 sm: -mt-0 lg:-mt-3 h-full shadow-md fixed overflow-y-auto max-h-screen scrollbar-none scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div className="flex items-center p-4">
        <Input
          type="text"
          placeholder="Search Team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border bg-white border-gray-300 rounded-md pl-8 pr-2 py-2 text-[#8C97A8] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#8C97A8"
          className="absolute top-8 left-6 w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      {/* Members List */}
      <div className="p-0">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8C97A8"
            className="size-6 ml-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
          <h2 className="text-[#8C97A8] text-sm ml-2 uppercase font-bold mb-4">
            My Team
          </h2>
        </div>
        <ul className="space-y-4">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp, index) => (
              <li
                key={index}
                className={`flex items-center px-4 font-medium py-2 rounded cursor-pointer ${
                  activeMember === `${emp.firstName} ${emp.lastName}`
                    ? "text-[#4361EE] bg-blue-50 rounded-lg border-l-4 border-[#4361EE]"
                    : "hover:bg-gray-100 text-[#0B0B0B]"
                }`}
                onClick={() => {
                  setActiveMember(`${emp.firstName} ${emp.lastName}`);
                  onSelectEmail(emp.email);
                }}
              >
                <span className="text-lg">
                  {emp?.image ? (
                    <img
                      src={emp.image}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8C97A8"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  )}
                </span>
                <span className="ml-3">{`${emp.firstName} ${emp.lastName}`}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-sm ml-10">No members found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
