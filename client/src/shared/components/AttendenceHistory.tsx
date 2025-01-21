import { useEffect, useState } from "react";
import { getAttendenceReport } from "../../api/attendenceApi";
import { IattendenceSummary } from "../../interface/IattendenceSummary";
import { message } from "antd";
import ShimmerHistory from "./ShimmerHistory";

interface AttendanceHistoryProps {
  email: string | undefined;
  showCheckInButton?: boolean;
  handleAttendance?: () => void;
  isCheckedIn?: boolean;
  role?: string | undefined;
  setIsCheckedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({
  email,
  showCheckInButton = false,
  handleAttendance,
  isCheckedIn,
  setIsCheckedIn,
  role,
}) => {
  const [attendanceHistory, setAttendanceHistory] = useState<
    IattendenceSummary[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAttendenceReportEmp = async () => {
      try {
        setLoading(true);
        const res = await getAttendenceReport(email);
        if (res?.data?.attendancereport) {
            
          setAttendanceHistory(res.data.attendancereport);

          const todayAttendance = res.data.attendancereport.find(
            (attendance: IattendenceSummary) => {
              return (
                new Date(attendance.date).toDateString() ===
                  new Date().toDateString() && attendance.checkIn !== "N/A"
              );
            }
          );
          if (setIsCheckedIn) {
            if (todayAttendance) {
              setIsCheckedIn(true);
            } else {
              setIsCheckedIn(false);
            }
          }
          const todayCheckout = res.data.attendancereport.find(
            (attendance: IattendenceSummary) => {
              return (
                new Date(attendance.date).toDateString() ===
                  new Date().toDateString() && attendance.checkOut !== "N/A"
              );
            }
          );

          if (todayCheckout && setIsCheckedIn) {
            setIsCheckedIn(false);
          }
        }
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch attendance report.", 2);
      } finally {
        setLoading(false);
      }
    };

    const fetchAttendenceReportAdmin = async () => {
      try {
        const res = await getAttendenceReport(email);
        if (res?.data?.attendancereport) {
          setAttendanceHistory(res.data.attendancereport);
        }
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch attendance report.", 2);
      }
    };

    if (email) {
      if (role === "employee") {
        fetchAttendenceReportEmp();
      } else {
        fetchAttendenceReportAdmin();
      }
    }
  }, [isCheckedIn, email, setIsCheckedIn, role]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {showCheckInButton && handleAttendance && (
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleAttendance}
            className={`px-6 py-3 rounded-lg font-medium text-white ${
              isCheckedIn ? "bg-[#4361EE]" : "bg-[#4361EE]"
            }`}
          >
            {isCheckedIn ? "Check Out" : "Check In"}
          </button>
        </div>
      )}
      {loading ? (
        <ShimmerHistory/>
      ) : (
        <>
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
                      <td className="px-4 py-2">
                        {attendance.checkIn || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {attendance.checkOut || "N/A"}
                      </td>
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
        </>
      )}
    </div>
  );
};

export default AttendanceHistory;
