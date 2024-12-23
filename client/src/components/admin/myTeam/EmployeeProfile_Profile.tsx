import React, { useRef, useState } from "react";
import {
  updateEmployeeDetails,
  uploadImageToCloudinary,
} from "../../../api/employeeApi";
import {
  EmployeeProfileProps,
  updateEmployeeFormErrors,
} from "../../../interface/IemployeeProfileProps";
import { toast, ToastContainer } from "react-toastify";
import { employeeProfileUpdate } from "../../../validations/employeeProfileUpdate";

const EmployeeProfile_Profile: React.FC<EmployeeProfileProps> = ({
  employee,
}) => {
  console.log(employee, "employee");

  const [isUploading, setIsUploading] = useState(false);
  const initialFormData = useRef({
    employeeId: employee._id,
    userName: employee.userName,
    firstName: employee.firstName,
    lastName: employee.lastName,
    phone: employee.phone,
    email: employee.email,
    position: employee.position,
    gender: employee.gender,
    image: employee.image,
    dateOfJoining: employee.dateOfJoining
      ? employee.dateOfJoining.split("T")[0]
      : "",
    dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.split("T")[0] : "",
    highestQualification: employee.highestQualification || "",
    institution: employee.institution || "",
    qualificationYear: employee.qualificationYear || "",
    fatherName: employee.fatherName || "",
    fatherProfession: employee.fatherProfession || "",
    motherName: employee.motherName || "",
    motherProfession: employee.motherProfession || "",
  });
  const [formData, setFormData] = useState(initialFormData.current);
  const [errors, setErrors] = useState<updateEmployeeFormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setIsUploading(true);
      const imageUrl = await uploadImageToCloudinary(
        selectedFile,
        setIsUploading
      );
      if (imageUrl) {
        setFormData({ ...formData, image: imageUrl });
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = employeeProfileUpdate.validate(formData, {
        abortEarly: false,
      });
      if (error) {
        const newErrors: Record<string, string> = error.details.reduce(
          (acc, curr) => {
            // Ensure that acc has the correct type as an object with string keys and string values
            acc[curr.path[0] as string] = curr.message;
            return acc;
          },
          {} as Record<string, string>
        );
        setErrors(newErrors);
      }
      const res = await updateEmployeeDetails(formData);
      console.log(res?.data.message);

      if (res?.data.message === "employee updated") {
        toast.success("Employee Profile updated successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error(
          "Failed to update the profile employee. Please try again.",
          {
            position: "top-right",
            autoClose: 2000,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData.current);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mt-2 flex justify-end space-x-4">
          <button
            type="button"
            className="bg-white border-2 border-[#D9DADE] py-2 px-6 rounded-xl"
            onClick={handleClear}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#4361EE] py-2 px-6 rounded-xl text-white"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Save"}
          </button>
        </div>
        <div className="flex mb-6 ">
          <div className="flex-shrink-0">
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={formData.image}
                alt="User"
                className="w-24 h-24 rounded-full"
              />
              {isUploading && <p className="text-blue-500">Uploading...</p>}
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            User Name
          </label>
          <input
            type="text"
            placeholder="Enter the userName of employee"
            name="userName"
            onChange={handleChange}
            value={formData.userName}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.userName && <p>{errors.userName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter the name of employee"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter the name of employee"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.lastName && <p>{errors.lastName}</p>}
          <div className="mb-4 mt-4">
            <label className="block text-sm font-medium text-[#6A7181]">
              Position
            </label>
            <input
              type="text"
              placeholder="Enter the position of employee"
              name="position"
              onChange={handleChange}
              value={formData.position}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
            />
            {errors.position && <p>{errors.position}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#6A7181]">
              Gender
            </label>
            <select
              className="w-full p-2 border rounded focus:outline-none"
              name="gender"
              onChange={handleChange}
              value={formData.gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Date of Joining
          </label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.dateOfJoining && <p>{errors.dateOfJoining}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Contact Number
          </label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            placeholder="Enter the phone number"
            value={formData.phone}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter Email"
            value={formData.email}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-4">Educational Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Highest Qualification
          </label>
          <input
            type="text"
            name="highestQualification"
            onChange={handleChange}
            value={formData.highestQualification}
            placeholder="Enter Education details"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.highestQualification && <p>{errors.highestQualification}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Name of Institution
          </label>
          <input
            type="text"
            name="institution"
            onChange={handleChange}
            value={formData.institution}
            placeholder="Enter Name of Institution"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.institution && <p>{errors.institution}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Year of Qualification
          </label>
          <input
            type="text"
            name="qualificationYear"
            onChange={handleChange}
            value={formData.qualificationYear}
            placeholder="Enter Year of Qualification"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.qualificationYear && <p>{errors.qualificationYear}</p>}
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-4">Family Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Father's Name
          </label>
          <input
            type="text"
            name="fatherName"
            onChange={handleChange}
            value={formData.fatherName}
            placeholder="Enter Father's Name"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.fatherName && <p>{errors.fatherName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Profession
          </label>
          <input
            type="text"
            name="fatherProfession"
            value={formData.fatherProfession}
            onChange={handleChange}
            placeholder="Enter Father's Profession"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.fatherProfession && <p>{errors.fatherProfession}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Mother's Name
          </label>
          <input
            type="text"
            placeholder="Enter Mother's Name"
            name="motherName"
            onChange={handleChange}
            value={formData.motherName}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.motherName && <p>{errors.motherName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6A7181]">
            Profession
          </label>
          <input
            type="text"
            name="motherProfession"
            onChange={handleChange}
            value={formData.motherProfession}
            placeholder="Enter Mother's Profession"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
          />
          {errors.motherProfession && <p>{errors.motherProfession}</p>}
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default EmployeeProfile_Profile;
