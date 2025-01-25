/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateProjectForm from "./CreateProjectForm";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import ProjectViewCard from "../../../shared/components/ProjectViewCard";
import { IProject } from "../../../interface/IprojectDetails";
import { useEffect, useState } from "react";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { fetchProjects } from "../../../api/projectApi";
import { fetchEmployeesByIds } from "../../../api/employeeApi";

const CreateProject = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);
  const fetchAllProjects = async () => {
    try {
      const res = await fetchProjects(user?.organizationId);
      if (res.data.result) {
        const projectData = res.data.result;
        const allEmployeeIds = [
          ...new Set(
            projectData.flatMap((project: any) => [
              ...project.members,
              project.manager,
            ])
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

          // Map employee details back to projects
          const projectsWithEmployeeData = projectData.map((project: any) => ({
            ...project,
            members: project.members.map(
              (memberId: string) =>
                employeeMap.get(memberId) || { _id: memberId }
            ),
            manager: employeeMap.get(project.manager) || {
              _id: project.manager,
            },
          }));

          setProjects(projectsWithEmployeeData);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching projects:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.organizationId) {
      fetchAllProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.organizationId]);
  console.log("all projectsss", projects);

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

        <CreateProjectForm fetchAllProjects={fetchAllProjects} />
      </div>
      <div className="mt-3 gap-5">
        <ProjectViewCard projects={projects} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CreateProject;
