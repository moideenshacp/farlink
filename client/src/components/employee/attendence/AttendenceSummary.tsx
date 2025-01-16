import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../redux/store";
import AttendanceHistory from "../../../shared/components/AttendenceHistory";
import { manageAttendence } from "../../../api/attendenceApi";
import { message } from "antd";

const AttendanceSummary = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleAttendance = async () => {
    try {
      const res = await manageAttendence(user?.organizationId, user?.email);
      if (res) {
        message.success("Attendance marked successfully!", 2);

        setIsCheckedIn(!isCheckedIn);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.data?.error ===
          "You have already completed your attendance for the day."
      ) {

        message.warning("You have already completed your attendance for the day.", 2);

      } else {

        message.error("An error occurred while marking attendance. Please try again.", 2);
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
