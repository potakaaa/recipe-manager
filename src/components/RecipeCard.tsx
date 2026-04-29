import { Card, CardContent } from "./ui/card"
import type { Recipe } from "@/types/recipe"
import { Button } from "./ui/button"
import { HeartIcon, TrashIcon } from "@phosphor-icons/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

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
  return (
    <Tooltip>
      <TooltipTrigger asChild>
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
              className={`h-4 w-4 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
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
              <span className="rounded-full bg-muted px-2 py-1 text-xs">
                {recipe.category}
              </span>
            </div>
          </CardContent>

          {recipe.isCustom ? (
            <div className="mx-3 flex flex-col space-y-2">
              <Button
                size="lg"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(recipe)
                }}
                className=""
              >
                View
              </Button>
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
            <Button
              size="lg"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(recipe)
              }}
              className="mx-3"
            >
              View
            </Button>
          )}
        </Card>
      </TooltipTrigger>
      <TooltipContent side="bottom">Cook me!</TooltipContent>
    </Tooltip>
  )
}

export default RecipeCard
