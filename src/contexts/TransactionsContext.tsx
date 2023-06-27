import { createContext, ReactNode, useState, useEffect } from "react";

interface TransactionProps {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: TransactionProps[];
}

interface ProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: ProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  async function getTransactions() {
    const data = await fetch("http://localhost:3000/transactions").then(
      (data) => data.json()
    );

    setTransactions(data);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
