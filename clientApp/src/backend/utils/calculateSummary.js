export function calculateSummary(transactions) {
  const totalIncome = transactions
    .filter(t => t.CategoryName === "Income")
    .reduce((sum, t) => sum + Number(t.Amount), 0);

  const totalExpenses = transactions
    .filter(t => t.CategoryName !== "Income")
    .reduce((sum, t) => sum + Number(t.Amount), 0);

  const netBalance = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, netBalance };
}