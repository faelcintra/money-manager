import { MagnifyingGlass } from "phosphor-react";
import { SearchContainer } from "./styles";

export function Search() {
  return (
    <SearchContainer>
      <input type="text" placeholder="Busque por transações" />
      <button type="submit">
        <MagnifyingGlass size={20}/>
        Buscar
      </button>
    </SearchContainer>
  );
}
