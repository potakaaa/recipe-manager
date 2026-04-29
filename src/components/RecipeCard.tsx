import { Card, CardContent } from "./ui/card"
import type { Recipe } from "@/types/recipe"
import { Button } from "./ui/button"
import { CopySimpleIcon, HeartIcon, TrashIcon } from "@phosphor-icons/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { toast } from "sonner"
import { copyRecipeAsText } from "@/lib/formatRecipeAsText"
import { categoryStyles, defaultStyle } from "@/styles/categoryStyles"

type RecipeCardProps = {
  recipe: Recipe
  onSelect: (recipe: Recipe) => void
  onDelete: (id: number) => void
  onToggleFavorite: (recipe: Recipe) => void
  isFavorite: boolean
}

const RecipeCard = ({
  recipe,
  onDelete,
  onSelect,
  onToggleFavorite,
  isFavorite,
}: RecipeCardProps) => {
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await copyRecipeAsText(recipe)
      toast.success("Recipe copied to clipboard")
    } catch {
      toast.error("Could not copy recipe")
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* whole card selects; buttons below call stopPropagation so one click != open + button */}
        <Card
          onClick={() => onSelect(recipe)}
          className="group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <Button
            size="icon"
            variant={"secondary"}
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(recipe)
            }}
            className="visible absolute z-10 bg-foreground hover:scale-110"
          >
            <HeartIcon
              weight={isFavorite ? "fill" : "regular"}
              className={`h-4 w-4 ${
                isFavorite ? "text-red-500" : "text-gray-500"
              }`}
            />
          </Button>

          <CardContent className="p-4">
            <h2 className="line-clamp-1 text-lg font-semibold">
              {recipe.title}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              ⏰ {recipe.cookingTime} • 🍽️ {recipe.servings}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span
                className={`${categoryStyles[recipe.category] || defaultStyle} rounded-full bg-muted px-2 py-1 text-xs`}
              >
                {recipe.category}
              </span>
            </div>
          </CardContent>

          {/* delete/view split only when user-created — seeded recipes can't be removed */}
          {recipe.isCustom ? (
            <div className="mx-3 flex flex-col space-y-2">
              <div className="flex gap-2">
                <Button
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(recipe)
                  }}
                  className="flex-1"
                >
                  View
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={handleCopy}
                  className="flex-1 shrink-0 gap-2"
                  aria-label="Copy recipe as text"
                >
                  <CopySimpleIcon className="h-5 w-5" />
                  Copy
                </Button>
              </div>
              <Button
                size={"lg"}
                className=""
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(recipe.id)
                }}
                variant={"destructive"}
              >
                <TrashIcon className="text-red" />
                Delete recipe
              </Button>
            </div>
          ) : (
            <div className="mx-3 flex gap-2">
              <Button
                size="lg"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(recipe)
                }}
                className="flex-1"
              >
                View
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={handleCopy}
                className="flex-1 shrink-0 gap-2"
                aria-label="Copy recipe as text"
              >
                <CopySimpleIcon className="h-5 w-5" />
                Copy
              </Button>
            </div>
          )}
        </Card>
      </TooltipTrigger>
      <TooltipContent side="bottom">Cook me!</TooltipContent>
    </Tooltip>
  )
}

export default RecipeCard
