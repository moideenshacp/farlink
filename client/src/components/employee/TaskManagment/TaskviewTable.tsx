/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { fetchEmployeesByIds } from "../../../api/employeeApi";
import { fetchEmployeesTask, fetchTasks } from "../../../api/taskApi";
import { ITaskDetails } from "../../../interface/ItaskDetails";
import { IProject } from "../../../interface/IprojectDetails";
import TaskTable from "../../../shared/components/TaskTable";
import AssignTaskDrawer from "../../admin/TaskManagement/AssignTaskDrawer";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Pagination } from "antd";

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
  const { user } = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;
  const fetchAllTasks = async () => {
    setIsLoading(true);
    try {
      let res;
      if (user?.email === project.manager.email || user?.position === "HR") {
        res = await fetchTasks(project._id);
      } else {
        res = await fetchEmployeesTask(project._id, user?._id);
      }
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

        let employeeRes;
        if (user?.email === project.manager.email) {
          employeeRes = await fetchEmployeesByIds(allEmployeeIds);
        } else {
          employeeRes = await fetchEmployeesByIds(user?._id);
        }

        if (employeeRes.data) {
          const employeeMap = new Map(
            employeeRes.data.employees.map((employee: any) => [
              employee._id,
              employee,
            ])
          );
          let projectsWithEmployeeData;
          if (user?.email === project.manager.email) {
            projectsWithEmployeeData = projectData.map((project: any) => ({
              ...project,
              members: project.members.map(
                (memberId: string) =>
                  employeeMap.get(memberId) || { _id: memberId }
              ),
            }));
          } else {
            projectsWithEmployeeData = projectData.map((project: any) => ({
              ...project,
              members:
                user?.email === project?.manager?.email
                  ? project.members.map(
                      (memberId: string) =>
                        employeeMap.get(memberId) || { _id: memberId }
                    )
                  : [employeeMap.get(user?._id) || { _id: user?._id }],
            }));
          }
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
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className="w-[650px] bg-white rounded-lg shadow-sm">
      {(user?.email === project.manager.email || user?.position === "HR") && (
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
      )}
      <TaskTable
        tasks={paginatedTasks}
        isLoading={isLoading}
        columns={[
          "taskName",
          "startDate",
          "endDate",
          "status",
          "priority",
          "assignee",
        ]}
        onEdit={(task) => {
          setSelectedTask(task);
          setIsDrawerOpen(true);
        }}
        project={project}
      />
      {tasks.length > pageSize && (
        <div className="mt-10 flex">
          <Pagination
            current={currentPage}
            total={tasks.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            simple={{ readOnly: true }}
          />
        </div>
      )}
    </div>
  );
};

export default TaskViewTable;
