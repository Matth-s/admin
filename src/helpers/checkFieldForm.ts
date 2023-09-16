const requiredField = "Ce champ est requis";
const invalidEmail = "Adresse e-mail invalide";
const invalidNumberPhone = "Numéro de téléphone invalide";

export const checkIsEmpty = (string: string) => {
  if (string.trim().length === 0) {
    return requiredField;
  }
  return "";
};

export const checkEmailAdress = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (email.trim().length === 0) {
    return requiredField;
  }

  if (!emailRegex.test(email)) {
    return invalidEmail;
  }

  return "";
};

export const checkPhoneNumber = (phone: string) => {
  const phoneRegex = /^\d{2} \d{2} \d{2} \d{2} \d{2}$/;

  if (phone.trim().length === 0) {
    return requiredField;
  }

  if (!phoneRegex.test(phone)) {
    return invalidNumberPhone;
  }

  return "";
};
