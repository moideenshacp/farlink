/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Pencil } from 'lucide-react'; 
import { PiSplitHorizontalLight } from 'react-icons/pi'
import { AiOutlineFolderView } from 'react-icons/ai';
const TaskActionMenu :React.FC<any>= ({ task, project, user, handleEdit, handleAddSubtask }) => {
  const menuItems = [];

  if (project ? (user?.email === project?.manager.email || user?.role === "admin") : true) {
    menuItems.push(
      {
        key: 'edit',
        label: (
          <div className="flex items-center">
            <Pencil className="w-4 h-4 mr-2 text-[#1677ff]" />
            Edit Task
          </div>
        ),
        onClick: () => handleEdit(task)
      },
      {
        key: 'add-subtask',
        label: (
          <div className="flex items-center">
            <PiSplitHorizontalLight className="w-4 h-4 mr-2 text-[#1677ff]" />
            Add Sub-Task
          </div>
        ),
        onClick: () => handleAddSubtask(task)
      },
      {
        key: 'view-subtask',
        label: (
          <div className="flex items-center">
            <AiOutlineFolderView  className="w-4 h-4 mr-2 text-[#1677ff]" />
            View Sub-Task
          </div>
        ),
        onClick: () => handleAddSubtask(task)
      }
    );
  }

  if (task.file) {
    menuItems.push({
      key: 'download',
      label: (
        <a 
          href={`${task.file}?fl_attachment=true`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center"
        >
          Download Resource
        </a>
      )
    });
  }

  const menu = <Menu items={menuItems} />;

  return (
    <Dropdown 
  overlay={menu} 
  trigger={['click']}
  placement="bottomCenter"
>
  <button className="hover:bg-gray-100 rounded-full p-1">
    <MoreOutlined className="text-gray-500" />
  </button>
</Dropdown>
  );
};

export default TaskActionMenu;