import { validateLogin } from "../utils/validateLogin";

describe("Login Validation", () => {
  const users = [
    { Username: "admin", Password: "1234" },
    { Username: "demo", Password: "pass" }
  ];

  test("returns user object on correct credentials", () => {
    const user = validateLogin(users, "admin", "1234");
    expect(user.Username).toBe("admin");
  });

  test("returns null on incorrect credentials", () => {
    const user = validateLogin(users, "admin", "wrong");
    expect(user).toBe(null);
  });

  test("returns null if username does not exist", () => {
    const user = validateLogin(users, "unknown", "1234");
    expect(user).toBe(null);
  });
});