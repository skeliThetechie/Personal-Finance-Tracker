//Line Chart Data
export const groupByDate = (transactions) => {
  const map = {};

  transactions.forEach(t => {
    const date = t.Date;
    const amt = Number(t.Amount) || 0;
    map[date] = (map[date] || 0) + amt;
  });

  return map;
};
