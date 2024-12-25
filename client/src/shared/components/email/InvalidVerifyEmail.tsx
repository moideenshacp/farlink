import { Link } from "react-router-dom";
type SuccessfulEmailVerificationProps = {
  role?: string;
};
const InvalidVerifyEmail: React.FC<SuccessfulEmailVerificationProps>  = ({role}) => {
  const isEmployee = role === "employee";

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-[#08AD36]">
          Your Verification Link is Expired
        </h1>
        <p className="mt-4 text-[#000000]">
          Your email verification link has expired. <br />
          {isEmployee
            ? "Please ask your administrator to send a new invitation link."
            : "Please request a new verification link."}
        </p>
        {!isEmployee && (
          <Link to="/sign-up">
            <button className="mt-6 bg-[#4361EE] font-semibold text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Go to Sign-Up
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default InvalidVerifyEmail;
