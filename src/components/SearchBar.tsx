import { ChangeEvent, useContext, useRef } from "react";
import { PlacesContext } from "../contexts";
import { SearchResult } from "./SearchResult";

export const SearchBar = () => {

  const { searchPlacesByTerm } = useContext(PlacesContext)
  const debounceRef = useRef<NodeJS.Timeout>(null);

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      console.log("debounce value", event.target.value);
      searchPlacesByTerm(event.target.value)
    }, 500);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar..."
        onChange={onQueryChanged}
      />
      <SearchResult></SearchResult>
    </div>
  );
};
