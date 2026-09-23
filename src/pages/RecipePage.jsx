import React from "react";
import "../styles/RecipePage.css";

const ingredientsYouHave = [
  {
    icon: "🌾",
    amount: "2 cups",
    name: "Basmati Rice",
  },
  {
    icon: "🥔",
    amount: "3 Medium",
    name: "Potatoes",
  },
  {
    icon: "◒",
    amount: "2 tbsp",
    name: "Olive Oil",
  },
  {
    icon: "✦",
    amount: "",
    name: "Salt to taste",
  },
];

const ingredientsNeed = [
  {
    icon: "◉",
    amount: "1 tsp",
    name: "Cumin Seeds",
  },
  {
    icon: "◌",
    amount: "",
    name: "Fresh Coriander",
  },
];

const instructions = [
  {
    number: 1,
    title: "Prep the Potatoes",
    description:
      "Wash, peel, and cube the potatoes into bite-sized pieces. Rinse the basmati rice thoroughly until the water runs clear, then soak for 15 minutes.",
  },
  {
    number: 2,
    title: "Temper Spices",
    description:
      "Heat olive oil in a heavy-bottomed pan over medium heat. Add cumin seeds and let them sizzle for about 30 seconds until fragrant.",
  },
  {
    number: 3,
    title: "Cook the Potatoes",
    description:
      "Add the cubed potatoes and season with salt. Cook for 7–8 minutes, stirring occasionally, until the potatoes begin to turn golden.",
  },
  {
    number: 4,
    title: "Add the Rice",
    description:
      "Drain the soaked rice and add it to the pan. Gently mix everything together, making sure the rice is evenly coated with the spices.",
  },
  {
    number: 5,
    title: "Finish Cooking",
    description:
      "Add water and bring to a gentle boil. Cover and cook on low heat until the rice is tender and the potatoes are completely cooked.",
  },
];

function IngredientItem({ ingredient, available }) {
  return (
    <div className={`ingredient-item ${available ? "available" : "needed"}`}>
      <div className="ingredient-icon">{ingredient.icon}</div>

      <div className="ingredient-text">
        {ingredient.amount && (
          <span className="ingredient-amount">{ingredient.amount}</span>
        )}
        <span className="ingredient-name">{ingredient.name}</span>
      </div>
    </div>
  );
}

function RecipePage() {
  return (
    <main className="recipe-page">
      {/* LEFT RECIPE IMAGE */}
      <section className="recipe-visual">
        <img
          src="/rustic-potato-rice.jpg"
          alt="Rustic Potato Rice"
          className="recipe-image"
        />

        <div className="image-overlay" />

        <div className="match-badge">
          <span>95%</span> Match
        </div>

        <div className="recipe-hero-content">
          <h1>Rustic Potato Rice</h1>

          <div className="recipe-meta">
            <div className="meta-pill">
              <span className="meta-icon">◷</span>
              35 Mins
            </div>

            <div className="meta-pill">
              <span className="meta-icon">▥</span>
              Easy
            </div>

            <div className="meta-pill">
              <span className="meta-icon">♜</span>
              4 Servings
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT CONTENT */}
      <section className="recipe-content">
        <div className="content-inner">
          {/* INGREDIENTS */}
          <section className="ingredients-section">
            <h2>Ingredients</h2>

            <div className="section-divider" />

            <div className="ingredients-grid">
              {/* YOU HAVE */}
              <div className="ingredient-column">
                <div className="ingredient-heading available-heading">
                  <span className="heading-icon">✓</span>
                  <span>You have</span>
                </div>

                <div className="ingredient-list">
                  {ingredientsYouHave.map((ingredient, index) => (
                    <IngredientItem
                      key={index}
                      ingredient={ingredient}
                      available
                    />
                  ))}
                </div>
              </div>

              {/* YOU NEED */}
              <div className="ingredient-column">
                <div className="ingredient-heading needed-heading">
                  <span className="heading-icon cart-icon">🛒</span>
                  <span>You'll need</span>
                </div>

                <div className="ingredient-list">
                  {ingredientsNeed.map((ingredient, index) => (
                    <IngredientItem
                      key={index}
                      ingredient={ingredient}
                      available={false}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* INSTRUCTIONS */}
          <section className="instructions-section">
            <h2>Instructions</h2>

            <div className="section-divider" />

            <div className="instruction-list">
              {instructions.map((step, index) => (
                <article
                  className={`instruction-card ${
                    index === 0 ? "active-step" : ""
                  }`}
                  key={step.number}
                >
                  <div className="step-number">{step.number}</div>

                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* BOTTOM ACTION */}
        <div className="cooking-bar">
          <button className="start-cooking-button">
            <span className="button-icon">⚔</span>
            <span>Start Cooking</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default RecipePage;