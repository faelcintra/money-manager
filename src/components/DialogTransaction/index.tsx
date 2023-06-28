import * as Dialog from '@radix-ui/react-dialog'
import { Close, Content, Overlay, TransactionType, TypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const transactionSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type TransactionFormType = zod.infer<typeof transactionSchema>

export function DialogTransaction() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<TransactionFormType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleTransaction(data: TransactionFormType) {
    const { category, description, price, type } = data

    await createTransaction({
      category,
      description,
      price,
      type,
    })

    reset()
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
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={(e: 'income' | 'outcome') => field.onChange(e)}
                  value={field.value}
                >
                  <TypeButton color="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TypeButton>
                  <TypeButton color="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
