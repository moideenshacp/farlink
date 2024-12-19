interface EmployeeProfileCardProps {
    image: string;
    name: string
    position: string
    phone: string;
    email: string
}


const EmployeeCard: React.FC<EmployeeProfileCardProps> = ({
    image,
    name,
    position,
    phone,
    email,
  }) => {
    return (
      <div className="w-80 bg-white shadow-lg rounded-2xl p-4">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={image}
            alt={`${name}'s profile`}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
        {/* Name and Position */}
        <div className="text-center mt-4">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-500 text-sm">{position}</p>
        </div>
        {/* Contact Info */}
        <div className="mt-6 flex flex-col items-center space-y-4">
          <div className="flex items-center text-gray-600 space-x-2">
            <span className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>{phone}</span>
          </div>
          <div className="flex items-center text-gray-600 space-x-2">
            <span className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
              </svg>
            </span>
            <span>{email}</span>
          </div>
        </div>
      </div>
    );
  };
  
  

export default EmployeeCard