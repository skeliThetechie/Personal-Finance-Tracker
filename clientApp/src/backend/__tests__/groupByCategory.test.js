import { groupByCategory } from "../utils/groupByCategory";

describe("groupByCategory", () => {
  test("sums amounts for each category", () => {
    const data = [
      { Category: "Food", Amount: "20" },
      { Category: "Food", Amount: "30" },
      { Category: "Shopping", Amount: "50" }
    ];

    const result = groupByCategory(data);

    expect(result.Food).toBe(50);
    expect(result.Shopping).toBe(50);
  });

  test("handles empty array", () => {
    const result = groupByCategory([]);
    expect(result).toEqual({});
  });

  test("assigns 'Other' category if missing", () => {
    const data = [
      { Category: null, Amount: "10" }
    ];
    const result = groupByCategory(data);
    expect(result.Other).toBe(10);
  });
});