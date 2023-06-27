import { SummaryCard, SummaryContainer } from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";

export function Summary() {
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={"#00B37E"} />
        </header>
        <strong children={"R$ 16.500,00"} />
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saidas</span>
          <ArrowCircleDown size={32} color={"#F75A68"} />
        </header>
        <strong children={"R$ 16.500,00"} />
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Entradas</span>
          <CurrencyDollar size={32} color={"#FAFAFA"} />
        </header>
        <strong children={"R$ 16.500,00"} />
      </SummaryCard>
    </SummaryContainer>
  );
}
