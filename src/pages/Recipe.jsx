import React, { useState } from "react";
import "../styles/Recipe.css";

const recipes = [
  // Breakfast
  {
    id: 1,
    category: "Breakfast",
    title: "Avocado Toast",
    description: "Creamy avocado on crispy toast with fresh herbs and a hint of chili.",
    time: "10 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    category: "Breakfast",
    title: "Berry Pancakes",
    description: "Fluffy homemade pancakes topped with fresh berries and maple syrup.",
    time: "20 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "Breakfast",
    title: "Classic Omelette",
    description: "A soft and fluffy omelette filled with vegetables, cheese and herbs.",
    time: "15 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1510693206972-df098f0cbfbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    category: "Breakfast",
    title: "Greek Yogurt Bowl",
    description: "Creamy Greek yogurt with granola, honey, fruits and crunchy nuts.",
    time: "8 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    category: "Breakfast",
    title: "French Toast",
    description: "Golden cinnamon French toast served with berries and maple syrup.",
    time: "18 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80",
  },

  // Lunch
  {
    id: 6,
    category: "Lunch",
    title: "Chicken Caesar Salad",
    description: "Crisp lettuce, grilled chicken, parmesan and creamy Caesar dressing.",
    time: "25 min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    category: "Lunch",
    title: "Mediterranean Bowl",
    description: "Fresh vegetables, chickpeas, rice, feta and a delicious tahini dressing.",
    time: "25 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    category: "Lunch",
    title: "Creamy Tomato Pasta",
    description: "Rich tomato pasta with garlic, parmesan and fresh basil.",
    time: "30 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    category: "Lunch",
    title: "Grilled Chicken Wrap",
    description: "Juicy grilled chicken wrapped with crunchy vegetables and creamy sauce.",
    time: "20 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    category: "Lunch",
    title: "Veggie Buddha Bowl",
    description: "A nourishing bowl of roasted vegetables, grains, greens and avocado.",
    time: "35 min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },

  // Dinner
  {
    id: 11,
    category: "Dinner",
    title: "Creamy Garlic Chicken",
    description: "Tender chicken cooked in a rich creamy garlic and herb sauce.",
    time: "35 min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    category: "Dinner",
    title: "Margherita Pizza",
    description: "Classic pizza topped with tomato, mozzarella, basil and olive oil.",
    time: "40 min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    category: "Dinner",
    title: "Teriyaki Salmon",
    description: "Pan-seared salmon glazed with homemade sweet and savory teriyaki sauce.",
    time: "30 min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    category: "Dinner",
    title: "Vegetable Curry",
    description: "Aromatic vegetables simmered in a creamy coconut curry sauce.",
    time: "40 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    category: "Dinner",
    title: "Beef Steak",
    description: "Juicy pan-seared steak served with roasted vegetables and herbs.",
    time: "30 min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  },

  // Snacks
  {
    id: 16,
    category: "Snacks",
    title: "Guacamole & Chips",
    description: "Fresh avocado guacamole served with crispy tortilla chips.",
    time: "10 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 17,
    category: "Snacks",
    title: "Fruit Parfait",
    description: "Layers of yogurt, fresh fruits, granola and a drizzle of honey.",
    time: "8 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 18,
    category: "Snacks",
    title: "Crispy Bruschetta",
    description: "Toasted bread topped with juicy tomatoes, basil and olive oil.",
    time: "15 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 19,
    category: "Snacks",
    title: "Energy Bites",
    description: "Healthy no-bake bites made with oats, dates, nuts and peanut butter.",
    time: "15 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 20,
    category: "Snacks",
    title: "Loaded Nachos",
    description: "Crunchy nachos loaded with cheese, beans, jalapeños and fresh salsa.",
    time: "20 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];

function Recipe() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredRecipes =
    activeCategory === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.category === activeCategory);

  return (
    <main className="recipe-page">
      <section className="recipe-hero">
        <div className="hero-content">
          <span className="hero-label">Fresh & Delicious</span>

          <h1>
            Discover Your
            <span> Next Favorite Recipe</span>
          </h1>

          <p>
            Explore delicious recipes made for every moment of your day.
            From quick breakfasts to comforting dinners.
          </p>
        </div>
      </section>

      <section className="recipe-section">
        <div className="section-heading">
          <div>
            <span className="section-label">Our Collection</span>
            <h2>Explore Recipes</h2>
          </div>

          <p>
            Simple ingredients, delicious flavors and recipes you'll love
            making again and again.
          </p>
        </div>

        <div className="category-nav">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category ? "category active" : "category"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <article className="recipe-card" key={recipe.id}>
              <div className="recipe-image-wrapper">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />

                <span className="recipe-category">
                  {recipe.category}
                </span>

                <button className="favorite-button" aria-label="Add to favorites">
                  ♡
                </button>
              </div>

              <div className="recipe-content">
                <h3>{recipe.title}</h3>

                <p>{recipe.description}</p>

                <div className="recipe-meta">
                  <span>
                    <strong>◷</strong> {recipe.time}
                  </span>

                  <span>
                    <strong>●</strong> {recipe.difficulty}
                  </span>
                </div>

                <button className="view-recipe">
                  View Recipe
                  <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Recipe;