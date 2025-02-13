import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { updateSubTask } from "../../../api/taskApi";

interface TaskFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taskDetails: any;
}

const SubTaskMoreDetails: React.FC<TaskFeedbackModalProps> = ({
  isOpen,
  onClose,
  taskDetails,
}) => {
  const [feedback, setFeedback] = useState(taskDetails.feedback);

  const handleSubmit = async () => {
    try {
      const allDetails = {
        ...taskDetails,
        feedback,
      };
      const res = await updateSubTask(taskDetails._id, allDetails);
      if (res.data) {
        message.success("Feedback added suceesfully");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Task Details & Feedback"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="bg-[#4361EE] hover:bg-[#3549bb]"
          onClick={handleSubmit}
        >
          Submit Feedback
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <label className="block mb-1 font-medium text-sm text-[#232360]">
          Task Details
        </label>
        <textarea
          value={taskDetails.taskDescription}
          readOnly
          className="w-full border outline-blue-400 rounded-md p-2 h-24 mb-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm text-[#232360]">
          Task Feedback
        </label>
        <textarea
          placeholder="Enter your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full border outline-blue-400 rounded-md p-2 h-24 mb-2"
        />
      </div>
    </Modal>
  );
};

export default SubTaskMoreDetails;
