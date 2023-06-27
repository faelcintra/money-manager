import { Header } from "../../components/Header";
import { Search } from "../../components/Search";
import { Summary } from "../../components/Summary";
import { SpanPrice, TransactionsContainer, TransactionsTable } from "./styles";

export function Home() {
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <Search />
        <TransactionsTable>
          <tbody>
            <tr>
              <td width={"50%"}>Desenvolvimento de site</td>
              <td>
                <SpanPrice variant="income">R$ 12.000,00</SpanPrice>
              </td>
              <td>Venda</td>
              <td>13/06/2023</td>
            </tr>
            <tr>
              <td width={"50%"}>Praia</td>
              <td>
                <SpanPrice variant="outcome">- R$ 450,00</SpanPrice>
              </td>
              <td>Viagem</td>
              <td>20/06/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
