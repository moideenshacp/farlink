import { useEffect, useState } from "react";
import { DatePicker, message } from "antd";
import Input from "../../../shared/components/Input";
import { IEmployee } from "../../../interface/IemployeeDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getAllEmployees } from "../../../api/employeeApi";
import Select, { MultiValue, SingleValue } from "react-select";
import { createProject } from "../../../api/projectApi";
import moment from "moment";
import { projectDetailsSchema } from "../../../validations/CreateProjectValidation";

interface OptionType {
  value: string;
  label: JSX.Element | string;
}
interface CreateProjectFormProps {
  fetchAllProjects: () => void;
}
const priorityOptions: OptionType[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const CreateProjectForm = ({ fetchAllProjects }: CreateProjectFormProps) => {
  const [employeees, setEmployeees] = useState<IEmployee[]>([]);
  const organizationId = useSelector(
    (state: RootState) => state.user?.user?.organizationId
  );

  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    projectDescription: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    manager: null as OptionType | null,
    members: [] as OptionType[],
    priority: null as OptionType | null,
    organizationId: organizationId,
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await getAllEmployees(organizationId);
      setEmployeees(res?.data.employees);
    };
    fetchEmployees();
  }, [organizationId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDateChange = (
    name: "startDate" | "endDate",
    date: Date | null
  ) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: date,
    }));
  };

  const handleManagerChange = (selectedOption: OptionType | null) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      manager: selectedOption,
    }));
  };

  const handleMembersChange = (selectedOption: MultiValue<OptionType>) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      members: [...selectedOption],
    }));
  };

  const handlePriorityChange = (selectedOption: SingleValue<OptionType>) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      priority: selectedOption,
    }));
  };
  const employeeOptions = employeees.map((emp) => ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedProjectDetails = {
      ...projectDetails,
      manager: projectDetails.manager ? projectDetails.manager.value : null,
      members: projectDetails.members.map((member) => member.value),
      priority: projectDetails.priority ? projectDetails.priority.value : null,
    };
    const { error } = projectDetailsSchema.validate(formattedProjectDetails, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((err) => {
        message.error(err.message, 3);
      });
      return;
    }
    try {
      const res = await createProject(formattedProjectDetails);
      if (res.data.message === "Project added successfully...") {
        message.success("Project created successfully");
        setProjectDetails({
          projectName: "",
          projectDescription: "",
          startDate: null,
          endDate: null,
          manager: null,
          members: [],
          priority: null,
          organizationId: organizationId,
        });
        const drawerCheckbox = document.getElementById(
          "my-drawer-4"
        ) as HTMLInputElement;
        if (drawerCheckbox) {
          drawerCheckbox.checked = false;
        }
        fetchAllProjects();
      }

      console.log("Project created successfully:", res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Error creating project:", error);
      if (error.response && error.response.data) {
        message.warning(error.response.data.errors, 2);
      } else {
        message.error(
          "An error occurred while creating project. Please try again",
          2
        );
      }
    }
  };

  return (
    <div className="drawer-side z-30">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="menu bg-white text-base-content min-h-full w-96 p-4">
        <h1 className="text-center text-[#232360] font-bold">
          Create your project
        </h1>
        <div className="border-b-2 mt-5 "></div>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <Input
              type="text"
              label="Project Name"
              name="projectName"
              value={projectDetails.projectName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Project Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#232360]">
              Project Description
            </label>
            <textarea
              name="projectDescription"
              value={projectDetails.projectDescription}
              onChange={handleInputChange}
              placeholder="Enter Project Description"
              className="w-full border border-gray-300 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-sm text-[#232360]">
                Start Date
              </label>
              <DatePicker
                className="w-full border rounded-lg p-2 focus:outline-none"
                value={
                  projectDetails.startDate
                    ? moment(projectDetails.startDate)
                    : null
                }
                onChange={(date) =>
                  handleDateChange("startDate", date ? date.toDate() : null)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-sm text-[#232360]">
                End Date
              </label>

              <DatePicker
                className="w-full border rounded-lg p-2 focus:outline-none"
                value={
                  projectDetails.endDate ? moment(projectDetails.endDate) : null
                }
                onChange={(date) =>
                  handleDateChange("endDate", date ? date.toDate() : null)
                }
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#232360]">
              Choose Manager
            </label>
            <Select
              options={employeeOptions}
              value={projectDetails.manager}
              onChange={handleManagerChange}
              placeholder="Select Manager"
              className="w-full"
              classNamePrefix="react-select"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#232360]">
              Choose Members
            </label>
            <Select
              options={employeeOptions}
              isMulti
              value={projectDetails.members}
              onChange={handleMembersChange}
              placeholder="Select Members"
              className="w-full"
              classNamePrefix="react-select"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#232360]">
              Set Priority
            </label>
            <Select
              options={priorityOptions}
              value={projectDetails.priority}
              onChange={handlePriorityChange}
              placeholder="Select Priority"
              className="w-full"
              classNamePrefix="react-select"
            />
          </div>
          <button
            type="submit"
            className="bg-[#4361EE] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#4361EE]"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
