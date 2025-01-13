import { useState } from "react";
import AddEmployeeModal from "./AddEmployeeModal";

const AddEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div >
      {/* Button to Open Modal */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={toggleModal}
          className="flex items-center bg-[#4361EE] py-3 px-6 rounded-full text-white gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          <span className="font-semibold">Add Employee</span>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Add Employee</h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 text-2xl hover:text-gray-800"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <AddEmployeeModal toggleModal={toggleModal} />
          
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
