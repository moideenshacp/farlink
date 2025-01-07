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
import Input from "../../../shared/components/Input";

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
    setErrors({});
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
        <Input
          label="User Name"
          type="text"
          placeholder="Enter the userName of employee"
          onChange={handleChange}
          name="userName"
          value={formData.userName}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.userName && <p className="text-red-600">{errors.userName}</p>}

        <Input
          label="First Name"
          type="text"
          placeholder="Enter the First name of employee"
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter the Last name of employee"
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.lastName && <p className="text-red-600">{errors.lastName}</p>}

        <Input
          label="Position"
          type="text"
          placeholder="Enter the position of employee"
          onChange={handleChange}
          name="position"
          value={formData.position}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.position && <p className="text-red-600">{errors.position}</p>}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-[#232360]">
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

        <Input
          label="Date of Joining"
          type="date"
          placeholder="Enter the name of employee"
          onChange={handleChange}
          name="dateOfJoining"
          value={formData.dateOfJoining}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.dateOfJoining && (
          <p className="text-red-600">{errors.dateOfJoining}</p>
        )}

        <Input
          label="Date of Birth"
          type="date"
          onChange={handleChange}
          name="dateOfBirth"
          value={formData.dateOfBirth}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.dateOfBirth && (
          <p className="text-red-600">{errors.dateOfBirth}</p>
        )}

        <Input
          label="Contact Number"
          type="tel"
          placeholder="Enter the phone number"
          onChange={handleChange}
          name="phone"
          value={formData.phone}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.phone && <p className="text-red-600">{errors.phone}</p>}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.email && <p className="text-red-600">{errors.email}</p>}

        <h2 className="text-lg font-semibold mt-6 mb-4">Educational Details</h2>

        <Input
          label="Highest Qualification"
          type="text"
          placeholder="Enter the  Highest qualification"
          onChange={handleChange}
          name="highestQualification"
          value={formData.highestQualification}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.highestQualification && (
          <p className="text-red-600">{errors.highestQualification}</p>
        )}
        <Input
          label="Name of Institution"
          type="text"
          placeholder="Enter Name of Institution"
          onChange={handleChange}
          name="institution"
          value={formData.institution}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.institution && (
          <p className="text-red-600">{errors.institution}</p>
        )}

        <Input
          label="Year of Qualification"
          type="text"
          placeholder="Enter Year of Qualification"
          onChange={handleChange}
          name="qualificationYear"
          value={formData.qualificationYear}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.qualificationYear && (
          <p className="text-red-600">{errors.qualificationYear}</p>
        )}

        <h2 className="text-lg font-semibold mt-6 mb-4">Family Details</h2>

        <Input
          label="Father's Name"
          type="text"
          placeholder="Enter Father's Name"
          onChange={handleChange}
          name="fatherName"
          value={formData.fatherName}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.fatherName && (
          <p className="text-red-600">{errors.fatherName}</p>
        )}
        <Input
          label="Profession"
          type="text"
          placeholder="Enter Father's Profession"
          onChange={handleChange}
          name="fatherProfession"
          value={formData.fatherProfession}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.fatherProfession && (
          <p className="text-red-600">{errors.fatherProfession}</p>
        )}

        <Input
          label="Mother's Name"
          type="text"
          placeholder="Enter Mother's Name"
          onChange={handleChange}
          name="motherName"
          value={formData.motherName}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.motherName && (
          <p className="text-red-600">{errors.motherName}</p>
        )}

        <Input
          label="Mother's Name"
          type="text"
          placeholder="Enter Mother's Profession"
          onChange={handleChange}
          name="motherProfession"
          value={formData.motherProfession}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4361EE] py-1"
        />
        {errors.motherProfession && (
          <p className="text-red-600">{errors.motherProfession}</p>
        )}
      </div>
      <ToastContainer />
    </form>
  );
};

export default EmployeeProfile_Profile;
