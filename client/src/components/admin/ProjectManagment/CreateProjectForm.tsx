/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import { MultiValue, SingleValue } from "react-select";
import { getAllEmployees } from "../../../api/employeeApi";
import { createProject, updateProject } from "../../../api/projectApi";
import { projectDetailsSchema } from "../../../validations/CreateProjectValidation";
import { RootState } from "../../../redux/store";
import { IEmployee } from "../../../interface/IemployeeDetails";
import { IProject } from "../../../interface/IprojectDetails";
import DatePickerField from "../../../shared/components/DatePickerField";
import SelectField from "../../../shared/components/SelectField";
import Input from "antd/es/input/Input";

interface OptionType {
  value: string;
  label: JSX.Element | string;
}

interface CreateProjectFormProps {
  fetchAllProjects: () => void;
  project?: IProject | null;
}

const priorityOptions: OptionType[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const statusOptions: OptionType[] = [
  { value: "planning", label: "Planning" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const CreateProjectForm = ({
  fetchAllProjects,
  project,
}: CreateProjectFormProps) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log(isDrawerOpen);

  const organizationId = useSelector(
    (state: RootState) => state.user?.user?.organizationId
  );
  // const {user}  = useSelector((state:RootState)=>state.user)

  const [projectDetails, setProjectDetails] = useState({
    projectName: project?.projectName || "",
    projectDescription: project?.projectDescription || "",
    startDate: project?.startDate ? new Date(project.startDate) : null,
    endDate: project?.endDate ? new Date(project.endDate) : null,
    manager: project?.manager
      ? { value: project.manager._id, label: project.manager.firstName }
      : null,
    members:
      project?.members.map((member: any) => ({
        value: member._id,
        label: member.firstName,
      })) || [],
    priority: project?.priority
      ? { value: project.priority, label: project.priority }
      : null,
    status: project?.status
      ? { value: project.status, label: project.status }
      : null,
    organizationId: project?.organizationId || organizationId,
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getAllEmployees(organizationId);
        setEmployees(res?.data.employees);
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch employees");
      }
    };
    fetchEmployees();
  }, [organizationId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateProjectDetails(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleDateChange = (
    name: "startDate" | "endDate",
    date: Date | null
  ) => {
    updateProjectDetails(name, date);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSelectChange = (
    name: keyof typeof projectDetails,
    selectedOption: SingleValue<OptionType> | MultiValue<OptionType>
  ) => {
    updateProjectDetails(name, selectedOption);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const updateProjectDetails = (key: string, value: any) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const employeeOptions = employees.map((emp) => ({
    value: emp._id,
    label: (
      <div className="flex items-center">
        <img
          src={emp.image}
          alt={emp.firstName}
          className="w-6 h-6 rounded-full mr-2"
        />
        {emp.firstName + " " + emp.lastName}
      </div>
    ),
  }));
  // Filtered options to ensure selected members are not in manager dropdown
  const filteredManagerOptions = employeeOptions.filter(
    (emp) =>
      !projectDetails.members.some((member) => member.value === emp.value)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formattedProjectDetails = {
      ...projectDetails,
      manager: projectDetails.manager?.value || null,
      members: projectDetails.members.map((member: any) => member.value),
      priority: projectDetails.priority?.value || null,
      status: projectDetails.status?.value || null,
    };
    const newErrors: Record<string, string> = {};

    if (!formattedProjectDetails.priority) {
      newErrors.priority = "Please choose a valid priority";
    }
    if (!formattedProjectDetails.status) {
      newErrors.status = "Please choose a valid status";
    }
    if (!formattedProjectDetails.manager) {
      newErrors.manager = "Please choose a manager";
    }
      const { error } = projectDetailsSchema.validate(formattedProjectDetails, {
      abortEarly: false,
    });
  
    if (error) {
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    try {
      if (project) {
        const res = await updateProject(project._id, formattedProjectDetails);
        if (res.data.message === "Project updated sucessfully..") {
          message.success("project updated successfully");
        }
      } else {
        const res = await createProject(formattedProjectDetails);
        if (res.data.message === "Project added successfully...") {
          message.success("Project created successfully");
        }
      }
      resetForm();
      fetchAllProjects();
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.errors ||
        "An error occurred while creating the project.";
      message.error(errorMsg);
    }
  };

  const resetForm = () => {
    setProjectDetails({
      projectName: "",
      projectDescription: "",
      startDate: null,
      endDate: null,
      manager: null,
      members: [],
      priority: null,
      status: null,
      organizationId,
    });
    const drawerCheckbox = document.getElementById(
      "my-drawer-4"
    ) as HTMLInputElement;
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };
  useEffect(() => {
    const drawerCheckbox = document.getElementById(
      "my-drawer-4"
    ) as HTMLInputElement;

    const handleDrawerChange = () => {
      setIsDrawerOpen(drawerCheckbox.checked);

      if (!drawerCheckbox.checked) {
        setErrors({})
        resetForm();
      }
    };
    drawerCheckbox?.addEventListener("change", handleDrawerChange);
    return () => {
      drawerCheckbox?.removeEventListener("change", handleDrawerChange);
    };
  });
  useEffect(() => {
    if (project) {
      setProjectDetails({
        projectName: project.projectName,
        projectDescription: project.projectDescription,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
        manager: project.manager
          ? { value: project.manager._id, label: project.manager.firstName }
          : null,
        members: project.members.map((member) => ({
          value: member._id,
          label: member.firstName,
        })),
        priority: project.priority
          ? { value: project.priority, label: project.priority }
          : null,
        status: project.status
          ? { value: project.status, label: project.status }
          : null,
        organizationId: project.organizationId,
      });
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, organizationId]);

  return (
    <div className="drawer-side z-30">
      <label
        htmlFor="my-drawer-4"
        className="drawer-overlay"
        aria-label="close sidebar"
      ></label>
      <div className="menu bg-white text-base-content min-h-full w-96 p-3">
        <h1 className="text-center text-[#232360] font-bold">
          {project ? "Update Project" : "Create Your Project"}
        </h1>

        <div className="border-b-2 mt-2"></div>
        <form onSubmit={handleSubmit} className="space-y-4 p-3">
          <label className="block -mb-3 font-semibold text-sm text-[#232360]">
            Project Name
          </label>
          <Input
            type="text"
            name="projectName"
            value={projectDetails.projectName}
            onChange={handleInputChange}
            className="p-2"
            placeholder="Enter Project Name"
          />
          {errors.projectName && (
            <p className="text-red-500">{errors.projectName}</p>
          )}
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#232360]">
              Project Description
            </label>
            <textarea
              name="projectDescription"
              value={projectDetails.projectDescription}
              onChange={handleInputChange}
              placeholder="Enter Project Description"
              className="w-full border focus:outline-[#1677ff] border-gray-300 rounded-md p-2 h-24"
            ></textarea>
            {errors.projectDescription && (
              <p className="text-red-500">{errors.projectDescription}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <DatePickerField
                label="Start Date"
                value={projectDetails.startDate}
                onChange={(date: any) =>
                  handleDateChange("startDate", date?.toDate() || null)
                }
              />
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate}</p>
              )}
            </div>
            <div>
              <DatePickerField
                label="End Date"
                value={projectDetails.endDate}
                onChange={(date: any) =>
                  handleDateChange("endDate", date?.toDate() || null)
                }
              />
              {errors.endDate && (
                <p className="text-red-500">{errors.endDate}</p>
              )}
            </div>
          </div>
          <SelectField
            label="Choose Manager"
            options={filteredManagerOptions}
            value={projectDetails.manager}
            onChange={(option: any) => handleSelectChange("manager", option)}
          />
          {errors.manager && <p className="text-red-500">{errors.manager}</p>}

          <SelectField
            label="Choose Members"
            options={employeeOptions.filter(
              (emp) => emp.value !== projectDetails.manager?.value
            )}
            isMulti
            value={projectDetails.members}
            onChange={(option: any) => handleSelectChange("members", option)}
          />
          {errors.members && <p className="text-red-500">{errors.members}</p>}

          <SelectField
            label="Set Priority"
            options={priorityOptions}
            value={projectDetails.priority}
            onChange={(option: any) => handleSelectChange("priority", option)}
          />
          {errors.priority && <p className="text-red-500">{errors.priority}</p>}

          <SelectField
            label="Set Status"
            options={statusOptions}
            value={projectDetails.status}
            onChange={(option: any) => handleSelectChange("status", option)}
          />
          {errors.status && <p className="text-red-500">{errors.status}</p>}

          <button
            type="submit"
            className="bg-[#4361EE] text-white font-semibold px-4 py-2 rounded-md"
          >
            {project ? "Save Changes" : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
