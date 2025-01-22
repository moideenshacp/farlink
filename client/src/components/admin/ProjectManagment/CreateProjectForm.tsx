import { useState } from "react";
import { DatePicker } from "antd";
import Input from "../../../shared/components/Input";
import { DeleteOutlined } from "@ant-design/icons";

const CreateProjectForm = () => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const membersList = ["Member 1", "Member 2", "Member 3", "Member 4"]; // Example members list

  const handleAddMember = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMember = e.target.value;
    if (
      selectedMember !== "Select Members" &&
      !selectedMembers.includes(selectedMember)
    ) {
      setSelectedMembers([...selectedMembers, selectedMember]);
    }
  };

  const handleRemoveMember = (member: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member));
  };

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="menu bg-white text-base-content min-h-full w-96 p-4">
        <form className="space-y-4 p-4">
          <div>
            <Input
              type="text"
              label="Project Name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Project Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#232360]">
              Project Description
            </label>
            <textarea
              placeholder="Enter Project Description"
              className="w-full border border-gray-300 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-sm text-[#232360]">
                Start Date
              </label>
              <DatePicker className="w-full border rounded-lg p-2 focus:outline-none" />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-sm text-[#232360]">
                End Date
              </label>
              <DatePicker className="w-full border rounded-lg p-2 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#232360]">
              Choose Manager
            </label>
            <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Manager</option>
              <option>Manager 1</option>
              <option>Manager 2</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#232360]">
              Choose Members
            </label>
            <div className="space-y-2">
              <select
                onChange={handleAddMember}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select Members</option>
                {membersList.map((member, index) => (
                  <option key={index} value={member}>
                    {member}
                  </option>
                ))}
              </select>
              <ul className="space-y-1 mt-2">
                {selectedMembers.map((member, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b border-gray-300 py-2"
                  >
                    <span className="text-gray-800">{member}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <DeleteOutlined />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
