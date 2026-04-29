import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useEffect, useState } from "react"
import { useTheme } from "./components/theme-provider"
import { MoonIcon, PlusIcon, SunIcon } from "@phosphor-icons/react"
import data from "@/data/recipe.json"
import type { Recipe } from "./types/recipe"
import RecipeCard from "./components/RecipeCard"
import RecipeDialog from "./components/RecipeDialog"
import CreateDialog from "./components/CreateDialog"

export function App() {
  const { theme, setTheme } = useTheme()

  const [search, setSearch] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [hasHydratedRecipes, setHasHydratedRecipes] = useState(false)

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [open, setOpen] = useState(false)

  const [favoriteIds, setFavoriteIds] = useState<number[]>([])

  const [add, setAdd] = useState(false)

  // localstorage key for custom recipes
  const CUSTOM_RECIPE_KEY = "customRecipes"

  const query = search.toLowerCase().trim()

  const filtered = recipes.filter((r) => {
    if (!query) return true
    return (
      r.title.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query)
    )
  })

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_RECIPE_KEY)
      if (stored) {
        const custom = JSON.parse(stored) as Recipe[]
        setRecipes([...data, ...custom])
      } else {
        setRecipes(data)
      }
    } catch {
      setRecipes(data)
    }
    setHasHydratedRecipes(true)
  }, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favoriteRecipeIds")
      if (stored) setFavoriteIds(JSON.parse(stored) as number[])
    } catch {
      /* ignore corrupt storage */
    }
  }, [])

  useEffect(() => {
    if (!hasHydratedRecipes) return
    const customRecipes = recipes.filter((r) => r.isCustom)
    localStorage.setItem(CUSTOM_RECIPE_KEY, JSON.stringify(customRecipes))
  }, [recipes, hasHydratedRecipes])

  // function for adding recipe
  const addRecipe = (newRecipe: Recipe) => {
    setRecipes((prev) => [...prev, { ...newRecipe, isCustom: true }])
    setAdd(false)
  }

  // function for deleting custom recipe
  const deleteRecipe = (id: number) => {
    setRecipes((prev) => prev.filter((r) => !(r.id === id && r.isCustom)))
  }

  // toggling favorited recipes
  const toggleFavorite = (recipe: Recipe) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(recipe.id)
        ? prev.filter((id) => id !== recipe.id)
        : [...prev, recipe.id]
      localStorage.setItem("favoriteRecipeIds", JSON.stringify(next))
      return next
    })
  }

  const handleSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setOpen(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/70 px-6 py-4 backdrop-blur">
        <h1>Recipe Manager</h1>

        <div className="flex gap-4">
          <Button
            className="hover:scale-110"
            onClick={() => {
              setAdd(true)
            }}
          >
            <PlusIcon />
            Create recipe
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <SunIcon className="absolute h-5 w-5 scale-100 transition-all dark:scale-0 dark:rotate-90" />
            <MoonIcon className="absolute h-5 w-5 scale-0 transition-all dark:scale-100 dark:rotate-0" />
          </Button>
        </div>
      </header>

      <div className="px-6 pt-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight">
          Discover Delicious Recipes
        </h2>
        <p className="mt-2 text-muted-foreground">
          Find, save, and create your own favorite meals
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-8">
        <label htmlFor="recipe-search" className="sr-only">
          Search recipes
        </label>
        <Command
          shouldFilter={false}
          className="overflow-visible rounded-xl border bg-background shadow-md"
        >
          <CommandInput
            id="recipe-search"
            placeholder="Search by title or category…"
            value={search}
            onValueChange={setSearch}
          />
          {query.length > 0 && (
            <CommandList className="rounded-b-xl border-t">
              <CommandEmpty>No recipes match your search.</CommandEmpty>
              <CommandGroup heading="Recipes">
                {filtered.map((recipe) => (
                  <CommandItem
                    key={recipe.id}
                    value={`${recipe.title} ${recipe.category}`}
                    onSelect={() => handleSelect(recipe)}
                    className="gap-3 py-2"
                  >
                    <img
                      src={recipe.image}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{recipe.title}</p>
                      <p className="truncate text-muted-foreground">
                        {recipe.category}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={handleSelect}
              onToggleFavorite={toggleFavorite}
              isFavorite={favoriteIds.includes(recipe.id)}
              onDelete={deleteRecipe}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center text-muted-foreground">
            No recipes found
          </div>
        )}
      </main>

      <RecipeDialog
        recipe={selectedRecipe}
        open={open}
        onOpenChange={setOpen}
      />

      <CreateDialog open={add} onOpenChange={setAdd} onAdd={addRecipe} />
    </div>
  )
}

export default App
