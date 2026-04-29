# Recipe Manager

A focused, pleasant recipe browser built with **React 19**, **Vite 7**, **TypeScript**, **Tailwind CSS v4**, and **[shadcn/ui](https://ui.shadcn.com/)** (Radix Lyra style, Phosphor icons). Search from a command-palette style picker, open full recipes in dialogs, save favorites, add your own recipes, and copy recipes as plain text—**light / dark / system** theme included.

---

## Features

- **Search** — Filter by recipe title or category via the command palette.
- **Detail view** — Full ingredients and steps in a modal dialog.
- **Favorites** — Persisted in the browser (`localStorage`).
- **Custom recipes** — Create recipes in-app; merged with bundled data and stored locally.
- **Copy** — Export a recipe as readable text from the card actions.

---

## Tech stack

| Layer        | Choice                          |
| ------------ | ------------------------------- |
| Build        | Vite                            |
| UI           | React 19                        |
| Styling      | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Components   | shadcn/ui (Radix primitives)    |
| Icons        | Phosphor (`@phosphor-icons/react`) |
| Toasts       | Sonner                          |
| Theme        | `next-themes`                   |

---

## Getting started

### Prerequisites

- **Node.js** 20+ recommended (aligned with modern Vite / tooling).

### Clone and install

```bash
git clone <your-repo-url>
cd recipe-manager
npm install
```

### Run the app

```bash
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

### Other scripts

| Command          | Purpose                    |
| ---------------- | -------------------------- |
| `npm run dev`    | Dev server with HMR        |
| `npm run build`  | Typecheck + production build |
| `npm run preview`| Serve production build locally |
| `npm run lint`   | ESLint                     |
| `npm run format` | Prettier (TS/TSX)          |
| `npm run typecheck` | `tsc --noEmit`          |

---

## shadcn/ui setup (fresh project or adding components)

This repository is already wired with **`components.json`**, aliases (`@/` → `src/`), and generated primitives under **`src/components/ui/`**. If you are **starting from zero** or want to recreate the toolchain:

### 1. Create a Vite + React + TypeScript app

```bash
npm create vite@latest recipe-manager -- --template react-ts
cd recipe-manager
npm install
```

### 2. Add Tailwind (this project uses the Vite plugin)

Follow the current [Tailwind + Vite](https://tailwindcss.com/docs/installation/using-vite) guide so `vite.config.ts` includes the Tailwind plugin and your CSS entry imports Tailwind.

### 3. Initialize shadcn/ui

From the project root:

```bash
npx shadcn@latest init
```

Pick options that match this repo where relevant (e.g. **style**: Radix Lyra / your preference, **`components.json`** path, **`src`** as base, **aliases** `@/components`, **`src/index.css`** for globals).

### 4. Add components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add tooltip
npx shadcn@latest add command
```

`command` pulls in **`dialog`** and **`input-group`** as needed—the CLI resolves dependencies automatically.

> **Clone only?** Steps 3–4 are optional; **`npm install && npm run dev`** is enough to run **this** project.

---

## shadcn/ui components used

These live under **`src/components/ui/`** and are composed in the app:

| Component    | Role |
| ----------- | ---- |
| **Button**  | Actions (theme toggle, add recipe, card actions, dialogs). |
| **Card**    | Recipe cards (`Card`, `CardContent`). |
| **Command** | Search palette (`Command`, `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, `CommandEmpty`). |
| **Dialog**  | Recipe detail and “create recipe” modals. |
| **Input**   | Create-recipe form fields. |
| **Textarea**| Multi-line fields in create flow. |
| **Tooltip** | Hints on card actions; wrapped in **`TooltipProvider`** in `main.tsx`. |
| **Input Group** | Used inside the Command implementation for consistent input styling. |

**Toasts:** the app uses **`sonner`** directly (`toast` helpers and `<Toaster />` in **`main.tsx`**). A conventional shadcn **`sonner`** UI wrapper exists in the codebase if you prefer that import path.

Icons are configured for **Phosphor** via `components.json` (`iconLibrary`).

---

## Data source (`recipe.json`)

- **Bundled catalog:** Recipes ship as static JSON imported at build time:

  **`src/data/recipe.json`**

  Each recipe matches the **`Recipe`** type (`id`, `title`, `image`, `ingredients`, `instructions`, `cookingTime`, `servings`, `category`; optional **`isCustom`** for user-created entries).

- **Runtime merge:** On load, the app reads **`localStorage`** key **`customRecipes`**. If present and valid, those recipes are **appended** after the bundled array (`[...data, ...custom]` in **`App.tsx`**). Corrupt stored JSON falls back to the bundle only.

- **Favorites:** Favorite recipe IDs are stored under **`favoriteRecipeIds`**.

This keeps **no backend required**—everything runs in the browser with optional persistence.

---

## Screenshots *(recommended)*

Add images under **`docs/screenshots/`** (or similar) and link them here—for example:

```markdown
![Home — recipe grid](./docs/screenshots/home-light.png)

![Dark mode](./docs/screenshots/home-dark.png)
```

Remove this subsection or replace the placeholders once you have captures.

---

## License

Private / your choice—set **`license`** in `package.json` and this section when you publish.
