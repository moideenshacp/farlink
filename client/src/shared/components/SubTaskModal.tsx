/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal, Input, message } from "antd";
import DatePickerField from "./DatePickerField";
import SelectField from "./SelectField";
import FileUpload from "./FileUpload";
import dayjs from "dayjs";
import { ITaskDetails } from "../../interface/ItaskDetails";
import { uploadFileToCloudinary } from "../../api/employeeApi";
import { TaskValidationSchema } from "../../validations/TaskValidation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createSubTask } from "../../api/taskApi";

interface SubtaskModalProps {
  open: boolean;
  onClose: () => void;
  taskMembers: any;
  parentTaskId?: string;
  projectId?:string
}

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const SubtaskModal: React.FC<SubtaskModalProps> = ({
  open,
  onClose,
  taskMembers,
  parentTaskId,
  projectId
}) => {
    const {user} = useSelector((state:RootState)=>state.user)
  const memberOptions = taskMembers?.map((member:any) => ({
    value: member._id,
    label: (
      <div className="flex items-center">
        <img
          src={member.image || "/default-avatar.png"}
          alt={member.firstName}
          className="w-6 h-6 rounded-full mr-2"
        />
        {member.firstName + " " + member.lastName}
      </div>
    ),
  }));

  const [subtasks, setSubtasks] = useState<Partial<ITaskDetails>[]>([
    {
      taskName: "",
      taskDescription: "",
      startDate: null,
      endDate: null,
      members: null,
      priority: null,
      file: null,
      projectId:"",
      organizationId:""

    },
  ]);

  const [uploadingStates, setUploadingStates] = useState<boolean[]>([false]);

  const createInitialSubtask = (): Partial<ITaskDetails> => ({
    taskName: "",
    taskDescription: "",
    startDate: null,
    endDate: null,
    members:null,
    priority: null,
    file: null,
          projectId:"",
      organizationId:""
  });

  const handleAddMoreSubtask = () => {
    setSubtasks([...subtasks, createInitialSubtask()]);
    setUploadingStates([...uploadingStates, false]);
  };

  const updateSubtask = (index: number, updates: Partial<ITaskDetails>) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = { ...newSubtasks[index], ...updates };
    setSubtasks(newSubtasks);
  };

  const handleFileSelect = async (file: File | null, index: number) => {
    if (file) {
      const newUploadingStates = [...uploadingStates];
      newUploadingStates[index] = true;
      setUploadingStates(newUploadingStates);

      const fileUrl = await uploadFileToCloudinary(file, () => {});

      if (fileUrl) {
        updateSubtask(index, { file: fileUrl });
      } else {
        message.error("File upload failed. Please try again.");
      }

      newUploadingStates[index] = false;
      setUploadingStates(newUploadingStates);
    }
  };

  const handleSubmit = async () => {
    // Format the subtasks for submission
    const formattedSubtasks = subtasks.map((subtask) => ({
      ...subtask,
      startDate: subtask.startDate ? dayjs(subtask.startDate).toDate() : null,
      endDate: subtask.endDate ? dayjs(subtask.endDate).toDate() : null,
      priority: subtask.priority?.value,
      members: subtask.members ? [subtask.members.value] : [],
      parentTaskId,
      projectId,
      organizationId: user?.organizationId,
    }));
  
    console.log(formattedSubtasks, "submitting subtaskkkkk");
  
    // Validate each subtask
    for (const subtask of formattedSubtasks) {
      const { error } = TaskValidationSchema.validate(subtask, {
        abortEarly: false,
      });
  
      if (error) {
        error.details.forEach((err: any) => {
          message.error(err.message);
        });
        return; 
      }
    }
  
    try {
      const res = await createSubTask(formattedSubtasks);

      console.log(res.data);
      
      message.success("Subtasks submitted successfully!");
      onClose();
    } catch (error:any) {
      
      if (error.response && error.response.data) {
        console.log(error.response.data.error);
        console.log(error.response.data.message);
        // Handle custom error message
        message.error(error.response.data.error);
      } else {
        message.error("Failed to submit subtasks. Please try again.");
      }
    }
  };
  

  return (
    <Modal
      title="Add Subtasks"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      width={600}
      okText="Submit Subtasks"
      okButtonProps={{
        className: "bg-[#4361EE] hover:bg-[#3549bb]  text-white",
      }}
    >
      {subtasks.map((subtask, index) => (
        <div key={index} className="">
          {subtasks.length > 1 && (
            <h3 className="text-lg font-semibold mb-2">Subtask {index + 1}</h3>
          )}
          <div className="space-y-2">
            <Input
              placeholder="Subtask Name"
              value={subtask.taskName}
              onChange={(e) =>
                updateSubtask(index, { taskName: e.target.value })
              }
              className="mb-2 p-2"
            />

            <textarea
              placeholder="Subtask Description"
              value={subtask.taskDescription}
              onChange={(e) =>
                updateSubtask(index, { taskDescription: e.target.value })
              }
              className="w-full border rounded-md p-2 h-24 mb-2"
            />

            <div className="grid grid-cols-2 gap-4 mb-2">
              <DatePickerField
                label="Start Date"
                value={subtask.startDate}
                onChange={(date: any) =>
                  updateSubtask(index, { startDate: date?.toDate() || null })
                }
              />
              <DatePickerField
                label="End Date"
                value={subtask.endDate}
                onChange={(date: any) =>
                  updateSubtask(index, { endDate: date?.toDate() || null })
                }
              />
            </div>

            <SelectField
  label="Choose Member"
  options={memberOptions}
  value={subtask.members || null}
  onChange={(option: any) =>
    updateSubtask(index, { members: option }) 
  }
  isMulti={false} 
/>



            <SelectField
              label="Set Priority"
              options={priorityOptions}
              value={subtask.priority}
              onChange={(option: any) =>
                updateSubtask(index, { priority: option })
              }
            />

            <FileUpload
              onFileSelect={(file: any) => handleFileSelect(file, index)}
              file={subtask.file ?? null}
              loading={uploadingStates[index]}
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleAddMoreSubtask}
        className="w-full bg-gray-100 hover:bg-gray-200 py-2 mt-3 rounded-md mb-4 flex items-center justify-center"
      >
        + Add Another Subtask
      </button>
    </Modal>
  );
};

export default SubtaskModal;
