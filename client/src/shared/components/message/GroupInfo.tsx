/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar } from "antd";

interface GroupInfoProps {
  chat: any;
}

const GroupInfo: React.FC<GroupInfoProps> = ({ chat }) => {
  const membersCount = chat.participants.length;

  return (
    <div>
      <p className="font-medium">Group Name: {chat.groupName}</p>
      <br />
      <p className="text-sm text-gray-500 mt-1">{membersCount} members</p>
      <div className="mt-2">
        {chat.participants?.map((member: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between gap-2 py-1"
          >
            <div className="flex items-center gap-2">
              <Avatar src={member.image} className="w-6 h-6">
                {!member.image &&
                  `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`.toUpperCase()}
              </Avatar>
              <span className="text-sm">{`${member.firstName} ${member.lastName}`}</span>
            </div>
            {member._id === chat.groupAdmin && (
              <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded">
                Admin
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupInfo;
