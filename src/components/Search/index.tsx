import { useContext } from "react";
import { MagnifyingGlass } from "phosphor-react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SearchContainer } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const searchFormSchema = zod.object({
  query: zod.string(),
});

type searchType = zod.infer<typeof searchFormSchema>;

export function Search() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<searchType>({
    resolver: zodResolver(searchFormSchema),
  });

  const { getTransactions } = useContext(TransactionsContext);

  async function handleSearch(data: searchType) {
    await getTransactions(data.query);
  }

  return (
    <SearchContainer onSubmit={handleSubmit(handleSearch)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchContainer>
  );
}
