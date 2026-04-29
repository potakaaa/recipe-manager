import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useTheme } from "./components/theme-provider"
import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import data from "@/data/recipe.json"
import type { Recipe } from "./types/recipe"
import RecipeCard from "./components/RecipeCard"

export function App() {
  const { theme, setTheme } = useTheme()

  const [search, setSearch] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("recipes")

    if (stored) {
      setRecipes(JSON.parse(stored))
    } else {
      setRecipes(data)
    }
  }, [])

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/70 px-6 py-4 backdrop-blur">
        <h1>Recipe Manager</h1>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          <SunIcon className="absolute h-5 w-5 scale-100 transition-all dark:scale-0 dark:rotate-90" />
          <MoonIcon className="absolute h-5 w-5 scale-0 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={() => {}}
              onToggleFavorite={() => {}}
              isFavorite={false}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center text-muted-foreground">
            No recipes found
          </div>
        )}
      </main>
    </div>
  )
}

export default App
