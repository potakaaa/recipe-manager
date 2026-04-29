import React from "react"
import { Card, CardContent } from "./ui/card"
import type { Recipe } from "@/types/recipe"
import { Button } from "./ui/button"
import { HeartIcon } from "@phosphor-icons/react"

type RecipeCardProps = {
  recipe: Recipe
  onSelect: (recipe: Recipe) => void
  onToggleFavorite: (recipe: Recipe) => void
  isFavorite: boolean
}

const RecipeCard = ({
  recipe,
  onSelect,
  onToggleFavorite,
  isFavorite,
}: RecipeCardProps) => {
  return (
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
        className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur hover:scale-110"
      >
        <HeartIcon
          className={`h-4 w-4 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
        />
      </Button>

      <CardContent className="p-4">
        <h2 className="line-clamp-1 text-lg font-semibold"></h2>
      </CardContent>
    </Card>
  )
}

export default RecipeCard
