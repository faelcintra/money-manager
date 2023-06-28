import * as zod from 'zod'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import { zodResolver } from '@hookform/resolvers/zod'

import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { SearchContainer } from './styles'

const searchFormSchema = zod.object({
  query: zod.string(),
})

type searchType = zod.infer<typeof searchFormSchema>

export function Search() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<searchType>({
    resolver: zodResolver(searchFormSchema),
  })

  const getTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.getTransactions
  })

  async function handleSearch(data: searchType) {
    await getTransactions(data.query)
  }

  return (
    <SearchContainer onSubmit={handleSubmit(handleSearch)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchContainer>
  )
}
