import React from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeById } from "../data/recipes.js";
import "../styles/RecipeDetail.css";

/* ---------- Icons ---------- */

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BarsIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18v-4M12 18V9M18 18V6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ForkKnifeIcon = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 3v7a2 2 0 0 0 2 2v9M7 3v7M10 3v7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 3c-1.5 0-2.5 1.8-2.5 4s1 4 2.5 4v10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.2 2.2L16 10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
    <path
      d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H5.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckBadgeIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.2 2.2L16 10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Page ---------- */

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = getRecipeById(id);

  if (!recipe) {
    return (
      <div className="recipe-detail">
        <div className="recipe-detail__not-found">
          <h1>Recipe not found</h1>
          <p>We couldn't find that recipe.</p>
          <Link to="/" className="btn-back">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }

  const { title, detailImage, image, match, time, difficulty, servings, haveIngredients, needIngredients, instructions } = recipe;

  return (
    <div className="recipe-detail">
      <Header />

      <div className="recipe-detail__layout">
        <div className="recipe-detail__media">
          <img src={detailImage || image} alt={title} />
          <span className="recipe-detail__badge">{match}% Match</span>

          <div className="recipe-detail__media-overlay">
            <h1>{title}</h1>
            <div className="recipe-detail__meta">
              <span>
                <ClockIcon /> {time}
              </span>
              <span>
                <BarsIcon /> {difficulty}
              </span>
              <span>
                <ForkKnifeIcon /> {servings}
              </span>
            </div>
          </div>
        </div>

        <div className="recipe-detail__content">
          <section>
            <h2 className="section-title">Ingredients</h2>
            <div className="section-divider" />

            <div className="ingredients-grid">
              <div className="ingredients-col">
                <h3 className="ingredients-col__title ingredients-col__title--have">
                  <CheckCircleIcon /> You have
                </h3>
                <ul className="pill-list">
                  {haveIngredients.map((item) => (
                    <li key={item.text} className="pill pill--have">
                      <span className="pill__icon">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ingredients-col">
                <h3 className="ingredients-col__title ingredients-col__title--need">
                  <CartIcon /> You'll need
                </h3>
                <ul className="pill-list">
                  {needIngredients.map((item) => (
                    <li key={item.text} className="pill pill--need">
                      <span className="pill__icon">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title">Instructions</h2>
            <div className="section-divider" />

            <ol className="steps-list">
              {instructions.map((step, index) => (
                <li key={step.title} className="step-card">
                  <span className={`step-card__number ${index === 0 ? "step-card__number--active" : ""}`}>
                    {index + 1}
                  </span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <button type="button" className="btn-start-cooking">
        <ForkKnifeIcon size={16} /> Start Cooking
      </button>
    </div>
  );
}