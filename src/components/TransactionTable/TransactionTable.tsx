"use client";
import { useTransactions } from "@/src/hooks/useTransactions";
import styles from "./TransactionTable.module.scss";
import { formatCurrency } from "@/src/utils/formatCurrency";
import Image from "next/image";

export function TransactionTable() {
  const { transactions, removeTransaction } = useTransactions();

  if (transactions.length === 0) {
    return (
      <section className={styles.wrap}>
        <div className={styles.empty}>Nenhum registro encontrado</div>
      </section>
    );
  }

  return (
    <>
      <section className={styles.wrap + ' ' + styles.desktop}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id} className={styles.row}>
                <td className={styles.desc} data-label="Descrição">
                  {item.description}
                </td>
                <td
                  className={
                    item.type === "entrada" ? styles.income : styles.outcome
                  }
                  data-label="Valor"
                >
                  {item.type === "saida" ? "- " : ""}
                  {formatCurrency(item.amount)}
                </td>
                <td className={styles.category} data-label="Categoria">
                  {item.category}
                </td>
                <td className={styles.date} data-label="Data">
                  {item.date}
                </td>
                <td className={styles.trash} data-label="">
                  <button onClick={() => removeTransaction(item.id)}>
                    <Image
                      src="/assets/feather-trash.svg"
                      alt="Trash icon"
                      width={14}
                      height={14}
                      fetchPriority="high"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* lista */}
      <section className={styles.wrap + ' ' + styles.mobile}>
        <div className={styles.table}>
          {transactions.map((item) => (
            <div className={styles.mobileList} key={item.id}>
              <div className={styles.list}>
                <div
                  className={
                    item.type === "entrada" ? styles.income : styles.outcome
                  }
                >
                  {item.type === "entrada" ? (
                    <Image
                      src="/assets/feather-arrow-circle-income.svg"
                      alt="Trash icon"
                      width={14}
                      height={14}
                      fetchPriority="high"
                    />
                  ) : (
                    <Image
                      src="/assets/feather-arrow-circle-outcome.svg"
                      alt="Trash icon"
                      width={14}
                      height={14}
                      fetchPriority="high"
                    />
                  )}

                  {item.type === "entrada" ? "Entrada" : "Saída"}
                </div>
                <div
                  className={
                    item.type === "entrada" ? styles.income : styles.outcome
                  }
                  data-label="Valor"
                >
                  {item.type === "saida" ? "- " : ""}
                  {formatCurrency(item.amount)}
                </div>
              </div>
              <div className={styles.list}>
                <div className={styles.description} data-label="Descrição">
                  {item.description} | {item.category}
                </div>

                <div className={styles.date} data-label="Data">
                  {item.date}
                </div>
              </div>
              <div className={styles.trash} data-label="">
                <button onClick={() => removeTransaction(item.id)}>
                  <Image
                    src="/assets/feather-trash.svg"
                    alt="Trash icon"
                    width={14}
                    height={14}
                    fetchPriority="high"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
