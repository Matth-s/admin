export const formatPhoneNumber = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");
  const formattedValue = cleanedValue.replace(/(\d{2})(?=\d)/g, "$1 ");

  return formattedValue;
};
