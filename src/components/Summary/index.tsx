import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";

import { SummaryCard, SummaryContainer } from "./styles";
import { priceFormatter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSummary";

export function Summary() {
  const summary = useSummary();
  
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={"#00B37E"} />
        </header>
        <strong children={priceFormatter.format(summary.income)} />
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saidas</span>
          <ArrowCircleDown size={32} color={"#F75A68"} />
        </header>
        <strong children={priceFormatter.format(summary.outcome)} />
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Entradas</span>
          <CurrencyDollar size={32} color={"#FAFAFA"} />
        </header>
        <strong children={priceFormatter.format(summary.total)} />
      </SummaryCard>
    </SummaryContainer>
  );
}
