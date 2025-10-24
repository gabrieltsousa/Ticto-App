"use client";

import { Header } from "@components/Header/Header";
import { Summary } from "@components/Summary/Summary";
import { TransactionTable } from "@components/TransactionTable/TransactionTable";
import { TransactionsProvider } from "@context/TransactionsContext";




export default function HomePage() {
  return (
    <TransactionsProvider>
      <Header />
      <main className="container">
        <Summary />
        <TransactionTable />
      </main>
    </TransactionsProvider>
  );
}
