"use client";

import { useTransactions } from "@/src/hooks/useTransactions";
import styles from "./Summary.module.scss";
import { formatCurrency } from "@/src/utils/formatCurrency";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useMemo, useRef, useState } from "react";

function AnimatedNumber({
  id,
  value,
}: {
  id: string;
  value: number;
}) {
  const [springs, api] = useSpring(() => ({
    from: { number: 0 },
    config: { tension: 90, friction: 20 },
  }));

  useEffect(() => {
    api.start({ number: value });
  }, [value, api]);

  return (
    <animated.p key={id}>
      {springs.number.to((valor) => formatCurrency(valor))}
    </animated.p>
  );
}

export function Summary() {
  const { transactions } = useTransactions();

  const totalEntradas = useMemo(
    () =>
      transactions.reduce((result, transaction) => {
        if (transaction.type === "entrada") result += transaction.amount;
        return result;
      }, 0),
    [transactions]
  );

  const totalSaidas = useMemo(
    () =>
      transactions.reduce((result, transaction) => {
        if (transaction.type === "saida") result += transaction.amount;
        return result;
      }, 0),
    [transactions]
  );

  const total = totalEntradas - totalSaidas;

  const [isChanged, setIsChanged] = useState(true);
  const prevValue = useRef(totalEntradas);

  useEffect(() => {
    if (prevValue.current !== totalEntradas) {
      setIsChanged(true);
      prevValue.current = totalEntradas;
    } else {
      if (!isChanged) setIsChanged(false);
    }
  }, [totalEntradas]);

  useEffect(() => {
    if (isChanged) {
      const timer = setTimeout(() => setIsChanged(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isChanged]);

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          <h5>Entradas</h5>
          <Image
            src="/assets/feather-arrow-income.svg"
            alt="Arrow income"
            className={styles.arrow}
            width={19}
            height={19}
            fetchPriority="high"
          />
        </div>

        {isChanged ? (
          <AnimatedNumber id="entradas" value={totalEntradas} />
        ) : (
          <p>{formatCurrency(totalEntradas)}</p>
        )}
      </div>

      <div className={styles.card}>
        <div className={styles.title}>
          <h5>Saídas</h5>
          <Image
            src="/assets/feather-arrow-outcome.svg"
            alt="Arrow outcome"
            className={styles.arrow}
            width={19}
            height={19}
            fetchPriority="high"
          />
        </div>
        <AnimatedNumber id="saidas" value={totalSaidas} />
      </div>

      <div className={`${styles.card} ${styles.total}`}>
        <div className={styles.title}>
          <h5 className={styles.total}>Saldo Total</h5>
        </div>
        <AnimatedNumber id="total" value={total} />
      </div>
    </section>
  );
}
