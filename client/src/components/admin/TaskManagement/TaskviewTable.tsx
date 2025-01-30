/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpDown,
  Pencil,
} from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { fetchEmployeesByIds } from "../../../api/employeeApi";
import { fetchTasks } from "../../../api/taskApi";
import { ITaskDetails } from "../../../interface/ItaskDetails";

type Priority = "High" | "Medium" | "Low";
type Status = "Completed" | "In Progress" | "Pending";

interface TaskViewTableProps {
  project_id: string;
}

const TaskViewTable: React.FC<TaskViewTableProps> = ({ project_id }) => {
  const [tasks, setTasks] = useState<ITaskDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllTasks = async () => {
    setIsLoading(true);
    try {
      const res = await fetchTasks(project_id);
      if (res.data.result) {
        const projectData = res.data.result;
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
    if (project_id) {
      fetchAllTasks();
    } else {
      setTasks([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project_id]);

  const handleEdit = (taskId: string | undefined) => {
    console.log("Editing task:", taskId);
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString();
    } catch (error) {
      console.log(error);

      return "Invalid Date";
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "in progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const priorityColors: Record<string, string> = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  const getPriorityBadge = (priority: Priority) => {
    const className = priorityColors[priority.toLowerCase()];
    return (
      <span
        className={`${className} px-2 py-1 rounded-full text-xs font-medium`}
      >
        {priority}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <FaSpinner className="w-8 h-8 text-[#1677ff] animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-[650px] bg-white rounded-lg shadow-sm">
      <div className="pt-3">
        <div className="">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-semibold text-[#232360]">
                  <div className="flex whitespace-nowrap items-center gap-1 cursor-pointer">
                    Task Name
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="py-3 px-4 whitespace-nowrap text-left font-semibold text-[#232360]">
                  Start Date
                </th>
                <th className="py-3 px-4 text-left font-semibold text-[#232360]">
                  End Date
                </th>
                <th className="py-3 px-4 text-left font-semibold text-[#232360]">
                  Status
                </th>
                <th className="py-3 px-4 text-left font-semibold text-[#232360]">
                  Priority
                </th>
                <th className="py-3 px-4 text-left font-semibold text-[#232360]">
                  Assignees
                </th>
                <th className="py-3 px-4 text-left font-semibold text-[#232360]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap text-[#1677ff] font-medium">
                    {task.taskName}
                  </td>
                  <td className="py-3 text-[#1677ff] px-4">
                    {formatDate(task.startDate)}
                  </td>
                  <td className="py-3 text-[#1677ff] px-4">
                    {formatDate(task.endDate)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center whitespace-nowrap gap-2">
                      {getStatusIcon(task.status as Status)}
                      <span
                        className={
                          task.status.toLowerCase() === "completed"
                            ? "text-green-600"
                            : task.status.toLowerCase() === "in progress"
                            ? "text-blue-600"
                            : "text-yellow-600"
                        }
                      >
                        {task.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getPriorityBadge(task.priority as Priority)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-2">
                      {task.members.map((member: any) => (
                        <div
                          key={member._id}
                          className="flex items-center gap-2"
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                            <img
                              src={member.image || "/api/placeholder/32/32"}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-[#1677ff]">
                              {member.firstName}
                            </div>
                            <div className="text-sm text-[#232360]">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(task._id)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      <Pencil className="w-4 h-4 text-[#1677ff] hover:text-[#1677ff]" />
                    </button>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <h2 className="text-gray-500 text-sm font-medium text-center pt-6">
                      No tasks Found
                    </h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskViewTable;
