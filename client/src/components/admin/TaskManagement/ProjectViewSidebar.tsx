/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Input from "../../../shared/components/Input";
import { CiSearch } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import { IProject } from "../../../interface/IprojectDetails";
import { fetchProjects } from "../../../api/projectApi";
import { fetchEmployeesByIds } from "../../../api/employeeApi";

interface SidebarProps {
  setSelectedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
}

const Sidebar = ({ setSelectedProject }: SidebarProps) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [activeProject, setActiveProject] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const organizationId = useSelector(
    (state: RootState) => state.user?.user?.organizationId
  );
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true); 
      try {
        const res = await fetchProjects(organizationId);
        if (res.data.result) {
          const projectData = res.data.result;
          const allEmployeeIds = [
            ...new Set(
              projectData.flatMap((project: any) => [
                ...project.members,
                project.manager,
              ])
            ),
          ];
          const employeeRes = await fetchEmployeesByIds(allEmployeeIds);

          if (employeeRes.data) {
            const employeeMap = new Map(
              employeeRes.data.employees.map((employee: any) => [
                employee._id,
                employee,
              ])
            );

            const projectsWithEmployeeData = projectData.map((project: any) => ({
              ...project,
              members: project.members.map(
                (memberId: string) => employeeMap.get(memberId) || { _id: memberId }
              ),
              manager: employeeMap.get(project.manager) || {
                _id: project.manager,
              },
            }));

            setProjects(projectsWithEmployeeData);
            setFilteredProjects(projectsWithEmployeeData);

            if (isInitialLoad.current && projectsWithEmployeeData.length > 0) {
              const firstProject = projectsWithEmployeeData[0];
              setActiveProject(firstProject.projectName);
              setSelectedProject(firstProject);
              isInitialLoad.current = false;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
      setLoading(false); 
    };

    fetchEmployees();
  }, [organizationId, setSelectedProject]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = projects.filter((project) =>
      project.projectName.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  return (
    <div className="w-64 border-r -ml-6 sm: -mt-0 lg:-mt-9 h-full shadow-md fixed overflow-y-auto max-h-screen scrollbar-none scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div className="flex items-center p-4">
        <Input
          type="text"
          placeholder="Search Projects here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-md pl-8 pr-2 py-2 text-[#8C97A8] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <CiSearch className="absolute top-8 left-6 w-5 h-5" color="#8C97A8" />
      </div>

      <div className="p-0">
        <div className="flex">
          <h2 className="text-[#8C97A8] text-sm ml-4 uppercase font-bold mb-4">
            My Projects
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-4">
            <FaSpinner className="text-blue-500 animate-spin text-xl" />
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((pro, index) => (
                <li
                  key={index}
                  className={`flex items-center px-4 font-medium py-2 rounded cursor-pointer ${
                    activeProject === pro.projectName
                      ? "text-[#4361EE] bg-blue-50 rounded-lg border-l-4 border-[#4361EE]"
                      : "hover:bg-gray-100 text-[#0B0B0B]"
                  }`}
                  onClick={() => {
                    setActiveProject(pro.projectName);
                    setSelectedProject(pro);
                  }}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E3E8F4] text-[#4361EE] font-bold uppercase">
                    {pro.projectName.charAt(0)}
                  </span>
                  <span className="ml-3">{pro.projectName}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm ml-10">No Projects found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
