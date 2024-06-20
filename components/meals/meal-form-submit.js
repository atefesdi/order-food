"use client"

import { useFormStatus } from "react-dom"

function MealFormSubmit() {
  const { pending } = useFormStatus

  return (
    <button disable={pending}>{pending ? "Submitting" : "Share Meal"}</button>
  )
}

export default MealFormSubmit
