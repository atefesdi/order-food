import Link from "next/link"
import Image from "next/image"
import classes from "./meal-item.module.css"

function MealItem({ title, slug, image, summary, creator }) {
  console.log("object :>> ", title)
  return (
    <article className={classes.MealItem}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  )
}

export default MealItem
