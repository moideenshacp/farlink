/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Search, X } from "lucide-react";
import { getAllEmployees } from "../../../api/employeeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";


interface UserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: any) => void;
}

const UserSearchModal: React.FC<UserSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectUser,
}) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const allUser = await getAllEmployees(user?.organizationId);

      if (allUser?.data.message === "sucess") {
        setEmployees(allUser.data.employees);
      }
    };
    fetchAllUsers();
  }, [user?.organizationId]);

  // Filter employees by firstName or position (adjust the filtering as needed)
  const filteredUsers = employees.filter(
    (employee: any) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h2 className="text-lg font-semibold text-[#232360]">Add New Chat</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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

        {/* Employee List */}
        <div className="overflow-y-auto scrollbar-thin flex-1">
          {filteredUsers.map((employee: any) => (
            <div
              key={employee._id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b"
              onClick={() => {
                onSelectUser(employee);
                onClose();
              }}
            >
              <img
                src={employee.image}
                alt={employee.firstName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-[#232360]">{`${employee.firstName} ${employee.lastName}`}</h3>
                <p className="text-sm text-gray-500">{employee.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default UserSearchModal;
