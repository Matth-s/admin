import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logOut } from "../../services/firebaseRequest";

import "./style.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await dispatch(logOut())
      .unwrap()
      .then(() => navigate("/connection"))
      .catch((error) => console.log(error));
  };

  return (
    <header className="header flex">
      <nav>
        <ul className="flex">
          <NavLink to={"/"}>Matériel</NavLink>
          <NavLink to={"/planning"}>Planning</NavLink>
          <NavLink to={"/create-material"}>Créer un materiel</NavLink>
          <button onClick={() => handleLogOut()}>Se deconnecter</button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
