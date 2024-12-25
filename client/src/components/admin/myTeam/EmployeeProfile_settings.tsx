import { useState } from "react";
import { sendInvitationEmployee } from "../../../api/employeeApi";
import { toast, ToastContainer } from "react-toastify";

interface employeeEmail {
  email: string;
  verified: boolean;
}

const EmployeeProfile_settings: React.FC<employeeEmail> = ({
  email,
  verified,
}) => {
  const [emailSendStatus, setEmailSendStatus] = useState(verified);
  const [isLoading, setIsLoading] = useState(false);

  const sendInvitation = async () => {
    try {
      setIsLoading(true);
      const res = await sendInvitationEmployee(email);
      console.log(res);
      if (res.data.message === "Invitation sended successfully") {
        toast.success("Invitation sended successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setEmailSendStatus(true);
      } else {
        toast.error(
          "Failed to send the Invitation. Please try again.",
          {
            position: "top-right",
            autoClose: 2000,
          }
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
          disabled={isLoading} // Disable button while loading
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
        <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600">
          Terminate Employee
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeProfile_settings;
