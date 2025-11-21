//Pie Chart Data
export const groupByCategory = (transactions) => {
  const map = {};

  transactions.forEach(t => {
    const cat = t.Category || "Other"; 
    const amt = Number(t.Amount) || 0;
    map[cat] = (map[cat] || 0) + amt;
  });

  return map;
};
