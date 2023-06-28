import * as Dialog from '@radix-ui/react-dialog'
import { Close, Content, Overlay, TransactionType, TypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter } from '../../utils/formatter'
import { api } from '../../lib/axios'

const transactionSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type TransactionFormType = zod.infer<typeof transactionSchema>

export function DialogTransaction() {
  const { createTransaction } = useContext(TransactionsContext)

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
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
    console.log('POST IN COMPONENT')
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
              console.log(field)
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

          <button type="submit" children="Cadastrar" disabled={isSubmitting} />
        </form>
      </Content>
    </Dialog.Portal>
  )
}
