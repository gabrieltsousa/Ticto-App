"use client";
import { Transaction } from "@/src/types/transaction";
import { createContext, useContext, useState, ReactNode } from "react";


type TransactionsContextData = {
  transactions: Transaction[];
  addTransaction: (data: Omit<Transaction, "id" | "date">) => void;
  removeTransaction: (id: number) => void;
};

 export const TransactionsContext = createContext<TransactionsContextData | undefined>(
  undefined
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      description: "Curso de NextJS",
      type: "saida",
      category: "Educação",
      amount: 899,
      date: "12/02/2022 às 13h24",
    },
    {
      id: 2,
      description: "Salário",
      type: "entrada",
      category: "Receita Fixa",
      amount: 7350,
      date: "12/02/2022 às 13h24",
    },
    {
      id: 3,
      description: "Freelance",
      type: "entrada",
      category: "Projeto",
      amount: 1200,
      date: "11/02/2022 às 09h10",
    },
  ]);

 function addTransaction(data: Omit<Transaction, "id" | "date">) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("pt-BR");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const dateFormatted = `${dateStr} às ${hours}h${minutes}`;

  const newTransaction: Transaction = {
    ...data,
    id: Date.now(),
    date: dateFormatted,
  };

  setTransactions((prev) => [newTransaction, ...prev]);
}

  function removeTransaction(id: number) {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, removeTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}


