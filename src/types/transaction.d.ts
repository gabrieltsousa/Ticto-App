export type Transaction = {
  id: number;
  description: string;
  type: "entrada" | "saida";
  category: string;
  amount: number;
  date: string;
};
