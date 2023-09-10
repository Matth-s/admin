import { setSearch } from "../../store/dataSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./style.scss";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { searchText } = useAppSelector((state) => state.data);

  return (
    <div className="searchbar-container flex flex__alignCenter">
      <input
        type="text"
        defaultValue={searchText}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Recherche"
      />

      <img src="./assets/icon-search.svg" alt="search" />
    </div>
  );
};

export default SearchBar;
