/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Drawer, Input, message } from "antd";
import DatePickerField from "../../../shared/components/DatePickerField";
import SelectField from "../../../shared/components/SelectField";
import { getAllEmployees } from "../../../api/employeeApi";
import { IEmployee } from "../../../interface/IemployeeDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";


interface CreateMeetDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AssignMeetingDrawer: React.FC<CreateMeetDrawerProps> = ({ open, onClose }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [meetDetails, setMeetDetails] = useState({
    meetingTitle: "",
    meetDate: new Date(),
    meetTime: "",
    members: [],
  });
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await getAllEmployees(user?.organizationId);
        setEmployees(res?.data.employees || []);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    if (user?.organizationId) fetchEmployees();
  }, [user?.organizationId]);

  const handleInputChange = (e: any) => {
    setMeetDetails({ ...meetDetails, [e.target.name]: e.target.value });
  };

  const handleDateChange = (field: any, date: any) => {
    setMeetDetails({ ...meetDetails, [field]: date });
  };

  const handleSelectChange = (field: any, option: any) => {
    setMeetDetails({ ...meetDetails, [field]: option });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted meet details:", meetDetails);
  };

  const memberOptions = employees.map((emp) => ({
    value: emp._id,
    label: (
      <div className="flex items-center">
        <img
          src={emp.image}
          alt={emp.firstName}
          className="w-6 h-6 rounded-full mr-2"
        />
        {emp.firstName + " " + emp.lastName}
      </div>
    ),
  }));

  return (
    <Drawer
      title={
        <div className="text-center text-[#232360] font-semibold">
          Create Meeting
        </div>
      }
      closable={false}
      onClose={onClose}
      open={open}
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <label className="block -mb-3 font-semibold text-sm text-[#232360]">
          Meeting Title
        </label>
        <Input
          type="text"
          name="meetingTitle"
          value={meetDetails.meetingTitle}
          onChange={handleInputChange}
          className="p-2 border-gray-300 rounded-md"
          placeholder="Enter Title"
        />

        <div className="grid grid-cols-2 gap-4">
          <DatePickerField
            label="Meeting Date"
            value={meetDetails.meetDate}
            onChange={(date: any) => handleDateChange("meetDate", date)}
          />
          <div>
            <label className="font-semibold text-sm text-[#232360]">
              Meet Time
            </label>
            <Input
              type="time"
              name="meetTime"
              value={meetDetails.meetTime}
              onChange={handleInputChange}
              className="h-10 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <SelectField
          label="Choose Members"
          options={memberOptions}
          isMulti
          value={meetDetails.members}
          onChange={(option: any) => handleSelectChange("members", option)}
          isLoading={loading}
        />

        <button
          type="submit"
          className="bg-[#4361EE] hover:bg-[#3549bb] transition text-white font-semibold px-4 py-2 rounded-md w-full"
        >
          Create Meet
        </button>
      </form>
    </Drawer>
  );
};

export default AssignMeetingDrawer;
