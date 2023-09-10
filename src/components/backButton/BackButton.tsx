import { useNavigate } from "react-router-dom";
import "./style.scss";
const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <button
      className="backButton flex flex__alignCenter"
      onClick={() => handleGoBack()}
    >
      <img src="../assets/icon-arrow.svg" alt="retour" /> Retour
    </button>
  );
};

export default BackButton;
