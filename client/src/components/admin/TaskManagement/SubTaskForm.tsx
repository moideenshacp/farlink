/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "antd";
import FileUpload from "../../../shared/components/FileUpload";
import SelectField from "../../../shared/components/SelectField";
import DatePickerField from "../../../shared/components/DatePickerField";
import { ITaskDetails } from "../../../interface/ItaskDetails";
// Constants
export const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

// Types and Interfaces
interface SubtaskFormProps {
  currentSubtask: Partial<ITaskDetails>;
  currentPage: number;
  updateSubtask: (index: number, updates: Partial<ITaskDetails>) => void;
  memberOptions: any[];
  existingSubtasks: any[];
  handleFileSelect: (file: File | null, index: number) => void;
  uploadingStates: boolean[];
}
// Subtask Form Component
const SubtaskForm: React.FC<SubtaskFormProps> = ({
  currentSubtask,
  currentPage,
  updateSubtask,
  memberOptions,
  existingSubtasks,
  handleFileSelect,
  uploadingStates,
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-1 font-medium text-sm text-[#232360]">
        Task Name
      </label>
      <Input
        placeholder="Subtask Name"
        value={currentSubtask.taskName}
        onChange={(e) =>
          updateSubtask(currentPage, { taskName: e.target.value })
        }
        className="mb-2 p-2"
      />

      <label className="block mb-1 font-medium text-sm text-[#232360]">
        Task Description
      </label>
      <textarea
        placeholder="Subtask Description"
        value={currentSubtask.taskDescription}
        onChange={(e) =>
          updateSubtask(currentPage, { taskDescription: e.target.value })
        }
        className="w-full border bg-white rounded-md p-2 h-24 mb-2"
      />

      <div className="grid grid-cols-2 gap-4 mb-2">
        <DatePickerField
          label="Start Date"
          value={currentSubtask.startDate}
          onChange={(date: any) =>
            updateSubtask(currentPage, { startDate: date?.toDate() || null })
          }
        />
        <DatePickerField
          label="End Date"
          value={currentSubtask.endDate}
          onChange={(date: any) =>
            updateSubtask(currentPage, { endDate: date?.toDate() || null })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-2">
        <SelectField
          label="Choose Member"
          options={memberOptions}
          value={currentSubtask.members || null}
          onChange={(option: any) =>
            updateSubtask(currentPage, { members: option })
          }
          isMulti={false}
        />
        <SelectField
          label="Set Priority"
          options={priorityOptions}
          value={currentSubtask.priority}
          onChange={(option: any) =>
            updateSubtask(currentPage, { priority: option })
          }
        />
      </div>

      {existingSubtasks.length > 0 && (
        <>
          <label className="block mb-1 font-medium text-sm text-[#232360]">
            Task Status
          </label>
          <Input
            placeholder="Subtask Status"
            value={currentSubtask.status}
            className="mb-2 p-2"
            readOnly
          />
        </>
      )}
      {currentSubtask?.feedback && (
        <>
          <label className="block mb-1 font-medium text-sm text-[#232360]">
            Task Feedback
          </label>
          <textarea
            placeholder="Subtask Description"
            value={currentSubtask.feedback}
            readOnly
            className="w-full border rounded-md p-2 h-24 mb-2"
          />
        </>
      )}

      <FileUpload
        onFileSelect={(file: any) => handleFileSelect(file, currentPage)}
        file={currentSubtask.file ?? null}
        loading={uploadingStates[currentPage]}
      />
    </div>
  );
};

export default SubtaskForm;
