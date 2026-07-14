# ShopStore

E-commerce web app sviluppata come challenge tecnica: mostra prodotti, categorie e dettaglio prodotto usando la [Fake Store API](https://fakestoreapi.com/docs).

## Stack tecnico

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS
- Oxlint

## Prerequisiti

- Node.js 20 o superiore
- npm

## Setup locale

1. Clona il repository:
   ```bash
   git clone https://github.com/AndreiBri/qubicaamf-interview.git
   cd qubicaamf-interview
   ```
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```
   L'app sarà disponibile su `http://localhost:5173`.

Non sono necessarie variabili d'ambiente: l'app consuma direttamente la Fake Store API pubblica.

## Struttura del progetto

```
src/
├── api/           # Chiamate alla Fake Store API (prodotti, categorie, login)
├── components/    # Componenti UI riutilizzabili (Header, Navbar, Card, Spinner)
├── context/       # React Context per stato globale (Auth, Cart, Theme)
├── pages/         # Viste routate (Home, ProductDetail, LoginPage, CartPage)
├── types/         # Tipi TypeScript condivisi (Product, Auth, Cart, Theme)
├── App.tsx        # Layout globale (Header + Provider + routing) e definizione delle rotte
└── main.tsx       # Entry point dell'app
```

## Script disponibili

| Comando       | Descrizione                                |
| ------------- | ------------------------------------------ |
| `npm run dev` | Avvia il server di sviluppo con hot reload |

## Uso di strumenti AI
