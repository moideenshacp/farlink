/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import dayjs from "dayjs";
import { ITaskDetails } from "../../../interface/ItaskDetails";
import { uploadFileToCloudinary } from "../../../api/employeeApi";
import { TaskValidationSchema } from "../../../validations/TaskValidation";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { createSubTask, updateSubTask } from "../../../api/taskApi";
import { SubtaskModalProps } from "../../../interface/SubTaskModalProps";
import ModalFooter from "./SubtaskModalFooter";
import SubtaskForm, { priorityOptions } from "./SubTaskForm";

// Utility Functions
const createInitialSubtask = (): Partial<ITaskDetails | any> => ({
  taskName: "",
  taskDescription: "",
  startDate: null,
  endDate: null,
  members: null,
  priority: null,
  file: null,
  projectId: "",
  organizationId: "",
  feedback: "",
});

const cleanSubtaskForComparison = (subtask: Partial<ITaskDetails> = {}) => {
  return {
    taskName: subtask.taskName || "",
    taskDescription: subtask.taskDescription || "",
    startDate: subtask.startDate
      ? dayjs(subtask.startDate).toISOString()
      : null,
    endDate: subtask.endDate ? dayjs(subtask.endDate).toISOString() : null,
    priority: subtask.priority?.value || null,
    members: subtask.members ? { value: subtask.members.value } : null,
  };
};

// Main Component
const SubtaskModal: React.FC<SubtaskModalProps> = ({
  open,
  onClose,
  taskMembers,
  parentTaskId,
  projectId,
  existingSubtasks = [],
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [subtasks, setSubtasks] = useState<Partial<ITaskDetails>[]>([
    createInitialSubtask(),
  ]);
  const [originalSubtasks, setOriginalSubtasks] = useState<
    Partial<ITaskDetails>[]
  >([]);
  const [uploadingStates, setUploadingStates] = useState<boolean[]>([]);

  // Computed values
  const currentSubtask = subtasks[currentPage];
  const isLastPage = currentPage === subtasks.length - 1;
  const isFirstPage = currentPage === 0;

  const memberOptions = taskMembers?.map((member: any) => ({
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

  // Handlers
  const handleAddMoreSubtask = () => {
    setSubtasks([...subtasks, createInitialSubtask()]);
    setUploadingStates([...uploadingStates, false]);
    setCurrentPage(subtasks.length);
  };

  const updateSubtask = (index: number, updates: Partial<ITaskDetails>) => {
    setSubtasks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updates };
      return updated;
    });
  };

  const handleFileSelect = async (file: File | null, index: number) => {
    if (!file) return;
    setUploadingStates((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });

    try {
      const fileUrl = await uploadFileToCloudinary(file, () => {});
      if (fileUrl) {
        updateSubtask(index, { file: fileUrl });
      } else {
        message.error("File upload failed. Please try again.");
      }
    } finally {
      setUploadingStates((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }
  };

  const getEditedSubtasks = () => {
    return subtasks.filter((subtask, index) => {
      const cleanedOriginal = cleanSubtaskForComparison(
        originalSubtasks[index] || {}
      );
      const cleanedCurrent = cleanSubtaskForComparison(subtask);
      return JSON.stringify(cleanedCurrent) !== JSON.stringify(cleanedOriginal);
    });
  };

  const handleSubmit = async () => {
    const editedSubtasks = getEditedSubtasks();

    if (editedSubtasks.length === 0) {
      message.info("No changes detected.");
      return;
    }

    const formattedSubtasks = editedSubtasks.map((subtask) => ({
      ...subtask,
      startDate: subtask.startDate ? dayjs(subtask.startDate).toDate() : null,
      endDate: subtask.endDate ? dayjs(subtask.endDate).toDate() : null,
      priority: subtask.priority?.value,
      members: subtask.members ? [subtask.members.value] : [],
      parentTaskId,
      projectId,
      organizationId: user?.organizationId,
    }));

    for (const subtask of formattedSubtasks) {
      const { error } = TaskValidationSchema.validate(subtask, {
        abortEarly: false,
      });
      if (error) {
        error.details.forEach((err: any) => message.error(err.message));
        return;
      }
    }

    try {
      const newSubtasks = formattedSubtasks.filter((subtask) => !subtask._id);
      const updatedSubtasks = formattedSubtasks.filter(
        (subtask) => subtask._id
      );

      if (newSubtasks.length > 0) {
        await createSubTask(newSubtasks);
      }
      if (updatedSubtasks.length > 0) {
        await Promise.all(
          updatedSubtasks.map((subtask) => updateSubTask(subtask._id, subtask))
        );
      }
      message.success("Subtasks saved successfully!");
      onClose();
    } catch (error: any) {
      message.error(
        error.response?.data?.error || "Failed to submit subtasks."
      );
    }
  };

  // Effects
  useEffect(() => {
    if (open) {
      if (existingSubtasks.length > 0) {
        const formattedSubtasks = existingSubtasks.map((subtask: any) => ({
          ...subtask,
          startDate: subtask.startDate
            ? dayjs(subtask.startDate).toDate()
            : null,
          endDate: subtask.endDate ? dayjs(subtask.endDate).toDate() : null,
          members: subtask.members
            ? {
                value: subtask.members._id,
                label: (
                  <div className="flex items-center">
                    <img
                      src={subtask.members.image || "/default-avatar.png"}
                      alt={subtask.members.firstName}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    {subtask.members.firstName + " " + subtask.members.lastName}
                  </div>
                ),
              }
            : null,
          priority:
            priorityOptions.find((p) => p.value === subtask.priority) || null,
          feedback: subtask.feedback,
        }));

        setSubtasks(formattedSubtasks);
        setOriginalSubtasks(JSON.parse(JSON.stringify(formattedSubtasks)));
      } else {
        setSubtasks([createInitialSubtask()]);
        setOriginalSubtasks([]);
      }
      setCurrentPage(0);
    }
  }, [open, existingSubtasks]);

  return (
    <Modal
      title={existingSubtasks.length > 0 ? "View Subtasks" : "Add Subtasks"}
      open={open}
      onCancel={onClose}
      width={600}
      footer={
        <ModalFooter
          onClose={onClose}
          onSubmit={handleSubmit}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          onPrevious={() => setCurrentPage((prev) => prev - 1)}
          onNext={() => setCurrentPage((prev) => prev + 1)}
        />
      }
    >
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Subtask {currentPage + 1} of {subtasks.length}
        </p>
      </div>

      <SubtaskForm
        currentSubtask={currentSubtask}
        currentPage={currentPage}
        updateSubtask={updateSubtask}
        memberOptions={memberOptions}
        existingSubtasks={existingSubtasks}
        handleFileSelect={handleFileSelect}
        uploadingStates={uploadingStates}
      />

      {existingSubtasks.length === 0 && isLastPage && (
        <button
          onClick={handleAddMoreSubtask}
          className="w-full bg-gray-100 hover:bg-gray-200 py-2 mt-3 rounded-md"
        >
          + Add Another Subtask
        </button>
      )}
    </Modal>
  );
};

export default SubtaskModal;
