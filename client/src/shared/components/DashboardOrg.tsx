import React, { useEffect, useState } from "react";
import {
  fetchCompanyProfile,
  updateCompanyProfile,
} from "../../api/companyApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCompanyUpdate } from "../hooks/useCompanyValidations";
import { message } from "antd";

const DashboardOrg = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const [initialData, setInitialData] = useState({
    name: "",
    industry: "",
    description: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  const { formData, errors, handleChange, validate, setFormData } =
    useCompanyUpdate(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (validate()) {
        const res = await updateCompanyProfile(formData, user?.email);
        if (res?.data.message === "organization data fetched successfully") {
          message.success("Organization updated successfully!", 2);
        } else {
          message.error("Failed to update profile.", 2);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        if (user?.email) {
          const res = await fetchCompanyProfile(user.email);
          const companyProfile = {
            name: res?.data.companyDetails.name,
            industry: res?.data.companyDetails.industry,
            description: res?.data.companyDetails.description,
            street: res?.data.companyDetails.street,
            city: res?.data.companyDetails.city,
            state: res?.data.companyDetails.state,
            country: res?.data.companyDetails.country,
            zipcode: res?.data.companyDetails.zipcode,
          };
          setFormData(companyProfile);
          setInitialData(companyProfile);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanyDetails();
  }, [user?.email, setFormData]);

  const handleClear = () => {
    setFormData(initialData);
  };

  return (
    <div>
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

          {/* Flexbox container for side-by-side layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Render form fields */}
            {Object.keys(initialData).map((key) => (
              <div key={key} className="form-group">
                <label className="block font-medium text-[#232360]">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
                  type="text"
                  value={formData[key]}
                  name={key}
                  onChange={handleChange}
                  readOnly={user?.role === "employee"}
                />
                {errors[key] && (
                  <p className="text-red-500 text-sm">{errors[key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardOrg;
