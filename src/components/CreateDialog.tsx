import type { Recipe } from "@/types/recipe"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { toast } from "sonner"

type CreateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (recipe: Recipe) => void
}

const CreateDialog = ({ open, onOpenChange, onAdd }: CreateDialogProps) => {
  const [form, setForm] = useState({
    title: "",
    image: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    servings: "",
    category: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.title) return

    const newRecipe: Recipe = {
      id: Date.now(),
      title: form.title,
      image:
        form.image ||
        "https://imgs.search.brave.com/dm7r_HQftAEriYHlI3eCuLNcxt3wsiDlIaGSi8N0IdY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/NTEyODYzMi9waG90/by9tb3N0LWNvbW1v/bi1hbGxlcmd5LWZv/b2Qtc2hvdC1mcm9t/LWFib3ZlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz12YmJr/TlZScEh2LVg0c0lL/SnphSzF5WVJDbXpF/LUNnbnVXRTk4d2xO/X3ZVPQ",
      ingredients: form.ingredients.split(",").map((i) => i.trim()),
      instructions: form.instructions.split("\n"),
      cookingTime: Number(form.cookingTime),
      servings: Number(form.servings),
      category: form.category,
    }

    onAdd(newRecipe)

    toast.success(`${form.title} recipe created successfully`)

    setForm({
      title: "",
      image: "",
      ingredients: "",
      instructions: "",
      cookingTime: "",
      servings: "",
      category: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Recipe</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            name="title"
            placeholder="Recipe title"
            value={form.title}
            onChange={handleChange}
          />
          <Input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />
          <Input
            name="category"
            placeholder="Category (e.g Pasta)"
            value={form.category}
            onChange={handleChange}
          />

          <Input
            name="cookingTime"
            placeholder="Cooking Time (mins)"
            value={form.cookingTime}
            onChange={handleChange}
          />
          <Input
            name="servings"
            placeholder="Servings"
            value={form.servings}
            onChange={handleChange}
          />
          <Textarea
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            value={form.ingredients}
            onChange={handleChange}
          />
          <Textarea
            name="instructions"
            placeholder="Instructions (one per line)"
            value={form.instructions}
            onChange={handleChange}
          />

          <Button type="submit" onClick={handleSubmit} className="w-full">
            Save Recipe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateDialog
