import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return <button onClick={() => navigate(`${pathname}/edit`)}>Editer</button>;
};

export default EditButton;
