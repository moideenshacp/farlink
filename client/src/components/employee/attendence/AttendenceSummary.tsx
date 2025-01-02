import { useState } from "react";

const AttendanceSummary = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const dummyAttendanceHistory = [
    {
      id: 1,
      date: "2025-01-01",
      checkInTime: "09:00 AM",
      checkOutTime: "05:00 PM",
      status: "Present",
    },
    {
      id: 2,
      date: "2025-01-02",
      checkInTime: "09:15 AM",
      checkOutTime: "05:10 PM",
      status: "Present",
    },
    {
      id: 3,
      date: "2025-01-03",
      checkInTime: "09:30 AM",
      checkOutTime: null,
      status: "Checked In",
    },
  ];

  const [attendanceHistory, setAttendanceHistory] = useState(dummyAttendanceHistory);

  // Check-In/Check-Out functionality
  const handleAttendance = () => {
    if (isCheckedIn) {
      // Check-Out
      setAttendanceHistory((prev) => [
        ...prev.map((record) =>
          record.status === "Checked In"
            ? { ...record, checkOutTime: new Date().toLocaleTimeString(), status: "Present" }
            : record
        ),
      ]);
    } else {
      // Check-In
      const newRecord = {
        id: attendanceHistory.length + 1,
        date: new Date().toLocaleDateString(),
        checkInTime: new Date().toLocaleTimeString(),
        checkOutTime: null,
        status: "Checked In",
      };
      setAttendanceHistory((prev) => [newRecord, ...prev]);
    }
    setIsCheckedIn(!isCheckedIn);
  };

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
      {attendanceHistory.length > 0 ? (
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
              {attendanceHistory.map((record, index) => (
                <tr key={record.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{record.date}</td>
                  <td className="px-4 py-2">{record.checkInTime || "N/A"}</td>
                  <td className="px-4 py-2">{record.checkOutTime || "N/A"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        record.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No attendance history found.</div>
      )}
    </div>
  );
};

export default AttendanceSummary;
