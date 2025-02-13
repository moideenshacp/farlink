import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../../api/authApi";
import useProfileValidation from "../hooks/useProfileValidation";
import { uploadFileToCloudinary } from "../../api/employeeApi";
import { setImage } from "../../redux/user/userSlice";
import Input from "./Input";
import { message } from "antd";

const DashboardProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const {
    formData,
    setFormData,
    validationErrors,
    handleChange,
    validateForm,
  } = useProfileValidation({
    fName: "",
    lName: "",
    phone: "",
    image: "",
  });

  const [initialData, setInitialData] = useState({
    fName: "",
    lName: "",
    phone: "",
    image: "",
  });
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const imageUrl = await uploadFileToCloudinary(file, setIsUploading);
      if (imageUrl) {
        setFormData({ ...formData, image: imageUrl });
      } else {
        message.error("Image upload failed. Please try again.", 2);
      }
      setIsUploading(false);
    }
  };
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        if (user?.email) {
          const res = await fetchProfile(user.email);

          if (res?.data) {
            const userProfile = {
              fName: res.data.userProfile.firstName || "",
              lName: res.data.userProfile.lastName || "",
              phone: res.data.userProfile.phone
                ? String(res.data.userProfile.phone)
                : "",
              image: res.data.userProfile.image
                ? res.data.userProfile.image
                : "https://www.w3schools.com/w3images/avatar2.png",
            };
            setFormData(userProfile);
            setInitialData(userProfile);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserProfile();
  }, [user?.email, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await updateProfile(
        formData.fName,
        formData.lName,
        formData.phone,
        user?.email,
        formData.image
      );

      if (res?.data.message === "Profile updated successfully") {
        message.success("Profile updated successfully!", 2);

        dispatch(setImage(formData.image));
      } else {
        message.error("Failed to update profile. Please try again.", 2);
      }
    } catch (err) {
      message.error("An error occurred. Please try again.", 2);

      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFormData(initialData);
  };

  return (
    <div>
      <div className="flex items-center space-x-6 mb-6">
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
            disabled={user?.role === "employee"}
          />
        </div>

        <h1 className="text-2xl font-bold text-[#333333]">
          {user?.name || "User"}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          {user?.role !== "employee" && (
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
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <Input
              label="Username"
              type="text"
              value={user?.name || ""}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
              readOnly
            />

            <Input
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              onChange={handleChange}
              name="fName"
              value={formData.fName}
              readOnly={user?.role === "employee"}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            />
            {validationErrors.fName && (
              <p className="text-red-500 text-sm">{validationErrors.fName}</p>
            )}

            <Input
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              onChange={handleChange}
              name="lName"
              value={formData.lName}
              readOnly={user?.role === "employee"}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            />
            {validationErrors.lName && (
              <p className="text-red-500 text-sm">{validationErrors.lName}</p>
            )}

            <Input
              label="Phone"
              type="text"
              placeholder="Enter your phone"
              onChange={handleChange}
              name="phone"
              value={formData.phone}
              readOnly={user?.role === "employee"}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            />
            {validationErrors.phone && (
              <p className="text-red-500 text-sm">{validationErrors.phone}</p>
            )}

            {user?.role === "employee" && (
              <Input
                label="Email"
                type="text"
                value={user?.email || ""}
                readOnly
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
              />
            )}
            {user?.position && (
              <Input
                label="Position"
                type="text"
                value={user?.position || ""}
                readOnly
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
              />
            )}
            <Input
              label="Role"
              type="text"
              value={user?.role || ""}
              readOnly
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;
