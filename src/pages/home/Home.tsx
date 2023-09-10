import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

import CardItem from "../../components/cardItem/CardItem";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";

import "./style.scss";
import SearchBar from "../../components/searchBar/SearchBar";
import { useMemo } from "react";

type Props = {
  isLoading: boolean;
};

const Home = ({ isLoading }: Props) => {
  const { dataMaterial, searchText } = useAppSelector((state) => state.data);

  const data = useMemo(() => {
    return dataMaterial.filter((material) =>
      material.name.toLowerCase().startsWith(searchText.toLowerCase())
    );
  }, [dataMaterial, searchText]);

  console.log("render");

  return (
    <div className="home-container">
      <Header />
      {isLoading ? (
        <Loader />
      ) : dataMaterial.length > 0 ? (
        <section className="material-section">
          <SearchBar />

          <div>
            {searchText !== "" && (
              <p>
                {data.length} résultat{data.length > 1 ? "s" : ""} pour "
                {searchText}"{" "}
              </p>
            )}
            {data.map((item) => (
              <CardItem key={item.id} dataItem={item} />
            ))}
          </div>
        </section>
      ) : (
        <NavLink className="linkMaterial" to={"/create-material"}>
          Créer un nouveau matériel
        </NavLink>
      )}
    </div>
  );
};

export default Home;
