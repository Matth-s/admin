import "./style.scss";
import React from "react";

type Props = {
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Delete = ({ setOpenDeleteModal }: Props) => {
  return (
    <button className="delete-button" onClick={() => setOpenDeleteModal(true)}>
      Supprimer
    </button>
  );
};

export default Delete;
