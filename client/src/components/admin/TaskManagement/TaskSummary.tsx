import Sidebar from "./ProjectViewSidebar";

const TaskSummary = () => {



  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 overflow-auto h-full">
        <Sidebar />
      </div>

      {/* Table Container */}
      <div className="flex-1 p-4 overflow-auto  scrollbar-none"></div>
    </div>
  );
};

export default TaskSummary;
