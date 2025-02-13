import { useEffect, useState } from "react";
import { fetchEmployeesCount } from "../../../api/employeeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import StatCard from "../../../shared/components/StatsCard";
import { RiTeamLine } from "react-icons/ri";
import { fetchProjects } from "../../../api/projectApi";
import { IProject } from "../../../interface/IprojectDetails";
import { FaUsers, FaProjectDiagram, FaCheckCircle } from "react-icons/fa";
import { DashboardChart } from "./DashBoardChart";
const DashboardOverview = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [TerminatedEmployeesCount, SetTerminatedEmployeesCount] = useState(0);
  const [allProjects, setAllProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [allProjectsList, setAllProjectsList] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchEmployeesCount(user?.organizationId);
      if (res?.data.data) {
        setActiveEmployees(res?.data.data.ActiveEmployeesCount);
        SetTerminatedEmployeesCount(res?.data.data.TerminatedEmployeesCount);
      }
    };
    fetchData();
  }, [user?.organizationId]);
  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetchProjects(user?.organizationId);
      setAllProjectsList(res.data.result);
      const project = res.data.result;
      if (project) {
        setAllProjects(project.length);

        const completedProjects = project.filter(
          (p: IProject) => p.status === "completed"
        );
        setCompletedProjects(completedProjects.length);
      }
    };
    fetchProject();
  }, [user?.organizationId]);

  const stats = [
    {
      title: "Active Employees",
      value: activeEmployees,
      icon: <FaUsers size={20} color="#4361EE" />,
    },
    {
      title: "Ex Employees",
      value: TerminatedEmployeesCount,
      icon: <RiTeamLine size={20} color="#FF5733" />,
    },
    {
      title: "Total Projects",
      value: allProjects,
      icon: <FaProjectDiagram size={20} color="#4361EE" />,
    },
    {
      title: "Completed Projects",
      value: completedProjects,
      icon: <FaCheckCircle size={20} color="#28A745" />,
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap space-x-10 gap-y-6 justify-center sm:justify-start">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="hover:shadow-lg hover:scale-105 transition-transform"
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              color="text-[#4361EE]"
              fontSize="text-xl"
              icon={stat.icon}
            />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <DashboardChart projects={allProjectsList} />
      </div>
    </div>
  );
};

export default DashboardOverview;
