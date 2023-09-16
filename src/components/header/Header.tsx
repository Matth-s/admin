import { NavLink } from "react-router-dom";
import "./style.scss";

const Header = () => {
  return (
    <header className="header flex">
      <nav>
        <ul className="flex">
          <NavLink to={"/"}>Accueil</NavLink>
          <NavLink to={"/create-material"}>Créer un materiel</NavLink>
          <NavLink to={"/planning"}>Planning</NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
