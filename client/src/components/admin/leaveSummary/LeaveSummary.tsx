import { useEffect, useState } from "react";
import Sidebar from "./LeaveSummarySidebar";
import { AllLeaves } from "../../../interface/IfetchLeave";
import { fetchLeave } from "../../../api/leaveApi";
import LeaveDetailsModel from "../../../shared/components/LeaveDetailsModal";
import LeaveHistoryTable from "../../../shared/components/LeaveHistoryTable";

const LeaveSummary = () => {
  const [selectedLeave, setSelectedLeave] = useState<AllLeaves | null>(null);
  const [leaves, setLeaves] = useState<AllLeaves[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
          onStatusChange ={refreshLeaves}

        />
      )}
      {/* Table Container */}
      <div className="flex-1 p-4 overflow-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <LeaveHistoryTable
            leaves={leaves}
            onLeaveSelect={(leave) => setSelectedLeave(leave)}
          />
        )}
      </div>
    </div>
  );
};

export default LeaveSummary;
