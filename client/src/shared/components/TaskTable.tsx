/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpDown,
  Pencil,
} from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { ITaskDetails } from "../../interface/ItaskDetails";
import { IProject } from "../../interface/IprojectDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { message, Select } from "antd";
import { CheckCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { updateTask } from "../../api/taskApi";
import { useState } from "react";

type Status = "Completed" | "In Progress" | "Pending";

interface TaskTableProps {
  tasks: ITaskDetails[];
  isLoading: boolean;
  columns?: string[];
  project?: IProject;
  onEdit?: (task: ITaskDetails) => void;
}

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  isLoading,
  columns,
  onEdit,
  project,
}) => {
  const handleEdit = (task: ITaskDetails) => {
    onEdit?.(task);
  };
  const { user } = useSelector((state: RootState) => state.user);
  const [taskStatus, setTaskStatus] = useState<Record<string, Status>>({});
  const { Option } = Select;

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
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <FaSpinner className="w-8 h-8 text-[#1677ff] animate-spin" />
      </div>
    );
  }
  const handleStatus = async (task: ITaskDetails, newStatus: Status) => {
    try {
      const updatedTask = { ...task, status: newStatus };

      const response = await updateTask(task._id, updatedTask);

      if (response.data.message === "Task updated sucessfully..") {
        message.success("Status updated successfully");
        setTaskStatus((prevStatus) => ({
          ...prevStatus,
          [task._id as string]: newStatus,
        }));
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="pt-3">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            {columns?.includes("taskName") && (
              <th className="py-3 whitespace-nowrap px-4 text-left font-semibold text-[#232360]">
                Task Name <ArrowUpDown className="w-4 h-4 inline" />
              </th>
            )}
            {columns?.includes("startDate") && (
              <th className="py-3 whitespace-nowrap px-4 text-left font-semibold text-[#232360]">
                Start Date
              </th>
            )}
            {columns?.includes("endDate") && (
              <th className="py-3 px-4 whitespace-nowrap text-left font-semibold text-[#232360]">
                End Date
              </th>
            )}
            {columns?.includes("status") && (
              <th className="py-3 px-4 text-left font-semibold text-[#232360]">
                Status
              </th>
            )}
            {columns?.includes("priority") && (
              <th className="py-3 px-4 text-left font-semibold text-[#232360]">
                Priority
              </th>
            )}
            {columns?.includes("assignees") && (
              <th className="py-3 px-4 text-left font-semibold text-[#232360]">
                Assignees
              </th>
            )}
            <th className="py-3 px-4 text-left font-semibold text-[#232360]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task._id} className="border-b hover:bg-gray-50">
                {columns?.includes("taskName") && (
                  <td className="py-3 px-4 text-[#1677ff] font-medium">
                    {task.taskName}
                  </td>
                )}
                {columns?.includes("startDate") && (
                  <td className="py-3 px-4">{formatDate(task.startDate)}</td>
                )}
                {columns?.includes("endDate") && (
                  <td className="py-3 px-4">{formatDate(task.endDate)}</td>
                )}
                {columns?.includes("status") && (
                  <td className="py-3 px-4">
                    <div className="flex items-center whitespace-nowrap gap-2">
                      {getStatusIcon(
                        taskStatus[task._id as string] ||
                          (task.status as Status)
                      )}
                      <span
                        className={
                          (
                            taskStatus[task._id as string] || task.status
                          ).toLowerCase() === "completed"
                            ? "text-green-600"
                            : (
                                taskStatus[task._id as string] || task.status
                              ).toLowerCase() === "in_progress"
                            ? "text-[#1677ff]"
                            : "text-yellow-600"
                        }
                      >
                        {taskStatus[task._id as string] || task.status}
                      </span>
                    </div>
                  </td>
                )}
                {columns?.includes("priority") && (
                  <td className="py-3 px-4">
                    <span
                      className={`${
                        priorityColors[task.priority.toLowerCase()]
                      } px-2 py-1 rounded-full text-xs font-medium`}
                    >
                      {task.priority}
                    </span>
                  </td>
                )}
                {columns?.includes("assignees") && (
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-2">
                      {task.members.map((member: any) => (
                        <div
                          key={member._id}
                          className="flex items-center gap-2"
                        >
                          <div className="w-8 h-8  rounded-full overflow-hidden bg-gray-200">
                            <img
                              src={member.image || "/api/placeholder/32/32"}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-[#1677ff]">{`${member.firstName} ${member.lastName}`}</div>
                            <div className="text-sm text-[#232360]">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                )}
                <td className="py-3 px-4">
                  {project ? (
                    user?.email === project?.manager.email ? (
                      <button
                        onClick={() => handleEdit(task)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      >
                        <Pencil className="w-4 h-4 text-[#1677ff] hover:text-[#1677ff]" />
                      </button>
                    ) : (
                      <div>
                        {task.file && (
                          <div>
                            <a
                              href={`${task.file}?fl_attachment=true`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Download Resource
                            </a>
                            <div className="border-b-2 mt-2 mb-2"></div>
                          </div>
                        )}
                        <Select
                          value={taskStatus[task._id as string] || task.status}
                          onChange={(value) =>
                            handleStatus(task, value as Status)
                          }
                          className="w-32"
                          placeholder="Update Status"
                        >
                          <Option value="in_progress">
                            <span className="flex items-center gap-2">
                              <PlayCircleOutlined
                                style={{ color: "#1890ff" }}
                              />
                              In Progress
                            </span>
                          </Option>
                          <Option value="completed">
                            <span className="flex items-center gap-2">
                              <CheckCircleOutlined
                                style={{ color: "#52c41a" }}
                              />
                              Completed
                            </span>
                          </Option>
                        </Select>
                      </div>
                    )
                  ) : (
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      <Pencil className="w-4 h-4 text-[#1677ff] hover:text-[#1677ff]" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
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
  );
};

export default TaskTable;
