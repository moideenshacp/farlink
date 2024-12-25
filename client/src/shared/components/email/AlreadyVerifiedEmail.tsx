import { Link } from "react-router-dom";
type SuccessfulEmailVerificationProps = {
  role?: string;
};
const AlreadyVerifiedEmail: React.FC<SuccessfulEmailVerificationProps> = ({role}) => {
  const isEmployee = role === "employee";

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-[#08AD36]">
          Email is Already Verified!
        </h1>
        <p className="mt-4 text-[#000000]">
          Your email has been already verified successfully. <br />
          Welcome to the FarLink App!
        </p>
        <Link to={isEmployee ? "/set-password" : "/sign-in"}>
        <button className="mt-6 bg-[#4361EE] font-semibold text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          {isEmployee ? "Set Up Password" : "Login Now"}
        </button>
      </Link>
      </div>
    </div>
  );
};

export default AlreadyVerifiedEmail;
