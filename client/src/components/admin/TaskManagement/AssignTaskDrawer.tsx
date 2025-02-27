/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from "react";
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
import { createTask, updateTask } from "../../../api/taskApi";
import axios from "axios";

interface AssignTaskDrawerProps {
  open: boolean;
  onClose: () => void;
  project: IProject;
  editTask?: ITaskDetails | null;
  onSuccess?: () => void;
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
  editTask,
  onSuccess,
}) => {
  const memberOptions = project?.members?.map((member) => ({
    value: member._id,
    label: (
      <div className="flex items-center">
        <img
          src={member.image}
          alt={member.firstName}
          className="w-6 h-6 rounded-full mr-2"
        />
        {member.firstName + " " + member.lastName}
      </div>
    ),
  }));

  const { user } = useSelector((state: RootState) => state.user);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
  const [isUploading, setIsUploading] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editTask) {
      const formattedMembers = editTask.members.map((member: any) => ({
        value: member._id,
        label: (
          <div className="flex items-center">
            <img
              src={member.image}
              alt={member.firstName}
              className="w-6 h-6 rounded-full mr-2"
            />
            {member.firstName + " " + member.lastName}
          </div>
        ),
      }));

      const formattedPriority = priorityOptions.find(
        (option) => option.value === editTask.priority?.toLowerCase()
      );

      setTaskDetails({
        ...editTask,
        members: formattedMembers,
        priority: formattedPriority || null,
        startDate: editTask.startDate ? new Date(editTask.startDate) : null,
        endDate: editTask.endDate ? new Date(editTask.endDate) : null,
      });
    } else {
      setTaskDetails({
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
    }
  }, [editTask, project._id, user?.organizationId]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
      setErrors({})
    },
    []
  );

  const handleDateChange = useCallback((name: string, date: Date | null) => {
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: date }));
    setErrors({})
  }, []);

  const handleSelectChange = useCallback(
    (name: string, selectedOption: any) => {
      setTaskDetails((prevDetails) => ({
        ...prevDetails,
        [name]: selectedOption,
      }));
      setErrors({})
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
        setErrors({})
      } else {
        message.error("File upload failed. Please try again.");
      }
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

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

    const newErrors: Record<string, string> = {};
    if (!formattedTaskDetails.priority) {
      newErrors.priority = "Please choose a valid priority";
    }
    const { error } = TaskValidationSchema.validate(formattedTaskDetails, {
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
      let response;
      if (editTask) {
        response = await updateTask(editTask._id, formattedTaskDetails);
        message.success("Task updated successfully!");
      } else {
        response = await createTask(formattedTaskDetails);
        message.success("Task created successfully!");
        if (response.data) {
          setTaskDetails({
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
        }
      }

      if (response.data) {
        onSuccess?.();
        onClose();
      }
    } catch (error: any) {
      if(axios.isAxiosError(error)){
        message.error(error.response?.data.error)
        return
      }
      const errorMsg =
        error.response?.data?.errors ||
        `An error occurred while ${
          editTask ? "updating" : "creating"
        } the task.`;
      message.error(errorMsg);

      
    }
  };
  const handleClose = () => {
    setErrors({});
    onClose();
  };
  

  return (
    <Drawer
      title={
        <div className="text-center text-[#232360] font-semibold">
          {editTask ? "Update Task" : "Assign Task"}
        </div>
      }
      closable={false}
      onClose={handleClose}
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
  {errors.taskName && (
            <p className="text-red-500">{errors.taskName}</p>
          )}
        <div>
          <label className="block mb-1 font-semibold text-sm text-[#232360]">
            Task Description
          </label>
          <textarea
            name="taskDescription"
            value={taskDetails.taskDescription}
            onChange={handleInputChange}
            placeholder="Enter Task Description"
            className="w-full border focus:outline-[#1677ff] bg-white border-gray-300 rounded-md p-2 h-24"
          />
          {errors.taskDescription && (
            <p className="text-red-500">{errors.taskDescription}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>

          <DatePickerField
            label="Start Date"
            value={taskDetails.startDate}
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
            value={taskDetails.endDate}
            onChange={(date: any) =>
              handleDateChange("endDate", date?.toDate() || null)
            }
          />
          {errors.endDate && (
            <p className="text-red-500">{errors.endDate}</p>
          )}
          </div>
        </div>

          <div>

        <SelectField
          label="Choose Members"
          options={memberOptions}
          isMulti
          value={taskDetails.members}
          onChange={(option: any) => handleSelectChange("members", option)}
        />
        {errors.members && (
            <p className="text-red-500">{errors.members}</p>
          )}
          </div>
          <div>

        <SelectField
          label="Set Priority"
          options={priorityOptions}
          value={taskDetails.priority}
          onChange={(option: any) => handleSelectChange("priority", option)}
        />
        {errors.priority && (
            <p className="text-red-500">{errors.priority}</p>
          )}
          </div>

        <FileUpload
          onFileSelect={handleFileSelect}
          file={taskDetails.file ?? null}
          loading={isUploading}
        />

        <button
          type="submit"
          className="bg-[#4361EE] hover:bg-[#3549bb] transition text-white font-semibold px-4 py-2 rounded-md w-full"
        >
          {editTask ? "Update Task" : "Create Task"}
        </button>
      </form>
    </Drawer>
  );
};

export default AssignTaskDrawer;
