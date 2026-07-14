import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Theme, ThemeContextValue } from "../types/Theme";

// Il "contenitore" del context. undefined finché nessun ThemeProvider è montato.
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Legge il tema salvato in precedenza. Se non c'è nulla salvato (o è un valore
// strano), si parte comunque da "light" come default sicuro.
function readStoredTheme(): Theme {
  const stored = localStorage.getItem("theme");
  return stored === "dark" ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Stato reale del tema, inizializzato da localStorage al primo render.
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  // Un solo metodo che "inverte" il tema: se è light diventa dark e viceversa.
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Ogni volta che theme cambia: salvo la scelta in localStorage (per ricordarla
  // al prossimo refresh) e aggiungo/tolgo la classe "dark" sul tag <html>, che è
  // quello che accende/spegne tutte le classi dark: di Tailwind in tutta l'app.
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Tutto questo diventa leggibile da qualunque componente dentro <ThemeProvider>.
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

// Scorciatoia per leggere il context nei componenti: const { theme, toggleTheme } = useTheme();
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve essere usato dentro ThemeProvider");
  return ctx;
}
