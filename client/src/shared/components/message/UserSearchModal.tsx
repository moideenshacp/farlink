/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Search, X, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getAllEmployees } from "../../../api/authApi";

interface UserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: any) => void;
  isGroup?: boolean;
  onCreateGroup?: (groupName: string, members: any[]) => void;
}

const UserSearchModal: React.FC<UserSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectUser,
  isGroup = false,
  onCreateGroup,
}) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [groupName, setGroupName] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    const fetchAllUsers = async () => {
      const allUser = await getAllEmployees(user?.organizationId);
      if (allUser?.data.message === "sucess") {
        const filtered = allUser.data.employees.filter(
          (emp: any) => emp._id !== user?._id
        );
        setEmployees(filtered);
      }
    };
    fetchAllUsers();
  }, [user?.organizationId, user?._id]);

  const filteredUsers = employees.filter(
    (employee: any) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (employee: any) => {
    if (selectedUsers.some((u) => u._id === employee._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== employee._id));
    } else {
      setSelectedUsers([...selectedUsers, employee]);
    }
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      setErr("Please enter a valid group name!");
      return;
    }
    if (selectedUsers.length <= 1) {
      setErr("Please select at least two members!");
      return;
    }
    if (onCreateGroup) {
      onCreateGroup(groupName, selectedUsers);
      setSelectedUsers([]);
      setGroupName("");
      setErr("");
    }
  };

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={384}
      bodyStyle={{ padding: 0, borderRadius: "8px", overflow: "hidden" }}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#232360]">
            {isGroup ? "Create Group" : "Add New Chat"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              className="bg-transparent outline-none flex-1 text-sm"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Group Name Input */}
        {isGroup && (
          <div className="p-4 border-b">
            <input
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Enter group name..."
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                setErr("");
              }}
            />

            {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
          </div>
        )}

        {/* Employee List */}
        <div className="overflow-y-auto scrollbar-thin flex-1">
          {filteredUsers.map((employee: any) => (
            <div
              key={employee._id}
              className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b ${
                isGroup && selectedUsers.some((u) => u._id === employee._id)
                  ? "bg-gray-200"
                  : ""
              }`}
              onClick={() =>
                isGroup ? toggleUserSelection(employee) : onSelectUser(employee)
              }
            >
              <img
                src={employee.image}
                alt={employee.firstName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-medium text-[#232360]">
                  {`${employee.firstName} ${employee.lastName}`}
                </h3>
                <p className="text-sm text-gray-500">
                  {employee.position || "Owner"}
                </p>
              </div>
              {isGroup &&
                (selectedUsers.some((u) => u._id === employee._id) ? (
                  <X className="w-5 h-5 text-red-500" />
                ) : (
                  <Users className="w-5 h-5 text-gray-400" />
                ))}
            </div>
          ))}
        </div>

        {/* Create Group Button */}
        {isGroup && selectedUsers.length > 1 && (
          <div className="p-4 border-t">
            <button
              className="w-full bg-[#1677ff] text-white rounded-lg p-2 text-sm font-medium hover:bg-[#1668cc] transition-colors"
              onClick={handleCreateGroup}
            >
              Create Group
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserSearchModal;
