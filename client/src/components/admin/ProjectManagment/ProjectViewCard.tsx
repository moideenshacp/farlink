const ProjectViewCard = () => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white max-w-sm">
      {/* Icon and Title */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-[#4361EE] text-white flex items-center justify-center rounded">
          <span className="font-bold text-lg">Ps</span>
        </div>
        <h3 className="ml-4 text-lg font-semibold text-[#4361EE]">
          Premium Support
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">
        Pink is obviously a better color. Everyone born confident and everything
        taken away.
      </p>
      <div className="border-b-2 mb-8 mt-8"></div>
      {/* Participants and Due Date */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* Participant Avatars */}
          <div className="flex -space-x-2">
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://via.placeholder.com/32"
              alt="Participant"
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://via.placeholder.com/32"
              alt="Participant"
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://via.placeholder.com/32"
              alt="Participant"
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://via.placeholder.com/32"
              alt="Participant"
            />
          </div>
          <span className="ml-2 text-sm text-black font-normal">
            23 Participants
          </span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="block text-black font-normal">07.08.22</span>
          <span className="block">Due Date</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewCard;
