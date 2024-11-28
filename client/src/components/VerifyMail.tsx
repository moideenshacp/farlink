import logo from "../assets/EmailLogo.png";

const VerifyMail = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 max-w-md text-center">
          <img
            src={logo}
            alt="FarLink Logo"
            className="w-56 ml-20 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-[#08AD36]">
            Please check Your Email!
          </h1>
          <p className="mt-4 text-[#000000]">
            A verification Link has been successfully sended to your email..{" "}
            <br />
            Please click on that and verify your mail!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;
