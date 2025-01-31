/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { fetchEmployeesProject } from "../../../api/projectApi";
import { useEffect, useState } from "react";
import { IProject } from "../../../interface/IprojectDetails";
import { fetchEmployeesByIds } from "../../../api/employeeApi";
import ProjectViewCard from "../../../shared/components/ProjectViewCard";
import ViewProjectDetail from "./ViewProjectDetail";

const Myproject = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);

  const fetchAllProjects = async () => {
    try {
      const res = await fetchEmployeesProject(user?.organizationId, user?._id);
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
  const openDrawerWithProject = (project: IProject) => {
    setSelectedProject(project);
    const drawerCheckbox = document.getElementById(
      "my-drawer-4"
    ) as HTMLInputElement;
    if (drawerCheckbox) drawerCheckbox.checked = true;
  };
  useEffect(() => {
    const drawerCheckbox = document.getElementById(
      "my-drawer-4"
    ) as HTMLInputElement;
    const handleDrawerClose = () => {
      if (!drawerCheckbox?.checked) {
        setSelectedProject(null);
      }
    };

    drawerCheckbox?.addEventListener("change", handleDrawerClose);
    return () => {
      drawerCheckbox?.removeEventListener("change", handleDrawerClose);
    };
  }, []);
  useEffect(() => {
    if (user?.organizationId) {
      fetchAllProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.organizationId]);
  return (
    <div>
      <div className="drawer drawer-end ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        {/* Include Sidebar component */}

        <ViewProjectDetail project={selectedProject}/>
      </div>

      <div className="mt-3 gap-5">
        <ProjectViewCard
          projects={projects}
          isLoading={isLoading}
          onProjectClick={openDrawerWithProject}
        />
      </div>
    </div>
  );
};

export default Myproject;
