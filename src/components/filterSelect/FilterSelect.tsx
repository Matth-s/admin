import React from "react";
import { useAppDispatch } from "../../store/hooks";

type Props = {
  value: string;
  setValue: any;
};

const FilterSelect = ({ value, setValue }: Props) => {
  const dispatch = useAppDispatch();

  const selectChange = (selectValue: string) => {
    dispatch(setValue(selectValue));
  };

  return (
    <select
      name="select"
      id="select"
      defaultValue={value}
      onChange={(e) => selectChange(e.target.value)}
    >
      <option value="">Aucun</option>
      <option value="firstName">Prénom</option>
      <option value="lastName">Nom</option>
      <option value="address">Adresse</option>
      <option value="city">Ville</option>
      <option value="phone">Téléphone</option>
      <option value="materialName">Matériel</option>
      <option value="completed">Payé</option>
      <option value="onHold">En attente</option>
    </select>
  );
};

export default FilterSelect;
