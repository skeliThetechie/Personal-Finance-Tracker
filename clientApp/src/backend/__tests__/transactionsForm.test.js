import { validateTransaction } from "../utils/validateTransaction";

describe("Transactions Form Validation", () => {
  test("fails if amount is missing", () => {
    const result = validateTransaction({ Amount: "", Category: "Food", Date: "2025-01-01" });
    expect(result).toBe("Amount is required");
  });

  test("fails if amount is not a number", () => {
    const result = validateTransaction({ Amount: "abc", Category: "Food", Date: "2025-01-01" });
    expect(result).toBe("Amount must be a number");
  });

  test("fails if category is missing", () => {
    const result = validateTransaction({ Amount: "10", Category: "", Date: "2025-01-01" });
    expect(result).toBe("Category required");
  });

  test("fails if date is missing", () => {
    const result = validateTransaction({ Amount: "10", Category: "Food", Date: "" });
    expect(result).toBe("Date required");
  });

  test("passes for valid transaction", () => {
    const result = validateTransaction({ Amount: "10", Category: "Food", Date: "2025-01-01" });
    expect(result).toBe(null);
  });
});