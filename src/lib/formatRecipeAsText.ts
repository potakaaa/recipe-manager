import type { Recipe } from "@/types/recipe"

/**
 * Turns a recipe into a plain-text block suitable for clipboard / sharing.
 */
export function formatRecipeAsText(recipe: Recipe): string {
  const lines: string[] = []

  lines.push(recipe.title)
  lines.push("")
  lines.push(`Category: ${recipe.category}`)
  lines.push(`Cooking time: ${recipe.cookingTime} min`)
  lines.push(`Servings: ${recipe.servings}`)
  lines.push("")
  lines.push("Ingredients:")
  for (const item of recipe.ingredients) {
    lines.push(`• ${item}`)
  }
  lines.push("")
  lines.push("Instructions:")
  recipe.instructions.forEach((step, i) => {
    lines.push(`${i + 1}. ${step}`)
  })

  return lines.join("\n")
}

export async function copyRecipeAsText(recipe: Recipe): Promise<void> {
  await navigator.clipboard.writeText(formatRecipeAsText(recipe))
}
