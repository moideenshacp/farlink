import { useEffect, useState } from "react";
import Sidebar from "./LeaveSummarySidebar";
import { AllLeaves } from "../../../interface/IfetchLeave";
import { fetchLeave, fetchRemainingLeaves } from "../../../api/leaveApi";
import LeaveDetailsModel from "../../../shared/components/LeaveDetailsModal";
import LeaveHistoryTable from "../../../shared/components/LeaveHistoryTable";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import DatePicker from "react-datepicker";
import ShimmerHistory from "../../../shared/components/ShimmerHistory";
import { Pagination } from "antd";

const LeaveSummary = () => {
  const [selectedLeave, setSelectedLeave] = useState<AllLeaves | null>(null);
  const [leaves, setLeaves] = useState<AllLeaves[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leaveBalance, setLeaveBalance] = useState<any>([]);
  const organizationId = user?.organizationId;

  useEffect(() => {
    const fetchBalanceLeaves = async () => {
      try {
        const res = await fetchRemainingLeaves(organizationId, selectedEmail);
        setLeaveBalance(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (organizationId && selectedEmail) {
      fetchBalanceLeaves();
    }
  }, [organizationId, selectedEmail]);

  useEffect(() => {
    const fetchAllLeaves = async () => {
      setLoading(true);
      try {
        const res = await fetchLeave(selectedEmail);
        if (res.data.message === "Fetched Applied leaves") {
          setLeaves(res.data.leaves);
        }
      } catch (error) {
        console.error("Failed to fetch leaves:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedEmail) {
      fetchAllLeaves();
    }
  }, [selectedEmail]);

  const filteredLeaves = leaves.filter((leave) => {
    const leaveDate = new Date(leave.startDate);
    return (
      (!fromDate || leaveDate >= fromDate) && (!toDate || leaveDate <= toDate)
    );
  });

  const refreshLeaves = async () => {
    if (selectedEmail) {
      const res = await fetchLeave(selectedEmail);
      if (res.data.message === "Fetched Applied leaves") {
        setLeaves(res.data.leaves);
      }
    }
  };

  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 overflow-auto h-full">
        <Sidebar onSelectEmail={(email: string) => setSelectedEmail(email)} />
      </div>
      {selectedLeave && (
        <LeaveDetailsModel
          leave={selectedLeave}
          onClose={() => setSelectedLeave(null)}
          isAdmin={true}
          onStatusChange={refreshLeaves}
        />
      )}
      {/* Table Container */}
      <div className="flex-1 p-4 overflow-auto  scrollbar-none">
        <div className="flex gap-20">
          <div className="z-auto">
            <label className="block text-gray-600 mb-1">From</label>
            <DatePicker
              selected={fromDate}
              onChange={(date: Date | null) => setFromDate(date)}
              className="border bg-white px-3 py-2   rounded-lg w-full focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">To</label>
            <DatePicker
              selected={toDate}
              onChange={(date: Date | null) => setToDate(date)}
              className="border px-3 bg-white py-2 rounded-lg w-full focus:outline-none"
            />
          </div>
          <div>
            <p className="text-[#4361EE] font-semibold">
              Sick Leave: <span>{leaveBalance.sick}</span>&nbsp;Left
            </p>
            <p className="text-[#4361EE] font-semibold">
              Casual Leave: <span>{leaveBalance.casual}</span>&nbsp;Left
            </p>
            <p className="text-[#4361EE] font-semibold">
              Vacation Leave: <span>{leaveBalance.vacation}</span>&nbsp;Left
            </p>
          </div>
        </div>
        <br />
        {loading ? (
          <ShimmerHistory />
        ) : (
          <>
            <LeaveHistoryTable
              leaves={paginatedLeaves}
              onLeaveSelect={(leave) => setSelectedLeave(leave)}
              currentPage={currentPage}
              pageSize={pageSize}
            />

            {filteredLeaves.length > pageSize && (
              <div className="flex justify-end mt-6">
                <Pagination
                  current={currentPage}
                  total={filteredLeaves.length}
                  pageSize={pageSize}
                  onChange={(page) => setCurrentPage(page)}
                  simple={{ readOnly: true }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LeaveSummary;
