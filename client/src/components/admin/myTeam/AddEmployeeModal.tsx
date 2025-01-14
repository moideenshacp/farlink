import { useEffect, useState } from "react";
import { addEmployee, fetchPositions, uploadImageToCloudinary } from "../../../api/employeeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../../shared/components/Input";

const AddEmployeeModal = ({ toggleModal }: { toggleModal: () => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    position: "",
    email: "",
    gender: "male",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const {user} = useSelector((state:RootState)=>state.user)
  const [teams, setTeams] = useState([]); 
  const organizationId = useSelector(
    (state: RootState) => state.user?.user?.organizationId
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImageUrl(null);
  };
    useEffect(()=>{
      const fetchAllPositions = async()=>{
        try {
          const res = await fetchPositions(user?.organizationId)
  
          console.log(res.data.result.positions,"All positions")
          setTeams(res.data.result.positions)
          
        } catch (error) {
          console.log(error);
          
        }
      }
      fetchAllPositions()
    },[user?.organizationId])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please upload an image before submitting!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    let uploadedImageUrl = null;
    if (selectedFile) {
      console.log("selected file is there");

      uploadedImageUrl = await uploadImageToCloudinary(
        selectedFile,
        setIsUploading
      );
      setImageUrl(uploadedImageUrl);
    }
    console.log("imggggggggggggggggggggggg", uploadedImageUrl);
    console.log("imgggggggggggggggggggggggurl----", imageUrl);
    const dataToSubmit = {
      ...formData,
      image: uploadedImageUrl,
      organizationId: organizationId,
    };
    try {
      const res = await addEmployee(dataToSubmit);
      console.log(res);
      if (res?.data.message === "Employee added successfully") {
        toast.success("Employee added successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setFormData({
          userName: "",
          position: "",
          email: "",
          gender: "male",
          firstName: "",
          lastName: "",
          phone: "",
        });
        setSelectedFile(null);
      }else{
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add employee. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Personal Data */}
        <div className="col-span-2 font-bold">Personal data</div>
        <Input
          label="User Name"
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Enter user name"
        />
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
        />

         <div>
          <label className="block mb-1 font-medium text-[#232360]">Position</label>
          <select
            className="w-full p-2 border rounded focus:outline-none"
            name="position"
            onChange={handleChange}
            value={formData.position}
          >
            {teams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
          </select>
        </div>
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter last name"
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        <div>
          <label className="block mb-1 font-medium text-[#232360]">Gender</label>
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

        {/* Identity Document Upload */}
        <div className="col-span-2 mt-2">
          <label className="block font-bold mb-1">Employee Image</label>

          {/* Show selected file */}
          {selectedFile ? (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-500">📎 {selectedFile.name}</span>
              <button
                onClick={handleRemoveFile}
                className="text-gray-500  hover:text-gray-800"
              >
                &times;
              </button>
            </div>
          ) : (
            <div className="text-gray-500 mb-2">No file selected</div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* Upload Button */}
          <label
            htmlFor="fileInput"
            className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer inline-block"
          >
            {isUploading
              ? "Uploading..."
              : selectedFile
              ? "Change Image"
              : "Upload"}
          </label>
          <div className="flex justify-end gap-2  mt-6">
            <button
              type="button"
              onClick={() => {
                toggleModal();
                window.location.reload();
              }}
              className="border border-gray-300 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4361EE] text-white py-2 px-4 rounded"
              disabled={isUploading}
            >
              {isUploading ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddEmployeeModal;
