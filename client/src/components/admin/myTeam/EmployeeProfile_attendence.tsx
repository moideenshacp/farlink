import { useEffect, useState } from "react";
import { getAttendenceReport } from "../../../api/attendenceApi";

import { IattendenceSummary } from "../../../interface/IattendenceSummary";
import { toast, ToastContainer } from "react-toastify";
import { EmployeeProfileProps } from "../../../interface/IemployeeProfileProps";

const EmployeeProfile_attendence: React.FC<EmployeeProfileProps>  = ({employee}) => {
  console.log("employee",employee.email);
  

    const [attendanceHistory, setAttendanceHistory] = useState<
      IattendenceSummary[]
    >([]);
    useEffect(() => {
      const fetchAttendenceReport = async () => {
        try {
          const res = await getAttendenceReport(employee?.email);
          if (res?.data?.attendancereport) {
            setAttendanceHistory(res.data.attendancereport);
    
            
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch attendance report.");
        }
      };
    
      if (employee?.email) fetchAttendenceReport();
    }, [employee?.email]);
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
    
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

export default EmployeeProfile_attendence;
