const TOKEN = "ARA";

export function getCredentials() {
  const credentials = localStorage.getItem(TOKEN);
  if (!credentials) return null;
  return JSON.parse(credentials);
}

export function setCredentials(credentials) {
  localStorage.setItem(TOKEN, JSON.stringify(credentials));
}

export function removeCredentials() {
  localStorage.removeItem(TOKEN);
}
