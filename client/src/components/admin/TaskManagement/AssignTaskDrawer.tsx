/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from "react";
import { Drawer, Input, message } from "antd";
import DatePickerField from "../../../shared/components/DatePickerField";
import SelectField from "../../../shared/components/SelectField";
import FileUpload from "../../../shared/components/FileUpload";
import { IProject } from "../../../interface/IprojectDetails";
import { uploadFileToCloudinary } from "../../../api/employeeApi";
import { TaskValidationSchema } from "../../../validations/TaskValidation";
import dayjs from "dayjs";
import { ITaskDetails } from "../../../interface/ItaskDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { createTask } from "../../../api/taskApi";

interface AssignTaskDrawerProps {
  open: boolean;
  onClose: () => void;
  project: IProject;
}

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const AssignTaskDrawer: React.FC<AssignTaskDrawerProps> = ({
  open,
  onClose,
  project,
}) => {
  const memberOptions = project?.members?.map((member) => ({
    value: member._id,
    label: `${member.firstName} ${member.lastName}`,
  }));
  const { user } = useSelector((state: RootState) => state.user);
  const [taskDetails, setTaskDetails] = useState<ITaskDetails>({
    taskName: "",
    taskDescription: "",
    startDate: null,
    endDate: null,
    members: [],
    priority: null,
    file: null,
    projectId: project._id,
    organizationId: user?.organizationId,
  });
  console.log(project, "rpoerject iddddddddddddd=============================");

  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    },
    []
  );

  const handleDateChange = useCallback((name: string, date: Date | null) => {
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: date }));
  }, []);

  const handleSelectChange = useCallback(
    (name: string, selectedOption: any) => {
      setTaskDetails((prevDetails) => ({
        ...prevDetails,
        [name]: selectedOption,
      }));
    },
    []
  );

  const handleFileSelect = async (file: File | null) => {
    if (file) {
      setIsUploading(true);
      const fileUrl = await uploadFileToCloudinary(file, setIsUploading);
      if (fileUrl) {
        setTaskDetails((prevDetails) => ({
          ...prevDetails,
          file: fileUrl ?? null,
        }));
      } else {
        message.error("File upload failed. Please try again.");
      }
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Map the members to match the expected structure of IMember[]
    const formattedTaskDetails = {
      ...taskDetails,
      startDate: taskDetails.startDate
        ? dayjs(taskDetails.startDate).toDate()
        : null,
      endDate: taskDetails.endDate ? dayjs(taskDetails.endDate).toDate() : null,
      priority: taskDetails.priority?.value,
      members: taskDetails.members.map((member: any) => member.value),
      projectId: project._id,
    };

    console.log(formattedTaskDetails, "all task details");

    const { error } = TaskValidationSchema.validate(formattedTaskDetails, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((err) => {
        message.error(err.message);
      });
      return;
    }

    try {
      const res = await createTask(formattedTaskDetails);

      console.log(res, "from backendndndndnndndndndndn");
      if (res.data.message === "Task added successfully...") {
        message.success("Task submitted successfully!");
      }
      setTaskDetails({
        taskName: "",
        taskDescription: "",
        startDate: null,
        endDate: null,
        members: [],
        priority: null,
        file: null,
        organizationId: user?.organizationId,
        projectId: "",
      });
    } catch (error: any) {
      console.log(error);
      const errorMsg =
        error.response?.data?.errors ||
        "An error occurred while creating the project.";
      message.error(errorMsg);
    }
  };

  return (
    <Drawer
      title={
        <div className="text-center text-[#232360] font-semibold">
          Assign Task
        </div>
      }
      closable={false}
      onClose={onClose}
      open={open}
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <label className="block -mb-3 font-semibold text-sm text-[#232360]">
          Task Name
        </label>
        <Input
          type="text"
          name="taskName"
          value={taskDetails.taskName}
          onChange={handleInputChange}
          className="p-2 border-gray-300 rounded-md"
          placeholder="Enter Task Name"
        />

        <div>
          <label className="block mb-1 font-semibold text-sm text-[#232360]">
            Task Description
          </label>
          <textarea
            name="taskDescription"
            value={taskDetails.taskDescription}
            onChange={handleInputChange}
            placeholder="Enter Task Description"
            className="w-full border focus:outline-[#1677ff] border-gray-300 rounded-md p-2 h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DatePickerField
            label="Start Date"
            value={taskDetails.startDate}
            onChange={(date: any) =>
              handleDateChange("startDate", date?.toDate() || null)
            }
          />
          <DatePickerField
            label="End Date"
            value={taskDetails.endDate}
            onChange={(date: any) =>
              handleDateChange("endDate", date?.toDate() || null)
            }
          />
        </div>

        <SelectField
          label="Choose Members"
          options={memberOptions}
          isMulti
          value={taskDetails.members}
          onChange={(option: any) => handleSelectChange("members", option)}
        />
        <SelectField
          label="Set Priority"
          options={priorityOptions}
          value={taskDetails.priority}
          onChange={(option: any) => handleSelectChange("priority", option)}
        />

        <FileUpload
          onFileSelect={handleFileSelect}
          file={taskDetails.file ?? null}
          loading={isUploading}
        />

        <button
          type="submit"
          className="bg-[#4361EE] hover:bg-[#3549bb] transition text-white font-semibold px-4 py-2 rounded-md w-full"
        >
          Create Task
        </button>
      </form>
    </Drawer>
  );
};

export default AssignTaskDrawer;
