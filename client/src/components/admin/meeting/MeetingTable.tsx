/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MeetingDataTable from "../../../shared/components/MeetingDataTable";
import AssignMeetingDrawer from "./AssignMeetingDrawer";
import ConfirmationModal from "../../../shared/components/ConfirmationModal";
import { deleteMeet } from "../../../api/meetApi";
import { message } from "antd";

const MeetingTable: React.FC<any> = ({
  meetDatas,
  fetchMeetings,
  currentPage,
  pageSize,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMeetDetails, setEditMeetDetails] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState<string | null>(null);

  const handleEdit = (meeting: any) => {
    setEditMeetDetails(meeting);
    setIsEditMode(true);
    setDrawerOpen(true);
  };

  const handleDeleteClick = (meetingId: string) => {
    setMeetingToDelete(meetingId);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!meetingToDelete) return;

    try {
      const res = await deleteMeet(meetingToDelete);
      if (res.data.message === "Meet deleted sucessfully..") {
        message.success("Meet deleted successfully.");
        fetchMeetings();
      } else {
        message.error("Error deleting meeting.");
      }
      fetchMeetings();
    } catch (error) {
      console.error("Error deleting meeting:", error);
      message.error("Failed to delete meeting.");
    }

    setIsModalOpen(false);
    setMeetingToDelete(null);
  };

  return (
    <div>
      <MeetingDataTable
        meetData={meetDatas}
        currentPage={currentPage}
        pageSize={pageSize}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <AssignMeetingDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setIsEditMode(false);
          setEditMeetDetails(null);
        }}
        fetchMeetings={fetchMeetings}
        isEditMode={isEditMode}
        editMeetDetails={editMeetDetails}
      />

      {isModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this meeting?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MeetingTable;
