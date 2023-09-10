import { useState } from "react";
import { Material } from "../schema";

export const useInputChange = (initialData: Material) => {
  const [formData, setFormData] = useState(() => initialData);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "disponibility") {
        return {
          ...prevData,
          [name]: value === "true",
          date: value === "true" ? null : prevData.date,
        };
      }

      if (name === "visible") {
        return {
          ...prevData,
          visible: !prevData.visible,
        };
      }

      if (name === "date" && value === "") {
        return {
          ...prevData,
          [name]: null,
        };
      }

      if (name === "downPayment" || name === "pricePerDay") {
        return {
          ...prevData,
          [name]: value !== "" && parseFloat(value),
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return { formData, setFormData, handleInputChange };
};
