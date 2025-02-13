import React from "react";
import logo from "../../../assets/EmailLogo.png";

const EmptyChatScreen: React.FC = () => {
  return (
    <div className="flex flex-col pl-32 items-center  mt-[12%] h-full text-gray-500">
      <div className="mb-4">
        <img src={logo} alt="FarLink Logo" className="w-60 h-20 opacity-85" />
      </div>
      <h2 className="text-xl font-semibold text-[#232360]">FarLink</h2>
      <p className="text-sm text-center text-[#232360] px-4 mt-2">
        Connect seamlessly across devices. Communicate without interruptions.
        Stay linked with FarLink.
      </p>
      <p className="text-xs mt-4 text-[#232360] opacity-70">
        🔒 Secure and private conversations
      </p>
    </div>
  );
};

export default EmptyChatScreen;
