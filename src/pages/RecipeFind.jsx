import React from "react";

import "../styles/RecipeFind.css";
import { Link } from "react-router-dom";

/* ---------- Icons (inline SVG, no external icon library needed) ---------- */

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChefHatIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="M6 13.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 13.5a3.5 3.5 0 0 1-1-6.86A4 4 0 0 1 8.8 3.4 4 4 0 0 1 15.2 3.4a4 4 0 0 1 3.8 3.24A3.5 3.5 0 0 1 18 13.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckBadgeIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.2 2.2L16 10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Data ---------- */
/* Swap these `image` URLs for your own product photography / local assets. */

const RECIPES = [
  {
    id: 1,
    title: "Creamy Lemon Garlic Pasta",
    image: "https://loremflickr.com/640/480/pasta,lemon,garlic",
    match: 98,
    time: "20 mins",
    difficulty: "Easy",
    have: "Pasta, Lemon, Garlic, Butter, Parmesan.",
    missing: "Fresh Parsley.",
  },
  {
    id: 2,
    title: "Classic Shakshuka",
    image: "https://loremflickr.com/640/480/shakshuka,skillet",
    match: 92,
    time: "35 mins",
    difficulty: "Medium",
    have: "Eggs, Canned Tomatoes, Onions, Olive Oil.",
    missing: "Bell Peppers, Cumin.",
  },
  {
    id: 3,
    title: "Roasted Sweet Potato Quinoa Bowl",
    image: "https://loremflickr.com/640/480/quinoa,sweetpotato,bowl",
    match: 85,
    time: "45 mins",
    difficulty: "Easy",
    have: "Sweet Potatoes, Black Beans, Olive Oil.",
    missing: "Quinoa, Lime, Cilantro, Corn.",
  },
];

/* ---------- Subcomponents ---------- */

function RecipeCard({ recipe }) {
  const { title, image, match, time, difficulty, have, missing } = recipe;

  return (
    <article className="recipe-card">
      <div className="recipe-card__media">
        <img src={image} alt={title} loading="lazy" />
        <span className="recipe-card__badge">
          <CheckBadgeIcon /> {match}% Match
        </span>
      </div>

      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{title}</h3>

        <div className="recipe-card__meta">
          <span>
            <ClockIcon /> {time}
          </span>
          <span>
            <ChefHatIcon /> {difficulty}
          </span>
        </div>

        <div className="recipe-card__ingredients">
          <h4>Ingredients</h4>
          <p>
            <span className="label label--have">You have:</span> {have}
          </p>
          <p>
            <span className="label label--missing">Missing:</span> {missing}
          </p>
        </div>
        <Link to="/RecipePage">
          <button type="button" className="btn-view-recipe">
            View Recipe <ArrowRightIcon />
          </button>
        </Link>
      </div>
    </article>
  );
}

/* ---------- Page ---------- */

export default function RecipeFind() {
  return (
    <div className="pantrychef">
      <main>
        <section className="hero">
          <div className="hero__inner">
            <h1>Recipes you can make</h1>
            <p>Based on your ingredients, time and cooking experience.</p>
          </div>
        </section>

        <section className="results">
          <div className="results__bar">
            <span className="results__count">Showing 12 matches</span>
            <button type="button" className="results__filter">
              <FilterIcon /> Filter Results
            </button>
          </div>

          <div className="results__divider" />

          <div className="recipe-grid">
            {RECIPES.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}