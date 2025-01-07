import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import {
  getAttendenceReport,
  manageAttendence,
} from "../../../api/attendenceApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IattendenceSummary } from "../../../interface/IattendenceSummary";

const AttendanceSummary = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState<
    IattendenceSummary[]
  >([]);

  const handleAttendance = async () => {
    try {
      const res = await manageAttendence(user?.organizationId, user?.email);
      console.log(res, "from summary");
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
  useEffect(() => {
    const fetchAttendenceReport = async () => {
      try {
        const res = await getAttendenceReport(user?.email);
        if (res?.data?.attendancereport) {
          setAttendanceHistory(res.data.attendancereport);
  
          const todayAttendance = res.data.attendancereport.find(
            (attendance: IattendenceSummary) => {
              return (
                new Date(attendance.date).toDateString() ===
                  new Date().toDateString() &&
                attendance.checkIn !== "N/A"
              );
            }
          );
  
          if (todayAttendance) {
            setIsCheckedIn(true);
          } else {
            setIsCheckedIn(false);
          }
            const todayCheckout = res.data.attendancereport.find(
            (attendance: IattendenceSummary) => {
              return (
                new Date(attendance.date).toDateString() ===
                  new Date().toDateString() &&
                attendance.checkOut !== "N/A"
              );
            }
          );
  
          if (todayCheckout) {
            setIsCheckedIn(false); 
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch attendance report.");
      }
    };
  
    if (user?.email) fetchAttendenceReport();
  }, [isCheckedIn,user?.email]);
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Attendance Summary</h1>

      {/* Check-In/Check-Out Button */}
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={handleAttendance}
          className={`px-6 py-3 rounded-lg font-medium text-white ${
            isCheckedIn ? "bg-[#4361EE] hover:bg-[#4361EE]" : "bg-[#4361EE]"
          }`}
        >
          {isCheckedIn ? "Check Out" : "Check In"}
        </button>
      </div>

      {/* Attendance History */}
      <h2 className="text-lg font-semibold mb-4">Attendance History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Check-In Time</th>
              <th className="px-4 py-2">Check-Out Time</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceHistory.length > 0 ? (
              attendanceHistory.map((attendance, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{attendance.date || "N/A"}</td>
                  <td className="px-4 py-2">{attendance.checkIn || "N/A"}</td>
                  <td className="px-4 py-2">{attendance.checkOut || "N/A"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        attendance.status === "present"
                          ? "bg-green-100 text-green-600"
                          : attendance.status === "absent"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {attendance.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No attendance data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AttendanceSummary;
