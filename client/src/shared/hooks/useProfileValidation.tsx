import { useState } from "react";

interface FormData {
  fName: string;
  lName: string;
  phone: string;
  image: string
}

interface ValidationErrors {
  fName: string;
  lName: string;
  phone: string;
}

const useProfileValidation = (initialFormData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    fName: "",
    lName: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {
      fName: "",
      lName: "",
      phone: "",
    };

    if (formData.fName.trim().length === 0) {
      errors.fName = "First name is required.";
    }
    if (formData.lName.trim().length === 0) {
      errors.lName = "Last name is required.";
    }
    if (formData.phone.trim().length === 0  ) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    setValidationErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  return {
    formData,
    setFormData,
    validationErrors,
    handleChange,
    validateForm,
  };
};

export default useProfileValidation;
