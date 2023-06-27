import * as Dialog from "@radix-ui/react-dialog";
import { Close, Content, Overlay, TransactionType, TypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const transactionSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  // type: zod.enum(["income", "outcome"]),
});

type TransactionFormType = zod.infer<typeof transactionSchema>;

export function DialogTransaction() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TransactionFormType>({
    resolver: zodResolver(transactionSchema),
  });

  async function handleTransaction(data: TransactionFormType) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(data);
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <Close>
          <X size={24} />
        </Close>

        <form onSubmit={handleSubmit(handleTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />
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
          <button type="submit" children="Cadastrar" disabled={isSubmitting} />
        </form>
      </Content>
    </Dialog.Portal>
  );
}
