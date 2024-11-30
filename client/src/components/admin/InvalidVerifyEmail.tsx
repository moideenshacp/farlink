import { Link } from "react-router-dom";

const InvalidVerifyEmail = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-[#08AD36]">
          Your Verification link is expired..
        </h1>
        <p className="mt-4 text-[#000000]">
          Your email verification link has been expired. <br />
          Please request a new verification link.!!
        </p>
        <Link to="/sign-up">
          <button className="mt-6 bg-[#4361EE] font-semibold text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            Go to sign-up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InvalidVerifyEmail;
