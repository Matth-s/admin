import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useMemo } from "react";
import { setSearchData } from "../../store/dataSlice";

import CardItem from "../../components/cardItem/CardItem";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import SearchBar from "../../components/searchBar/SearchBar";

import "./style.scss";

type Props = {
  isLoadingMaterial: boolean;
};

const Home = ({ isLoadingMaterial }: Props) => {
  const { dataMaterial, searchText } = useAppSelector((state) => state.data);

  const data = useMemo(() => {
    return dataMaterial.filter((material) =>
      material.name.toLowerCase().startsWith(searchText.toLowerCase())
    );
  }, [dataMaterial, searchText]);

  return (
    <div className="home-container">
      <Header />

      {isLoadingMaterial ? (
        <div className="loader-container">
          <h1>Chargement des données ...</h1>
          <Loader />
        </div>
      ) : dataMaterial.length > 0 ? (
        <section className="material-section">
          <SearchBar searchText={searchText} setSearch={setSearchData} />

          <div>
            {searchText !== "" && (
              <p>
                {data.length} résultat{data.length > 1 ? "s" : ""} pour "
                {searchText}"
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
