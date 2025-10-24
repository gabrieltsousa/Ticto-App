"use client";
import { useState } from "react";
import styles from "./NewTransactionModal.module.scss";
import { useTransactions } from "@/src/hooks/useTransactions";
import Image from "next/image";
import { formatCurrency } from "@/src/utils/formatCurrency";

export function NewTransactionModal() {
  const { addTransaction } = useTransactions();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    description: "",
    category: "",
    amount: 0,
    type: "entrada" as "entrada" | "saida",
  });

  const [errors, setErrors] = useState({
    description: "",
    category: "",
    amount: "",
  });

  function validate() {
    const newErrors = { description: "", category: "", amount: "" };

    if (!form.description.trim())
      newErrors.description = "O nome da transação é obrigatório.";

    if (!form.amount || form.amount <= 0)
      newErrors.amount = "Informe um valor válido.";

    if (!form.category.trim()) newErrors.category = "Informe uma categoria.";

    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    addTransaction(form);
    setForm({ description: "", category: "", amount: 0, type: "entrada" });
    setErrors({ description: "", category: "", amount: "" });
    setOpen(false);
  }

  return (
    <>
      <button className={styles.trigger} onClick={() => setOpen(true)}>
        Nova Transação
      </button>

    {open && (
  <div
    className={styles.overlay}
    onClick={() => setOpen(false)} // fecha ao clicar fora
  >
    <form
      className={styles.modal}
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
    >
      <button
        type="button"
        className={styles.close}
        onClick={() => setOpen(false)}
      >
        ✕
      </button>

      <h2 className={styles.title}>Cadastrar Transação</h2>

      <div className={styles.field}>
        <input
          placeholder="Nome"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        {errors.description && (
          <span className={styles.error}>{errors.description}</span>
        )}
      </div>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Preço"
          value={form.amount ? formatCurrency(form.amount) : ""}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d]/g, "");
            const numericValue = Number(raw) / 100;
            setForm({ ...form, amount: numericValue });
          }}
        />
        {errors.amount && (
          <span className={styles.error}>{errors.amount}</span>
        )}
      </div>

      <div className={styles.types}>
        <label
          className={`${styles.typeButton} ${
            form.type === "entrada" ? styles.activeIncome : ""
          }`}
        >
          <input
            type="radio"
            checked={form.type === "entrada"}
            onChange={() => setForm({ ...form, type: "entrada" })}
          />
          <Image
            src="/assets/feather-arrow-circle-income.svg"
            alt="Entrada"
            width={16}
            height={16}
            fetchPriority="high"
          />
          Entrada
        </label>

        <label
          className={`${styles.typeButton} ${
            form.type === "saida" ? styles.activeOutcome : ""
          }`}
        >
          <input
            type="radio"
            checked={form.type === "saida"}
            onChange={() => setForm({ ...form, type: "saida" })}
          />
          <Image
            src="/assets/feather-arrow-circle-outcome.svg"
            alt="Saída"
            width={16}
            height={16}
            fetchPriority="high"
          />
          Saída
        </label>
      </div>

      <div className={styles.field}>
        <input
          placeholder="Categoria"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />
        {errors.category && (
          <span className={styles.error}>{errors.category}</span>
        )}
      </div>

      <button type="submit" className={styles.submit}>
        CADASTRAR
      </button>
    </form>
  </div>
)}

    </>
  );
}
