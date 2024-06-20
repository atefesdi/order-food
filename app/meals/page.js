import { Suspense } from "react"

import MealsGrid from "@/components/meals/meals-grid"
import Link from "next/link"

import classes from "./page.module.css"
import { getMeals } from "../../lib/meals"

async function Meals() {
  const meals = await getMeals()

  return <MealsGrid meals={meals} />
}

export default function MealPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <Suspense fallback={<p className={classes.loading}>Fetching meals</p>}>
        <main className={classes.main}>
          <Meals />
        </main>
      </Suspense>
    </>
  )
}
