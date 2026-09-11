import React, { useState } from "react";
import "../styles/Ingredients.css";

function Ingredients() {
  const [selectedIngredients, setSelectedIngredients] = useState([
    "Brown Rice",
    "Garlic",
    "Olive Oil",
  ]);

  const categories = [
    {
      title: "🌿 Vegetables",
      items: ["Onion", "Carrot", "Tomato", "Bell Pepper", "Broccoli"],
    },
    {
      title: "🥩 Proteins",
      items: ["Chicken Breast", "Tofu", "Eggs", "Ground Beef"],
    },
    {
      title: "🌾 Grains & Pasta",
      items: ["Spaghetti", "Quinoa", "Oats", "Bread"],
    },
    {
      title: "🥛 Dairy",
      items: ["Milk", "Cheddar Cheese", "Butter", "Yogurt"],
    },
  ];

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const removeIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.filter((item) => item !== ingredient)
    );
  };

  return (
    
    <div className="page">

      {/* Main Content */}
      <main className="main">

        {/* Hero */}
        <section className="hero">
          <h1>What's in your kitchen?</h1>
          <p>Add the ingredients you already have.</p>
        </section>

        {/* Search */}
        <div className="search-container">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search for Rice, Potato, Garlic..."
          />
        </div>

        {/* Selected Ingredients */}
        <section className="selected-section">
          <p className="selected-title">Selected Ingredients</p>

          <div className="selected-list">
            {selectedIngredients.map((ingredient) => (
              <button
                key={ingredient}
                className="selected-chip"
                onClick={() => removeIngredient(ingredient)}
              >
                {ingredient}
                <span>×</span>
              </button>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="categories">
          {categories.map((category) => (
            <div className="category-card" key={category.title}>

              <h2>{category.title}</h2>

              <div className="ingredient-list">
                {category.items.map((ingredient) => (
                  <button
                    key={ingredient}
                    className={`ingredient-btn ${
                      selectedIngredients.includes(ingredient)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => toggleIngredient(ingredient)}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>

            </div>
          ))}
        </section>

        {/* Divider */}
        <div className="divider"></div>

        {/* Continue */}
        <div className="continue-container">
          <button className="continue-btn">
            Continue
          </button>
        </div>

      </main>


    </div>
  );
}

export default Ingredients;