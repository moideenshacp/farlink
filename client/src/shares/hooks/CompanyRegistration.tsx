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
