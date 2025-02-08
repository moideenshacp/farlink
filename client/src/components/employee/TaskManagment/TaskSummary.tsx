import { useEffect, useState } from "react";
import { IProject } from "../../../interface/IprojectDetails";
import StatCard from "../../../shared/components/StatsCard";
import { FaTasks } from "react-icons/fa";
import { fetchEmployeesTask, fetchTasks } from "../../../api/taskApi";
import { ITaskDetails } from "../../../interface/ItaskDetails";
import ProjectViewSidebar from "./ProjectViewSidebar";
import ProjectDetails from "./ProjectDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const TaskSummary = () => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [allTasks, setAllTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [completedProjectTasks, setProjectCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [projectAllTasks, setProjectAllTasks] = useState(0);
  const {user} = useSelector((state:RootState)=>state.user)
  console.log("inter psoition",user?.position);
  
  const fetchAllTasks = async () => {
    try {
      let res
      if(selectedProject?.manager.email === user?.email || user?.position ==="HR"){
        console.log("heerre");
        
        res = await fetchTasks(selectedProject?._id);
      }else{
        console.log("not   heerre");

        res = await fetchEmployeesTask(selectedProject?._id,user?._id);
      }
      const task = res.data.result;
      setAllTasks(task.length);

      const projectTasks = await fetchTasks(selectedProject?._id)
      console.log("project tasks",projectTasks);
      
      setProjectAllTasks(projectTasks.data.result.length)
      const projectCompletedTasks = projectTasks.data.result.filter(
        (t: ITaskDetails) => t.status === "completed"
      );
      setProjectCompletedTasks(projectCompletedTasks.length)
      const completedTasks = task.filter(
        (t: ITaskDetails) => t.status === "completed"
      );
      setCompletedTasks(completedTasks.length);
      const inProgressTasks = task.filter(
        (t: ITaskDetails) => t.status === "in_progress"
      );
      setPendingTasks(inProgressTasks.length);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("project all taaks",projectAllTasks);
  
  const progress =
  projectAllTasks > 0 ? Math.round((completedProjectTasks / projectAllTasks) * 100) : 0;

  useEffect(() => {
    fetchAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 overflow-auto h-full">
        <ProjectViewSidebar setSelectedProject={setSelectedProject} />
      </div>

      {/* Project Details Section */}
      <div className="flex-1">
        {selectedProject ? (
          <div className="flex justify-between items-start">
            {/* Project Details on the Left */}
            <div className="flex-1 -ml-8">
              <ProjectDetails project={selectedProject} progress={progress} />
            </div>

            <div className="space-y-8">
              <StatCard
                title="Total Tasks"
                value={allTasks}
                color="text-[#4361EE]"
                icon={<FaTasks className="text-[#4361EE]" />}
              />
              <StatCard
                title="Completed Tasks"
                value={completedTasks}
                color="text-green-500"
                icon={<FaTasks className="text-green-500" />}
              />
              <StatCard
                title="Pending Tasks"
                value={pendingTasks}
                color="text-red-500"
                icon={<FaTasks className="text-red-500" />}
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500"></p>
          //   <p className="text-gray-500">Select a project to see details.</p>
        )}
      </div>
    </div>
  );
};

export default TaskSummary;
