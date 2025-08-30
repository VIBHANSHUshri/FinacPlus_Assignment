export function login(role, username) {
  const token = JSON.stringify({
    role,
    username,
    exp: Date.now() + 1000 * 60 * 60,
  });
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const parsed = JSON.parse(token);
    if (Date.now() > parsed.exp) {
      logout();
      return null;
    }
    return parsed.role;
  } catch (err) {
    return null;
  }
}

export function getName() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const parsed = JSON.parse(token);
    return parsed.username;
  } catch {
    return null;
  }
}
