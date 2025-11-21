export const validateLogin = (users, username, password) => {
  return users.find(
    (u) => u.Username === username && u.Password === password
  ) || null;
};
