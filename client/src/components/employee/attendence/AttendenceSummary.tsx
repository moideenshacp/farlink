import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { RootState } from "../../../redux/store";
import AttendanceHistory from "../../../shared/components/AttendenceHistory";
import { manageAttendence } from "../../../api/attendenceApi";

const AttendanceSummary = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleAttendance = async () => {
    try {
      const res = await manageAttendence(user?.organizationId, user?.email);
      if (res) {
        toast.success("Attendance marked successfully!");
        setIsCheckedIn(!isCheckedIn);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.data?.error ===
          "You have already completed your attendance for the day."
      ) {
        toast.warning(
          "You have already completed your attendance for the day."
        );
      } else {
        toast.error(
          "An error occurred while marking attendance. Please try again."
        );
      }
    }
  };

  return (
    <AttendanceHistory
      email={user?.email}
      role={user?.role}
      showCheckInButton
      handleAttendance={handleAttendance}
      isCheckedIn={isCheckedIn}
      setIsCheckedIn={setIsCheckedIn}
    />
  );
};

export default AttendanceSummary;
