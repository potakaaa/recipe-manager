import type { Recipe } from "@/types/recipe"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

type RecipeDialogProps = {
  recipe: Recipe | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const RecipeDialog = ({ recipe, open, onOpenChange }: RecipeDialogProps) => {
  if (!recipe) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">{recipe.title}</DialogTitle>
        </DialogHeader>

        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-60 w-full rounded-xl object-cover"
        />

        <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
          <span>⏱ {recipe.cookingTime} mins</span>
          <span>🍽 {recipe.servings} servings</span>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 font-semibold">Ingredients</h3>
          <ul className="list-inside list-disc space-y-1 text-sm">
            {recipe.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 font-semibold">Instructions</h3>
          <ol className="list-inside list-decimal space-y-1 text-sm">
            {recipe.instructions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RecipeDialog
