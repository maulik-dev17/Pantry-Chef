import React, { useMemo, useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
const isLoggedIn = !!localStorage.getItem("token");

const recipes = [
  {
    id: 1,
    title: "Avocado & Heirloom Citrus Salad",
    category: "Lunch",
    time: "15 mins",
    difficulty: "Easy",
    calories: "320 kcal",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    title: "Golden Morning Pancakes",
    category: "Breakfast",
    time: "20 mins",
    difficulty: "Easy",
    calories: "410 kcal",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    title: "Creamy Herb Pasta",
    category: "Dinner",
    time: "30 mins",
    difficulty: "Medium",
    calories: "520 kcal",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 4,
    title: "Dark Chocolate Tart",
    category: "Dessert",
    time: "45 mins",
    difficulty: "Medium",
    calories: "390 kcal",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 5,
    title: "Roasted Mediterranean Bowl",
    category: "Lunch",
    time: "25 mins",
    difficulty: "Easy",
    calories: "360 kcal",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 6,
    title: "Truffle Mushroom Risotto",
    category: "Dinner",
    time: "40 mins",
    difficulty: "Medium",
    calories: "480 kcal",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=1000",
  },
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory =
        selectedCategory === "All" ||
        recipe.category === selectedCategory;

      const search = searchText.toLowerCase().trim();

      const matchesSearch =
        !search ||
        recipe.title.toLowerCase().includes(search) ||
        recipe.category.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchText]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    document.getElementById("aesthetic-recipes")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="home">
      {/* ==============================
          BACKGROUND
      =============================== */}
      <div className="home__background" />

      {/* ==============================
          HERO
      =============================== */}
      <section className="home__hero" aria-labelledby="home-title">
        <div className="home__content">
          <span className="home__eyebrow">
            Editorial Collection 2026
          </span>

          <h1 id="home-title" className="home__title">
            Nourish your soul with
            <br />
            curated warmth.
          </h1>

          <p className="home__description">
            A peaceful sanctuary for culinary explorers. Minimalist
            step-by-step recipes, hand-selected seasonal ingredients,
            and wholesome everyday delight.
          </p>

          <div className="home__hero-actions">
            <Link
              to={isLoggedIn ? "/Ingredients" : "/Auth"}
              className="home__button"
            >
              Find a Recipe
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="home__hero-image-wrapper">
          <div className="home__hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1000"
              alt="Fresh healthy avocado citrus salad"
              className="home__hero-image"
            />

            <div className="home__hero-gradient" />

            <div className="home__recipe-of-day">
              <span>Recipe of the day</span>

              <h3>Avocado & Heirloom Citrus Salad</h3>

              <p>15 mins • Easy • 320 kcal</p>
            </div>
          </div>

          <div className="home__organic-badge">
            <div className="home__organic-icon">✦</div>

            <div>
              <span>100% Organic</span>
              <strong>Farm Fresh</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          CATEGORIES
      =============================== */}
      <section
        className="home__categories"
        id="aesthetic-featured"
      >
        <div className="home__section-heading">
          <div>
            <h2>Curated Categories</h2>

            <p>Find delicious ideas by course</p>
          </div>
        </div>

        <div className="home__category-grid">
          <CategoryCard
            icon="🥚"
            title="Morning"
            count="12 Recipes"
            category="Breakfast"
            selectedCategory={selectedCategory}
            onClick={handleCategoryClick}
          />

          <CategoryCard
            icon="🥗"
            title="Healthy Bowls"
            count="18 Recipes"
            category="Lunch"
            selectedCategory={selectedCategory}
            onClick={handleCategoryClick}
          />

          <CategoryCard
            icon="🍽"
            title="Gourmet Dinner"
            count="24 Recipes"
            category="Dinner"
            selectedCategory={selectedCategory}
            onClick={handleCategoryClick}
          />

          <CategoryCard
            icon="🍪"
            title="Sweets"
            count="15 Recipes"
            category="Dessert"
            selectedCategory={selectedCategory}
            onClick={handleCategoryClick}
          />
        </div>
      </section>

      {/* ==============================
          RECIPES
      =============================== */}
      <section
        id="aesthetic-recipes"
        className="home__recipes"
      >
        <div className="home__recipe-header">
          <div>
            <span className="home__small-label">
              DISCOVER
            </span>

            <h2>Minimalist Masterpieces</h2>
          </div>

          <div className="home__search">
            <span>⌕</span>

            <input
              type="text"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
              placeholder="Search ingredients, title..."
              aria-label="Search recipes"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="home__filters">
          {[
            "All",
            "Breakfast",
            "Lunch",
            "Dinner",
            "Dessert",
          ].map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? "home__filter home__filter--active"
                  : "home__filter"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Recipe Cards */}
        <div className="home__recipe-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="home__empty">
            <h3>No recipes found</h3>

            <p>
              Try another recipe name, ingredient, or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchText("");
                setSelectedCategory("All");
              }}
            >
              Show all recipes
            </button>
          </div>
        )}
      </section>

      {/* ==============================
          CTA
      =============================== */}
      <section className="home__cta">
        <div>
          <span>YOUR NEXT MEAL STARTS HERE</span>

          <h2>
            Turn what's in your kitchen
            <br />
            into something delicious.
          </h2>

          <p>
            Tell us what ingredients you have and discover
            recipes made around your kitchen.
          </p>

          <Link to="/auth" className="home__cta-button">
            Find a Recipe
          </Link>
        </div>
      </section>
    </main>
  );
}

/* =========================================
   CATEGORY CARD
========================================= */

function CategoryCard({
  icon,
  title,
  count,
  category,
  selectedCategory,
  onClick,
}) {
  const isActive = selectedCategory === category;

  return (
    <button
      type="button"
      className={
        isActive
          ? "home__category-card home__category-card--active"
          : "home__category-card"
      }
      onClick={() => onClick(category)}
    >
      <div className="home__category-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{count}</p>
    </button>
  );
}

/* =========================================
   RECIPE CARD
========================================= */

function RecipeCard({ recipe }) {
  return (
    <article className="home__recipe-card">
      <div className="home__recipe-image-wrapper">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="home__recipe-image"
          loading="lazy"
        />

        <span className="home__recipe-category">
          {recipe.category}
        </span>
      </div>

      <div className="home__recipe-content">
        <h3>{recipe.title}</h3>

        <div className="home__recipe-meta">
          <span>{recipe.time}</span>
          <span>•</span>
          <span>{recipe.difficulty}</span>
          <span>•</span>
          <span>{recipe.calories}</span>
        </div>

        <Link
          to="/Auth"
          className="home__recipe-button"
        >
          View Recipe →
        </Link>
      </div>
    </article>
  );
}

/* =========================================
   CHEF SPECIAL CARD
========================================= */

function SpecialCard({
  title,
  description,
  image,
}) {
  return (
    <article className="home__special-card">
      <img
        src={image}
        alt={title}
        loading="lazy"
      />

      <div className="home__special-content">
        <span>CHEF SPECIAL</span>

        <h3>{title}</h3>

        <p>{description}</p>

        <Link to="/recipes">
          View Recipe →
        </Link>
      </div>
    </article>
  );
}

export default Home;