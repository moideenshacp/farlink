/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Drawer, Input, message } from "antd";
import DatePickerField from "../../../shared/components/DatePickerField";
import SelectField from "../../../shared/components/SelectField";
import { fetchEmployeesByIds, getAllEmployees } from "../../../api/employeeApi";
import { IEmployee } from "../../../interface/IemployeeDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { createMeet, editMeet } from "../../../api/meetApi";

interface CreateMeetDrawerProps {
  open: boolean;
  onClose: () => void;
  fetchMeetings: () => void;
  isEditMode?: boolean;
  editMeetDetails?: any;
}

const AssignMeetingDrawer: React.FC<CreateMeetDrawerProps> = ({
  open,
  onClose,
  fetchMeetings,
  isEditMode,
  editMeetDetails,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [meetDetails, setMeetDetails] = useState({
    meetTitle: "",
    meetDate: new Date(),
    meetTime: "",
    members: [],
    organizationId: user?.organizationId || "",
  });

  useEffect(() => {
    const fetchMembers = async () => {
      if (isEditMode && editMeetDetails) {
        try {
          const allEmployeeIds = [...new Set(editMeetDetails.members)];

          // Fetch employee details based on IDs
          const employeeRes = await fetchEmployeesByIds(allEmployeeIds);

          if (employeeRes?.data?.employees) {
            const employeeMap = new Map(
              employeeRes.data.employees.map((employee: any) => [
                employee._id,
                employee,
              ])
            );

            // Format members with names and images
            const formattedMembers = editMeetDetails.members
              .map((memberId: string) => {
                const employee = employeeMap.get(memberId) as
                  | IEmployee
                  | undefined;

                if (!employee) {
                  // Skip invalid member IDs
                  return null;
                }

                return {
                  value: employee._id,
                  label: (
                    <div className="flex items-center">
                      {employee.image && (
                        <img
                          src={employee.image}
                          alt={employee.firstName}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                      )}
                      {employee.firstName + " " + employee.lastName}
                    </div>
                  ),
                };
              })
              .filter((member: any) => member !== null); // Filter out null values

            setMeetDetails({
              meetTitle: editMeetDetails.meetTitle,
              meetDate: new Date(editMeetDetails.meetDate),
              meetTime: editMeetDetails.meetTime,
              members: formattedMembers,
              organizationId: user?.organizationId || "",
            });

            setMeetDetails({
              meetTitle: editMeetDetails.meetTitle,
              meetDate: new Date(editMeetDetails.meetDate),
              meetTime: editMeetDetails.meetTime,
              members: formattedMembers,
              organizationId: user?.organizationId || "",
            });
          }
        } catch (error) {
          console.error("Failed to fetch members", error);
        }
      }
    };

    fetchMembers();
  }, [isEditMode, editMeetDetails, user?.organizationId]);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!meetDetails.meetTitle.trim()) {
      message.error("Please enter a valid Title");
      return;
    }
    if (!meetDetails.meetTime.trim()) {
      message.error("Please select a valid Time");
      return;
    }
    if (meetDetails.members.length === 0) {
      message.error("Please select a atleast one member");
      return;
    }
    const submitMeetDetails = {
      ...meetDetails,
      members: meetDetails.members.map((member: any) => member.value),
    };
    try {
      let res;
      if (isEditMode) {
        res = await editMeet(editMeetDetails._id,submitMeetDetails);
      } else {
        res = await createMeet(submitMeetDetails);
      }
      if (res.data.message.includes("sucessfully..")) {
        message.success(
          isEditMode
            ? "Meeting updated successfully."
            : "Meeting created successfully."
        );
        onClose();
        fetchMeetings();
        setMeetDetails({
          meetTitle: "",
          meetDate: new Date(),
          meetTime: "",
          members: [],
          organizationId: user?.organizationId || "",
        });
      } else {
        message.error("Failed to create Meet,please try again..");
      }
    } catch (error) {
      console.log(error);
    }
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
          {isEditMode ? "Edit Meeting" : "Create Meeting"}
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
          name="meetTitle"
          value={meetDetails.meetTitle}
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
          {isEditMode ? "Update Meet" : "Create Meet"}
        </button>
      </form>
    </Drawer>
  );
};

export default AssignMeetingDrawer;
