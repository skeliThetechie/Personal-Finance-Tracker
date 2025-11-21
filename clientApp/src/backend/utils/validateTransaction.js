export const validateTransaction = ({ Amount, Category, Date }) => {
  if (!Amount) return "Amount is required";
  if (isNaN(Number(Amount))) return "Amount must be a number";
  if (!Category) return "Category required";
  if (!Date) return "Date required";
  return null;
};
