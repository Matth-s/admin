import { useAppDispatch } from "../../store/hooks";

import "./style.scss";

type Props = {
  searchText: string;
  setSearch: any;
};

const SearchBar = ({ searchText, setSearch }: Props) => {
  const dispatch = useAppDispatch();

  const onInputChange = (value: string) => {
    dispatch(setSearch(value.trim()));
  };

  return (
    <div className="searchBar-container flex flex__alignCenter">
      <input
        type="text"
        defaultValue={searchText}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Recherche"
      />

      <img src="./assets/icon-search.svg" alt="search" />
    </div>
  );
};

export default SearchBar;
