/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SubtaskModalProps {
  open: boolean;
  onClose: () => void;
  taskMembers: any;
  parentTaskId?: string;
  projectId?: string;
  existingSubtasks?: any;
}
