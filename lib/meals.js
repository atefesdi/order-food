import fs from "node:fs"

import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"

const db = sql("meals.db")

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // throw new Error("loading meals failedxs")
  return db.prepare("SELECT * FROM meals").all()
}

export function getMealDetails(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug)
}

export async function saveMeal(meal) {
  console.log("meal :>> ", meal)
  const slug = slugify(meal.title, { lower: true })
  meal.slug = slug

  meal.instructions = xss(meal.instructions)
  console.log("meal :>> ", meal)

  const extension = meal.image.name.split(".").pop()
  const fileName = `${meal.title}.${extension}`

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferImage = await meal.image.arrayBuffer()

  stream.write(Buffer.from(bufferImage), (error) => {
    if (error) {
      throw new Error("Saving image failed")
    }
  })

  meal.image = `/images/${fileName}`

  db.prepare(
    `INSERT INTO meals
     (title, summary, instructions, creator, creator_email, image, slug) 
     VALUES 
     (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)`
  ).run(meal)
}
