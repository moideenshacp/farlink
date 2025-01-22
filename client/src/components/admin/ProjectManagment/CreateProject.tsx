import CreateProjectForm from "./CreateProjectForm";

const CreateProject = () => {
  return (
    <div>
      CreateProject
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="flex justify-end">
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-4"
              className="btn text font-semibold text-white hover:bg-[#4361EE] bg-[#4361EE] flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create New Project
            </label>
          </div>
        </div>
        {/* Include Sidebar component */}
        <CreateProjectForm />
      </div>
    </div>
  );
};

export default CreateProject;
