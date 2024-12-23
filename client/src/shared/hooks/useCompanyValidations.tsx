import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useValidation = (data: any) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!data.companyName.trim() || data.companyName.length < 2) {
      newErrors.companyName = "Company name must be at least 2 characters.";
    }

    if (!data.companyDescription.trim() || data.companyDescription.length < 2) {
      newErrors.companyDescription =
        "Company description must be at least 2 characters.";
    }

    if (!data.industry.trim() || data.industry.length < 2) {
      newErrors.industry = "Industry must be at least 2 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate, setErrors };
};

type FormErrors = {
  street?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string;
};

export const useFormValidationStep2 = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validate = (values: { [key: string]: string }) => {
    const errors: FormErrors = {};

    if (!values.street.trim()) errors.street = "Street is required.";
    if (!values.country.trim()) errors.country = "Country is required.";
    if (!values.state.trim()) errors.state = "State is required.";
    if (!values.city.trim()) errors.city = "City is required.";

    if (!values.zipcode.trim()) {
      errors.zipcode = "Zipcode is required.";
    } else if (values.zipcode.length !== 6) {
      errors.zipcode = "Zipcode should be 6 characters.";
    }

    setFormErrors(errors);
    return errors;
  };

  return { formErrors, validate, setFormErrors };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCompanyUpdate = (initialData: any) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name =
        "Name must be at least 2 characters and cannot be empty or just spaces.";
      isValid = false;
    }

    if (!formData.industry.trim() || formData.industry.length < 2) {
      newErrors.industry =
        "Industry must be at least 2 characters and cannot be empty or just spaces.";
      isValid = false;
    }

    if (!formData.description.trim() || formData.description.length < 2) {
      newErrors.description =
        "Description must be at least 2 characters and cannot be empty or just spaces.";
      isValid = false;
    }

    if (!formData.street.trim() || formData.street.length < 2) {
      newErrors.street =
        "Street must be at least 2 characters and cannot be empty or just spaces.";
      isValid = false;
    }

    if (!formData.city.trim() || formData.city.length < 2) {
      newErrors.city =
        "City must be at least 2 characters and cannot be empty or just spaces.";
      isValid = false;
    }

    if (!formData.state.trim() || formData.state.length < 2) {
      newErrors.state =
        "State must be at least 2 characters and cannot be empty or just spaces.";
      isValid = false;
    }

    if (!formData.country.trim() || formData.country.length < 2) {
      newErrors.country =
        "Country must be at least 2 characters and cannot be empty or just spaces.";
      isValid = false;
    }

    if (!formData.zipcode.trim() || formData.zipcode.length !== 6) {
      newErrors.zipcode = "Zipcode must be exactly 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    setFormData,
    setErrors,
  };
};
