import { useEffect, useState } from "react";
import { getAttendenceReport, updateAttendence } from "../../api/attendenceApi";
import { IattendenceSummary } from "../../interface/IattendenceSummary";
import { message, Pagination } from "antd";
import ShimmerHistory from "./ShimmerHistory";
import EditableAttendanceRow from "./EditableAttendenceRow";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
  const { user } = useSelector((state: RootState) => state.user);
  const canEdit = user?.role === "admin" || user?.position === "HR";

  const [attendanceHistory, setAttendanceHistory] = useState<
    IattendenceSummary[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
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

  useEffect(() => {
    if (email) {
      if (role === "employee") {
        fetchAttendenceReportEmp();
      } else {
        fetchAttendenceReportAdmin();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckedIn, email, setIsCheckedIn, role]);

  useEffect(() => {
    setCurrentPage(1);
  }, [attendanceHistory]);

  // Apply pagination
  const paginatedData = attendanceHistory.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSaveAttendance = async (
    updatedAttendance: IattendenceSummary
  ) => {
    try {
      const { id, checkIn, checkOut } = updatedAttendance;
      console.log("id------------------------", id);

      if (!checkIn || !checkOut) {
        message.error("Check-in and check-out times are required.");
        return;
      }
      const res = await updateAttendence(id, checkIn, checkOut);
      if (res.status === 200) {
        if (email) {
          if (role === "employee") {
            fetchAttendenceReportEmp();
          } else {
            fetchAttendenceReportAdmin();
          }
        }
        message.success("Attendance updated successfully.");
      } else {
        message.error("Failed to Update attendence,please try again....");
      }
      // Update local state
    } catch (error) {
      console.error(error);
      message.error("Failed to update attendance.");
    }
  };

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
        <ShimmerHistory />
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
                  <th className="px-4 py-2">{canEdit ? "Actions" : ""}</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map(
                    (attendance: IattendenceSummary, index: number) => (
                      <EditableAttendanceRow
                        key={index}
                        attendance={attendance}
                        index={index}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onSave={handleSaveAttendance}
                        user={user}
                      />
                    )
                  )
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

          {attendanceHistory.length > pageSize && (
            <div className="flex justify-end mt-4">
              <Pagination
                current={currentPage}
                total={attendanceHistory.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                simple={{ readOnly: true }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceHistory;
