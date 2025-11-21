import { calculateSummary } from "../utils/calculateSummary.js";

describe("calculateSummary backend logic", () => {
  test("correctly calculates income, expenses, and net balance", () => {
    const transactions = [
      { Amount: 100, CategoryName: "Income" },
      { Amount: 50, CategoryName: "Food & Dining" }
    ];

    const result = calculateSummary(transactions);

    expect(result.totalIncome).toBe(100);
    expect(result.totalExpenses).toBe(50);
    expect(result.netBalance).toBe(50);
  });

  test("handles empty transactions", () => {
    const result = calculateSummary([]);

    expect(result.totalIncome).toBe(0);
    expect(result.totalExpenses).toBe(0);
    expect(result.netBalance).toBe(0);
  });
});