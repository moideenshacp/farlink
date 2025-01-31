/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { fetchEmployeesByIds } from "../../../api/employeeApi";
import { fetchTasks } from "../../../api/taskApi";
import { ITaskDetails } from "../../../interface/ItaskDetails";
import AssignTaskDrawer from "./AssignTaskDrawer";
import { IProject } from "../../../interface/IprojectDetails";
import TaskTable from "../../../shared/components/TaskTable";

interface TaskViewTableProps {
  project: IProject;
  refreshKey: any;
}

const TaskViewTable: React.FC<
  TaskViewTableProps & { statusFilter?: string }
> = ({ project, statusFilter, refreshKey }) => {
  const [tasks, setTasks] = useState<ITaskDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITaskDetails | null>(null);

  const fetchAllTasks = async () => {
    setIsLoading(true);
    try {
      const res = await fetchTasks(project._id);
      if (res.data.result) {
        let projectData = res.data.result;
        if (statusFilter) {
          projectData = projectData.filter(
            (task: ITaskDetails) => task.status === statusFilter
          );
        }
        const allEmployeeIds = [
          ...new Set(
            projectData.flatMap((project: any) => [...project.members])
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
              (memberId: string) =>
                employeeMap.get(memberId) || { _id: memberId }
            ),
          }));

          setTasks(projectsWithEmployeeData);
        }
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (project._id) {
      fetchAllTasks();
    } else {
      setTasks([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project._id, statusFilter, refreshKey]);

  return (
    <div className="w-[650px] bg-white rounded-lg shadow-sm">
      <AssignTaskDrawer
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedTask(null);
        }}
        project={project}
        editTask={selectedTask}
        onSuccess={fetchAllTasks}
      />
      <TaskTable
        tasks={tasks}
        isLoading={isLoading}
        columns={[
          "taskName",
          "startDate",
          "endDate",
          "status",
          "priority",
          "assignees",
        ]}
        onEdit={(task) => {
          setSelectedTask(task);
          setIsDrawerOpen(true);
        }}
      />
    </div>
  );
};

export default TaskViewTable;
