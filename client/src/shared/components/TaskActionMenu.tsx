/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Pencil } from "lucide-react";
import { PiSplitHorizontalLight } from "react-icons/pi";
import { AiOutlineFolderView } from "react-icons/ai";
import { fetchAllSubTasksOfTask } from "../../api/taskApi";
import { useEffect, useState } from "react";
import { fetchEmployeesByIds } from "../../api/employeeApi";
const TaskActionMenu: React.FC<any> = ({
  task,
  project,
  user,
  handleEdit,
  handleAddSubtask,
  handleViewSubtasks
}) => {
  const menuItems = [];
  const [subTasks, setSubtasks] = useState<any>([]);

  const fetchAllSubTasks = async () => {
    try {
      const res = await fetchAllSubTasksOfTask(task._id);
      if (!res.data.result) {
        return;
      }
  
      const taskData = res.data.result;  
      const allMemberIds = [...new Set(taskData.map((subtask: any) => subtask.members))];  
      if (allMemberIds.length === 0) {
        setSubtasks(taskData);
        return;
      }
        const employeeRes = await fetchEmployeesByIds(allMemberIds);
      if (!employeeRes?.data) {
        return;
      }
            
      const employeeMap = new Map(
        employeeRes.data.employees.map((employee: any) => [employee._id, employee])
      );  
      const subTaskWithEmployeeData = taskData.map((subtask: any) => ({
        ...subtask,
        members: employeeMap.get(subtask.members) || { _id: subtask.members },
      }));
        
      setSubtasks(subTaskWithEmployeeData);
    } catch (error) {
      console.error("Error fetching subtasks:", error);
    }
  };
  
  
  useEffect(()=>{
    fetchAllSubTasks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[task])

  if (
    project
      ? user?.email === project?.manager.email || user?.role === "admin"
      : true
  ) {
    menuItems.push(
      {
        key: "edit",
        label: (
          <div className="flex items-center">
            <Pencil className="w-4 h-4 mr-2 text-[#1677ff]" />
            Edit Task
          </div>
        ),
        onClick: () => handleEdit(task),
      },
      {
        key: "add-subtask",
        label: (
          <div className="flex items-center">
            <PiSplitHorizontalLight className="w-4 h-4 mr-2 text-[#1677ff]" />
            Add Sub-Task
          </div>
        ),
        onClick: () => handleAddSubtask(task),
      }
    );
    if (subTasks.length > 0) {
      menuItems.push({
        key: "view-subtask",
        label: (
          <div className="flex items-center">
            <AiOutlineFolderView className="w-4 h-4 mr-2 text-[#1677ff]" />
            View Sub-Tasks
          </div>
        ),
        onClick: () => handleViewSubtasks(task,subTasks),
      });
    }
  }

  

  if (task.file) {
    menuItems.push({
      key: "download",
      label: (
        <a
          href={`${task.file}?fl_attachment=true`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          Download Resource
        </a>
      ),
    });
  }

  const menu = <Menu items={menuItems} />;

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomCenter">
      <button className="hover:bg-gray-100 rounded-full p-1">
        <MoreOutlined className="text-gray-500" />
      </button>
    </Dropdown>
  );
};

export default TaskActionMenu;
