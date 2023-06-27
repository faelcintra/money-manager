import * as Dialog from "@radix-ui/react-dialog";

import { HeaderContainer, HeaderContent, TransactionButton } from "./styles";
import logoImg from "../../assets/logo.svg";
import { DialogTransaction } from "../DialogTransaction";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <img src={logoImg} alt="logo" />
          <strong children="Money Manager" />
        </div>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <TransactionButton children={"Nova transação"} />
          </Dialog.Trigger>

          <DialogTransaction />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
