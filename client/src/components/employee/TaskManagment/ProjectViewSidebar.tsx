/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IProject } from "../../../interface/IprojectDetails";
import { fetchEmployeesProject } from "../../../api/projectApi";
import { fetchEmployeesByIds } from "../../../api/employeeApi";
import ProjectSidebar from "../../../shared/components/ProjectSidebar";

const ProjectViewSidebar = ({
  setSelectedProject,
}: {
  setSelectedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const organizationId = useSelector(
    (state: RootState) => state.user?.user?.organizationId
  );
  const { user } = useSelector((state: RootState) => state.user);
  const [activeProject, setActiveProject] = useState<string>("");

  const isInitialLoad = useRef(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await fetchEmployeesProject(organizationId, user?._id);
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

            const projectsWithEmployeeData = projectData.map(
              (project: any) => ({
                ...project,
                members: project.members.map(
                  (memberId: string) =>
                    employeeMap.get(memberId) || { _id: memberId }
                ),
                manager: employeeMap.get(project.manager) || {
                  _id: project.manager,
                },
              })
            );

            setProjects(projectsWithEmployeeData);

            if (isInitialLoad.current && projectsWithEmployeeData.length > 0) {
              const firstProject = projectsWithEmployeeData[0];
              setActiveProject(firstProject.projectName);
              setSelectedProject(firstProject);
              isInitialLoad.current = false;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
      setLoading(false);
    };

    fetchEmployees();
  }, [organizationId, setSelectedProject, user?._id]);

  return (
    <ProjectSidebar
      items={projects}
      selectedItem={projects.length > 0 ? projects[0] : null}
      setSelectedItem={setSelectedProject}
      setActiveProject={setActiveProject}
      activeProject={activeProject}
      loading={loading}
      searchPlaceholder="Search Projects..."
      title="My Projects"
    />
  );
};

export default ProjectViewSidebar;
