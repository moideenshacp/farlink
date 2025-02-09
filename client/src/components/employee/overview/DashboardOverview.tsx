import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import StatCard from "../../../shared/components/StatsCard";
import { fetchEmployeesProject } from "../../../api/projectApi";
import { IProject } from "../../../interface/IprojectDetails";
import {  FaProjectDiagram, FaCheckCircle } from "react-icons/fa";
import { fetchAllTasksOfEmployee } from "../../../api/taskApi";
import { ITaskDetails } from "../../../interface/ItaskDetails";
import { GrTasks } from "react-icons/gr";
import { DashboardChart } from "./DashBoardChart";
const DashboardOverview = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [allProjects, setAllProjects] = useState(0);
  const [allTasks, setAllTasks] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [tasks, setTasks] = useState<ITaskDetails[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetchEmployeesProject(user?.organizationId,user?._id);
      const project = res.data.result;
      if (project) {
        setAllProjects(project.length);
        setProjects(project)
        const completedProjects = project.filter(
          (p: IProject) => p.status === "completed"
        );
        setCompletedProjects(completedProjects.length);
      }
    };
    fetchProject();
  }, [user?._id,user?.organizationId]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetchAllTasksOfEmployee(user?._id);
      const tasks = res.data.result;
      if (tasks) {
        setAllTasks(tasks.length);
        setTasks(tasks)
        const completedTasks = tasks.filter(
          (t: ITaskDetails) => t.status === "completed"
        );
        setCompletedTasks(completedTasks.length);
        
      }
    };
    fetchTasks();
  }, [user?._id]);
  
  const stats = [


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
    {
      title: "Total Tasks",
      value: allTasks,
      icon: <GrTasks size={20} color="#4361EE" />,
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
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
      <div className="mt-5" >

      <DashboardChart projects={projects} tasks={tasks} />
      </div>
    </div>
  );
  
  
};

export default DashboardOverview;
