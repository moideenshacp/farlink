/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const isMeetingActive = (
  meetDate: string,
  meetTime: string,
  isDaily: boolean
) => {
  const now = new Date();

  if (isDaily) {
    // Extract only the time part of the current time
    const [meetHours, meetMinutes] = meetTime.split(":").map(Number);
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    // Consider a meeting active within a 30-minute window
    const startTime = meetHours * 60 + meetMinutes - 1; // 1 min before
    const endTime = meetHours * 60 + meetMinutes + 60; // 30 mins after
    const nowTime = currentHours * 60 + currentMinutes;

    return nowTime >= startTime && nowTime <= endTime;
  }

  //  logic for one-time meetings
  const meetingDateTime = new Date(`${meetDate}T${meetTime}`);
  const timeBeforeMeeting = new Date(meetingDateTime.getTime() - 1 * 60 * 1000);
  const timeAfterMeeting = new Date(meetingDateTime.getTime() + 30 * 60 * 1000);

  return now >= timeBeforeMeeting && now <= timeAfterMeeting;
};

const MeetingDataTable: React.FC<any> = ({
  meetData,
  onEdit,
  onDelete,
  currentPage,
  pageSize,
}) => {
  const { user } = useSelector((state: RootState) => state.user);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const isMeetingExpired = (meetDate: string, meetTime: string) => {
    const meetingDateTime = new Date(`${meetDate}T${meetTime}`);
    meetingDateTime.setMinutes(meetingDateTime.getMinutes() + 30);
    const now = new Date();
    return meetingDateTime < now;
  };
  const navigate = useNavigate();

  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left font-semibold text-[#232360]">
              SI
            </th>
            <th className="py-2 whitespace-nowrap px-4 text-left font-semibold text-[#232360]">
              Title <ArrowUpDown className="w-4 h-4 inline" />
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[#232360]">
              Date
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[#232360]">
              Time
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[#232360]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {meetData.map((meet: any, index: number) => {
            const formattedDate = new Date(meet.meetDate)
              .toISOString()
              .split("T")[0];
            const expired = isMeetingExpired(formattedDate, meet.meetTime);
            const active = isMeetingActive(
              formattedDate,
              meet.meetTime,
              meet.isDaily
            );

            return (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-600 font-medium">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="py-2 px-4 text-[#1677ff] font-medium">
                  {meet.meetTitle}
                </td>
                <td
                  className={`py-2 px-4 ${
                    meet.isDaily ? "text-green-600 font-semibold" : ""
                  }`}
                >
                  {meet.isDaily === true ? "Daily" : formattedDate}
                </td>
                <td className="py-2 px-4">{formatTime(meet.meetTime)}</td>
                <td className="py-2 px-4 flex space-x-3 items-center">
                  {(user?.role === "admin" || user?.position === "HR") && (
                    <div>
                      <button
                        onClick={() => onEdit(meet)}
                        className="p-2 text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(meet._id)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  <button
                    disabled={expired || !active}
                    onClick={() =>
                      navigate(`/video-call?roomID=${meet.meetId}`)
                    }
                    className={`px-5 py-1 rounded-3xl ${
                      expired || !active
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-[#1677ff] hover:bg-[#1356cc] text-white"
                    }`}
                  >
                    {expired
                      ? "Link Expired"
                      : active
                      ? "Join Now"
                      : "Wait for the Start"}
                  </button>
                </td>
              </tr>
            );
          })}
          {meetData.length === 0 && (
            <tr>
              <td colSpan={5}>
                <h2 className="text-gray-500 text-sm font-medium text-center pt-6">
                  No Meetings Found
                </h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingDataTable;
