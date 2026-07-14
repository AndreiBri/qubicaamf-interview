import type { LoginCredentials, LoginResponse } from "../types/Auth";

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const res = await fetch(`https://fakestoreapi.com/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Credenziali non valide ritenta");

  return res.json();
}
