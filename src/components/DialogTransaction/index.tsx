import * as Dialog from "@radix-ui/react-dialog";
import { Close, Content, Overlay, TransactionType, TypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

export function DialogTransaction() {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <Close>
          <X size={24} />
        </Close>

        <form action="">
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />
          <TransactionType>
            <TypeButton color="income" value="income">
              <ArrowCircleUp size={24} />
              Entrada
            </TypeButton>
            <TypeButton color="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </TypeButton>
          </TransactionType>
          <button type="submit" children="Cadastrar" />
        </form>
      </Content>
    </Dialog.Portal>
  );
}
