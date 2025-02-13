import React, { useState } from "react";
import { MoreVertical, Users, Edit } from "lucide-react";
import { ChatHeaderProps } from "../../../interface/Imessage";
import { Avatar, Dropdown, Modal, Input, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import GroupInfo from "./GroupInfo";
import { updateChat } from "../../../api/chatApi";

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, fetchChats }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState(chat.groupName || "");
  const membersCount = chat.participants.length;
  const { user } = useSelector((state: RootState) => state.user);

  const handleEditGroupName = async () => {
    const updatedChat = { groupName: newGroupName };

    if (!newGroupName.trim()) {
      message.error("Group name cannot be empty");
      return;
    }
    try {
      const res = await updateChat(chat.id?.toString(), updatedChat);
      if (res?.data?.message === "Chat Updated successfully") {
        chat.groupName = newGroupName;
        fetchChats?.();
        message.success("Group name updated successfully");
      } else {
        message.error("Failed to update group name");
      }
    } catch (error) {
      console.error("Error updating group name:", error);
      message.error("Something went wrong!");
    }

    setIsEditModalOpen(false);
  };

  const groupMenuItems = {
    items: [
      {
        key: "1",
        label: "View Group Info",
        icon: <Users className="w-4 h-4" />,
        children: [
          {
            key: "1-1",
            label: <GroupInfo chat={chat} />,
          },
        ],
      },
      ...(chat.groupAdmin === user?._id
        ? [
            {
              key: "2",
              label: "Edit Group Name",
              icon: <Edit className="w-4 h-4" />,
              onClick: () => {
                setNewGroupName(chat.groupName || "");
                setIsEditModalOpen(true);
              },
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <div className="flex items-center mt-5  justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar
              src={chat.isGroup ? undefined : chat.image}
              alt={chat.name}
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"
            >
              {chat.isGroup ? chat.groupName?.toUpperCase() || "G" : null}
            </Avatar>{" "}
            {chat.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-[#232360]">
              {chat.isGroup ? chat.groupName || newGroupName : chat.name}
            </h3>

            {chat.isGroup ? (
              <p className="text-sm text-gray-500">{membersCount} members</p>
            ) : (
              <p className="text-sm text-gray-500">
                {chat.isOnline ? "Online" : "Offline"}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {chat.isGroup && (
            <Dropdown
              menu={groupMenuItems}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-[#1677ff]" />
              </button>
            </Dropdown>
          )}
        </div>
      </div>

      <Modal
        title="Edit Group Name"
        open={isEditModalOpen}
        onOk={handleEditGroupName}
        onCancel={() => {
          setNewGroupName(chat.groupName || "");
          setIsEditModalOpen(false);
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="mt-4">
          <Input
            placeholder="Enter new group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            prefix={<Edit className="w-4 h-4 text-gray-400" />}
            className="w-full"
          />
        </div>
      </Modal>
    </>
  );
};

export default ChatHeader;
