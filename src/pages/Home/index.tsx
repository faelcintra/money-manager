import { useContext } from 'react'
import { Header } from '../../components/Header'
import { Search } from '../../components/Search'
import { Summary } from '../../components/Summary'
import { SpanPrice, TransactionsContainer, TransactionsTable } from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

export function Home() {
  const { transactions } = useContext(TransactionsContext)
  console.log('transactions')

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <Search />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width={'50%'}>{transaction.description}</td>
                <td>
                  <SpanPrice variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </SpanPrice>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
