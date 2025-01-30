import { useState } from "react";
import Sidebar from "./ProjectViewSidebar";
import ProjectDetails from "./ProjectDetails";
import { IProject } from "../../../interface/IprojectDetails";
import StatCard from "../../../shared/components/StatsCard";
import { FaTasks } from "react-icons/fa";

const TaskSummary = () => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 overflow-auto h-full">
        <Sidebar setSelectedProject={setSelectedProject} />
      </div>

      {/* Project Details Section */}
      <div className="flex-1">
        {selectedProject ? (
          <div className="flex justify-between items-start">
            {/* Project Details on the Left */}
            <div className="flex-1 -ml-8">
              <ProjectDetails project={selectedProject} />
            </div>
            
            <div className="space-y-5">
            <StatCard
              title="Total Tasks"
              value={120}
              color="text-[#4361EE]"
              icon={<FaTasks className="text-[#4361EE]" />}
            />
            <StatCard
              title="Completed Tasks"
              value={100}
              color="text-green-500"
              icon={<FaTasks className="text-green-500" />}
            />
            <StatCard
              title="Pending Tasks"
              value={20}
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
