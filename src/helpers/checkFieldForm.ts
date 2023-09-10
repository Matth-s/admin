const requiredFiled = "Ce champ est requis";

export const checkIsEmpty = (string: string) => {
  if (string.trim().length === 0) {
    return requiredFiled;
  }

  return "";
};
