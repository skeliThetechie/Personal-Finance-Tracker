import { groupByDate } from "../utils/groupByDate";

describe("groupByDate", () => {
  test("sums transactions for the same date", () => {
    const data = [
      { Date: "2025-01-01", Amount: "10" },
      { Date: "2025-01-01", Amount: "15" },
      { Date: "2025-01-02", Amount: "25" }
    ];

    const result = groupByDate(data);

    expect(result["2025-01-01"]).toBe(25);
    expect(result["2025-01-02"]).toBe(25);
  });

  test("handles empty array", () => {
    const result = groupByDate([]);
    expect(result).toEqual({});
  });
});