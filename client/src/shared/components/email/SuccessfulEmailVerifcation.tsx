import { Link } from "react-router-dom";
interface SuccessfulEmailVerificationProps {
  role?: string;
  email?:string
};
const SuccessfulEmailVerifcation: React.FC<SuccessfulEmailVerificationProps>  = ({ role,email }) => {
  const isEmployee = role === "employee";
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-[#08AD36]">Email Verified!</h1>
        <p className="mt-4 text-[#000000]">
          Your email has been successfully verified. <br />
          Welcome to the FarLink App!
        </p>
        <Link to={isEmployee ? `/set-password?email=${encodeURIComponent(email || '')}` : "/sign-in"}>
          <button className="mt-6 bg-[#4361EE] font-semibold text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            {isEmployee ? "Set Up Password" : "Login Now"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulEmailVerifcation;
