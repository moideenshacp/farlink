/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import CreateProjectForm from "./CreateProjectForm";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import ProjectViewCard from "../../../shared/components/ProjectViewCard";
import { IProject } from "../../../interface/IprojectDetails";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { fetchProjects } from "../../../api/projectApi";
import { fetchEmployeesByIds } from "../../../api/employeeApi";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const CreateProject = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { Option } = Select;
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
          setFilteredProjects(projectsWithEmployeeData);
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

  // Filter projects based on filterStatus and search term
  useEffect(() => {
    let filtered = projects;

    if (filterStatus !== "All") {
      filtered = filtered.filter((project) => project.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [filterStatus, searchTerm, projects]);

  console.log("all projectsss", projects);

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="flex mt-3 justify-between items-center gap-4">
          <Input
            placeholder="Search Projects here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
            prefix={
              <SearchOutlined style={{ color: "#8C97A8", fontSize: "16px" }} />
            }
            allowClear
            size="large"
          />
          <Select
            value={filterStatus}
            onChange={(value) => setFilterStatus(value)}
            className="w-40"
            placeholder="Filter Projects"
          >
            <Option value="All">
              <span className="flex items-center gap-2">
                <CheckCircleOutlined style={{ color: "#52c41a" }} />
                All
              </span>
            </Option>
            <Option value="planning">
              <span className="flex items-center gap-2">
                <ClockCircleOutlined style={{ color: "#faad14" }} />
                Planning
              </span>
            </Option>
            <Option value="in_progress">
              <span className="flex items-center gap-2">
                <PlayCircleOutlined style={{ color: "#1890ff" }} />
                In Progress
              </span>
            </Option>
            <Option value="completed">
              <span className="flex items-center gap-2">
                <CheckCircleOutlined style={{ color: "#52c41a" }} />
                Completed
              </span>
            </Option>
          </Select>
          
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-4"
              className="btn text font-semibold z-10 text-white hover:bg-[#4361EE] bg-[#4361EE] flex items-center justify-center gap-2"
            >
              <VscGitPullRequestCreate size={16} />
              Create New Project
            </label>
          </div>
        </div>

        {/* Include Sidebar component */}
        <CreateProjectForm
          fetchAllProjects={fetchAllProjects}
          project={selectedProject}
        />
      </div>

      {/* Project Cards */}
      <div className="mt-3 gap-5">
        <ProjectViewCard
          projects={filteredProjects}
          isLoading={isLoading}
          onProjectClick={openDrawerWithProject}
        />
      </div>
    </div>
  );
};

export default CreateProject;
