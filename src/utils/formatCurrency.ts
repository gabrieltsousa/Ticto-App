export const formatCurrency = (value: string | number) => {
  if (typeof value !== "number") {
    value = parseFloat(value);
  }

  // Corrige arredondamento flutuante
  const fixed = Number(value.toFixed(2));
  return fixed.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};