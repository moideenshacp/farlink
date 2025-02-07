import { useEffect, useState } from "react";
import Sidebar from "./ProjectViewSidebar";
import ProjectDetails from "./ProjectDetails";
import { IProject } from "../../../interface/IprojectDetails";
import StatCard from "../../../shared/components/StatsCard";
import { FaTasks } from "react-icons/fa";
import { fetchTasks } from "../../../api/taskApi";
import { ITaskDetails } from "../../../interface/ItaskDetails";

const TaskSummary = () => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [allTasks, setAllTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  const fetchAllTasks = async () => {
    try {
      const res = await fetchTasks(selectedProject?._id);
      const task = res.data.result;
      setAllTasks(task.length);

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
  const progress = allTasks > 0 ? Math.round((completedTasks / allTasks) * 100) : 0;

  useEffect(() => {
    fetchAllTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedProject]);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 overflow-auto h-full">
        <Sidebar setSelectedProject={setSelectedProject}  />
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
