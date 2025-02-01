export interface IleaveData {
  formData: {
    leaveType: string;
    fromDate: Date;
    toDate: Date;
    reason: string;
  };
  organizationId?: string | undefined;
  employeeEmail?: string | undefined;
}
