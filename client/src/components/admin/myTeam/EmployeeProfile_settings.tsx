import { useState } from "react";
import {
  sendInvitationEmployee,
  terminateEmployee,
} from "../../../api/employeeApi";
import ConfirmationModal from "../../../shared/components/ConfirmationModal";
import { message } from "antd";

interface employeeEmail {
  email: string;
  verified: boolean;
  isActive: boolean;
}

const EmployeeProfile_settings: React.FC<employeeEmail> = ({
  email,
  verified,
  isActive,
}) => {
  const [emailSendStatus, setEmailSendStatus] = useState(verified);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState(isActive);
  const [showModal, setShowModal] = useState(false);

  console.log(isActive, "isactive");

  const sendInvitation = async () => {
    try {
      setIsLoading(true);
      const res = await sendInvitationEmployee(email);
      console.log(res);
      if (res.data.message === "Invitation sended successfully") {

        message.success("Invitation sended successfully!", 2);

        setEmailSendStatus(true);
      } else {

        message.error("Failed to send the Invitation. Please try again.", 2);

      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const terminate = async () => {

    try {
      const res = await terminateEmployee(email);
      console.log(res, "terminae resss");
      if (res?.data.message === "Employee terminated successfully") {
        setActiveStatus(res.data.isActive);
        console.log(isActive);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Employee Invitation</h3>
        <p className="text-sm text-[#6A7181] mb-4">
          Send an invitation to the employee for access to the FarL
          <span className="text-blue-800">i</span>nk app.
        </p>
        <button
          onClick={sendInvitation}
          className={`bg-[#4361EE] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#4361EE] ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading
            ? "Sending..."
            : emailSendStatus
            ? "Resend Invitation"
            : "Send Invitation"}
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold ">Employee Termination</h3>
        <p className="text-sm text-[#6A7181] mb-4">
          Terminate the employee to remove their access from the FarL
          <span className="text-blue-800">i</span>nk app.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600"
        >
          {activeStatus ? "Block Employee" : "Un-Block Employee"}
        </button>
      </div>
      {showModal && (
        <ConfirmationModal
          message={`Are you sure you want to ${
            activeStatus ? "block" : "unblock"
          } this employee?`}
          onConfirm={() => {
            setShowModal(false);
            terminate();
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default EmployeeProfile_settings;
