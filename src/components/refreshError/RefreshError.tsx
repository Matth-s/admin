import { Navigate, useNavigate } from "react-router-dom";
import "./style.scss";
const RefreshError = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="error-container">
      <h2>Une erreur est survenue</h2>
      <button onClick={() => handleClick()}>Rafraichir</button>
    </div>
  );
};

export default RefreshError;
