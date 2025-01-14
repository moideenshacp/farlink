import { EmployeeProfileProps } from "../../../interface/IemployeeProfileProps";
import AttendanceHistory from "../../../shared/components/AttendenceHistory";

const EmployeeProfile_attendence: React.FC<EmployeeProfileProps> = ({ employee }) => {
  
  return <AttendanceHistory email={employee.email} />;
};

export default EmployeeProfile_attendence;
