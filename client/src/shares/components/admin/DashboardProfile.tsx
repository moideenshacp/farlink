import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../../../api/authApi";
import { toast, ToastContainer } from "react-toastify";
import useProfileValidation from "../../hooks/useProfileValidation";

const DashboardProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state: RootState) => state.user);

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
  });

  const [initialData, setInitialData] = useState({
    fName: "",
    lName: "",
    phone: "",
  });

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
        user?.email
      );

      if (res?.data.message === "Profile updated successfully") {
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFormData(initialData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-3">
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

        <div className="form-group">
          <label className="block font-medium text-[#232360]">Username</label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            value={user?.name || ""}
            readOnly
          />
        </div>

        <div className="form-group">
          <label className="block font-medium text-[#232360]">First Name</label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            placeholder="Enter your first name"
            onChange={handleChange}
            name="fName"
            value={formData.fName}
          />
          {validationErrors.fName && (
            <p className="text-red-500 text-sm">{validationErrors.fName}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block font-medium text-[#232360]">Last Name</label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            placeholder="Enter your last name"
            onChange={handleChange}
            name="lName"
            value={formData.lName}
          />
          {validationErrors.lName && (
            <p className="text-red-500 text-sm">{validationErrors.lName}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block font-medium text-[#232360]">Phone</label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            placeholder="Enter your phone"
            onChange={handleChange}
            name="phone"
            value={formData.phone}
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-sm">{validationErrors.phone}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block font-medium text-[#232360]">Role</label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            defaultValue={user?.role || ""}
            readOnly
          />
        </div>
      </div>

      {/* {error && <div className="text-red-500 text-sm">{error}</div>} */}
      <ToastContainer />
    </form>
  );
};

export default DashboardProfile;
