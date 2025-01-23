import CreateProjectForm from "./CreateProjectForm";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import ProjectViewCard from "./ProjectViewCard";

const CreateProject = () => {
  return (
    <div>
      <div className="drawer drawer-end ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="flex mt-3 justify-end">
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-4"
              className="btn  text font-semibold z-10 text-white hover:bg-[#4361EE] bg-[#4361EE] flex items-center justify-center gap-2"
            >
              <VscGitPullRequestCreate size={16} />
              Create New Project
            </label>
          </div>
        </div>
        {/* Include Sidebar component */}

        <CreateProjectForm />
      </div>
      <div className="mt-3 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
        <ProjectViewCard />
        <ProjectViewCard />
        <ProjectViewCard />
        <ProjectViewCard />
        <ProjectViewCard />
        <ProjectViewCard />
        <ProjectViewCard />
      </div>
    </div>
  );
};

export default CreateProject;
