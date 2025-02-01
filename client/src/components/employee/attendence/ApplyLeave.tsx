import { useEffect, useRef, useState } from "react";
import ApplyLeaveModal from "./ApplyLeaveModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { fetchLeave } from "../../../api/leaveApi";
import LeaveDetailsModel from "../../../shared/components/LeaveDetailsModal";
import { AllLeaves } from "../../../interface/IfetchLeave";
import LeaveHistoryTable from "../../../shared/components/LeaveHistoryTable";

const ApplyLeave = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaves, setLeaves] = useState<AllLeaves[]>([]);
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedLeave, setSelectedLeave] = useState<AllLeaves | null>(null);
  const [approvedLeaveCount, setApprovedLeaveCount] = useState<number>(0);
  const isInitialLoad = useRef(true);
  const [filteredLeaves, setFilteredLeaves] = useState<AllLeaves[]>([]);


  useEffect(() => {
    const fetchAllLeaves = async () => {
      const res = await fetchLeave(user?.email);
      console.log(res);

      if (res.data.message === "Fetched Applied leaves") {
        setLeaves(res.data.leaves);
        setFilteredLeaves(res.data.leaves);
      }
      console.log(res.data.leaves.length, "total leavess");

      if (isInitialLoad.current && res.data.leaves.length > 0) {
        const approvedCount = res.data.leaves.reduce(
          (count: number, leave: AllLeaves) => {
            console.log(leave.status === "approved");
            return leave.status === "approved" ? count + 1 : count;
          },
          0
        );

        setApprovedLeaveCount(approvedCount);
        isInitialLoad.current = false;
      }
    };
    if (user?.email) {
      fetchAllLeaves();
    }
  }, [user?.email]);
  useEffect(() => {
    if (fromDate || toDate) {
      const filtered = leaves.filter((leave) => {
        const leaveDate = new Date(leave.startDate);
        return (
          (!fromDate || leaveDate >= fromDate) &&
          (!toDate || leaveDate <= toDate)
        );
      });
      setFilteredLeaves(filtered);
    } else {
      setFilteredLeaves(leaves);
    }
  }, [fromDate, toDate, leaves]);

  const refreshLeaves = async () => {
    if (user?.email) {
      const res = await fetchLeave(user.email);
      if (res.data.message === "Fetched Applied leaves") {
        setLeaves(res.data.leaves);
        setFilteredLeaves(res.data.leaves);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          className="flex items-center bg-[#4361EE] py-3 px-6 rounded-full text-white gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
            />
          </svg>

          <span className="font-semibold">Apply Leave</span>
        </button>
      </div>

      {isModalOpen && (
        <ApplyLeaveModal
          onClose={() => setIsModalOpen(false)}
          onLeaveApplied={refreshLeaves}
        />
      )}
      {selectedLeave && (
        <LeaveDetailsModel
          leave={selectedLeave}
          onClose={() => setSelectedLeave(null)}
          onLeaveApplied={refreshLeaves}
        />
      )}

      <div className="p-6 bg-white rounded-lg shadow-lg">
        {/* Date Range Filter */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Date Range</h2>
            <div className="flex gap-4">
              <div>
                <label className="block text-gray-600 mb-1">From</label>
                <DatePicker
                  selected={fromDate}
                  onChange={(date: Date | null) => setFromDate(date)}
                  className="border px-3 py-2 rounded-lg w-full focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">To</label>
                <DatePicker
                  selected={toDate}
                  onChange={(date: Date | null) => setToDate(date)}
                  className="border px-3 py-2 rounded-lg w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold  mb-2">
              Total Appplied Leaves:
              <span className="text-2xl font-bold text-[#4361EE]">
                {leaves.length }
              </span>
            </h2>
            <h2 className="text-lg font-semibold  mb-2">
              Total Granted Leaves:
              <span className="text-2xl font-bold text-[#4361EE]">
                {approvedLeaveCount}
              </span>
            </h2>
          </div>
        </div>

        {/* Leave History Table */}
        <LeaveHistoryTable
          leaves={filteredLeaves}
          onLeaveSelect={(leave) => setSelectedLeave(leave)}
        />
      </div>
    </div>
  );
};

export default ApplyLeave;
