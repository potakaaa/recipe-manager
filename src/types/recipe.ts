export type Recipe = {
  id: number
  title: string
  image: string
  ingredients: string[]
  instructions: string[]
  cookingTime: number
  servings: number
  category: string
  isCustom?: boolean
}
