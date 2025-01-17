import { useEffect, useState } from "react";
import Sidebar from "./LeaveSummarySidebar";
import { AllLeaves } from "../../../interface/IfetchLeave";
import { fetchLeave, fetchRemainingLeaves } from "../../../api/leaveApi";
import LeaveDetailsModel from "../../../shared/components/LeaveDetailsModal";
import LeaveHistoryTable from "../../../shared/components/LeaveHistoryTable";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import DatePicker from "react-datepicker";

const LeaveSummary = () => {
  const [selectedLeave, setSelectedLeave] = useState<AllLeaves | null>(null);
  const [leaves, setLeaves] = useState<AllLeaves[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [filteredLeaves, setFilteredLeaves] = useState<AllLeaves[]>([]);

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

  console.log("balanace bleave", leaveBalance);

  useEffect(() => {
    const fetchAllLeaves = async () => {
      setLoading(true);
      try {
        const res = await fetchLeave(selectedEmail);
        console.log(res);

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


  useEffect(() => {
    if (fromDate || toDate) {
      const filtered = leaves.filter((leave) => {
        const leaveDate = new Date(leave.startDate);
        console.log(leaveDate,"leave date");
        
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
    if (selectedEmail) {
      const res = await fetchLeave(selectedEmail);
      if (res.data.message === "Fetched Applied leaves") {
        setLeaves(res.data.leaves);
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 h-full">
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
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex gap-20">
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
          <div>

          <p className="text-[#4361EE] font-semibold" >Sick Leave: <span>{leaveBalance.sick}</span>&nbsp;Left</p>
          <p className="text-[#4361EE] font-semibold">Casual Leave: <span>{leaveBalance.leave}</span>&nbsp;Left</p>
          <p className="text-[#4361EE] font-semibold">Vacation Leave: <span>{leaveBalance.vacation}</span>&nbsp;Left</p>
          </div>
        </div>
        <br />
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <LeaveHistoryTable
            leaves={filteredLeaves}
            onLeaveSelect={(leave) => setSelectedLeave(leave)}
          />
        )}
      </div>
    </div>
  );
};

export default LeaveSummary;
