import React from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Admin.css";

function AdminDashboard() {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: "Total Recipes",
      value: "248",
      icon: "🍳",
      description: "+12 this month",
    },
    {
      title: "Ingredients",
      value: "536",
      icon: "🥕",
      description: "+24 this month",
    },
    {
      title: "Users",
      value: "1,284",
      icon: "👥",
      description: "+86 this month",
    },
    {
      title: "Categories",
      value: "18",
      icon: "📂",
      description: "Active categories",
    },
  ];

  const recentRecipes = [
    {
      id: 1,
      name: "Creamy Garlic Pasta",
      category: "Italian",
      difficulty: "Easy",
      status: "Published",
    },
    {
      id: 2,
      name: "Vegetable Fried Rice",
      category: "Asian",
      difficulty: "Easy",
      status: "Published",
    },
    {
      id: 3,
      name: "Chicken Curry",
      category: "Indian",
      difficulty: "Medium",
      status: "Published",
    },
    {
      id: 4,
      name: "Chocolate Pancakes",
      category: "Dessert",
      difficulty: "Easy",
      status: "Draft",
    },
    {
      id: 5,
      name: "Tomato Sandwich",
      category: "Quick Meals",
      difficulty: "Easy",
      status: "Published",
    },
  ];

  const popularIngredients = [
    {
      name: "Tomato",
      searches: 428,
    },
    {
      name: "Potato",
      searches: 386,
    },
    {
      name: "Onion",
      searches: 351,
    },
    {
      name: "Chicken",
      searches: 329,
    },
    {
      name: "Egg",
      searches: 294,
    },
  ];

  return (
    <div className="admin-page">

      {/* SIDEBAR */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <span>🍴</span>
          <h2>RecipeFinder</h2>
        </div>

        <nav className="admin-nav">

          <a
            href="/admin"
            className="admin-nav-item active"
          >
            <span>📊</span>
            Dashboard
          </a>

          <a
            href="/admin/recipes"
            className="admin-nav-item"
          >
            <span>🍳</span>
            Recipes
          </a>

          <a
            href="/admin/ingredients"
            className="admin-nav-item"
          >
            <span>🥕</span>
            Ingredients
          </a>

          <a
            href="/admin/categories"
            className="admin-nav-item"
          >
            <span>📂</span>
            Categories
          </a>

          <a
            href="/admin/users"
            className="admin-nav-item"
          >
            <span>👥</span>
            Users
          </a>

        </nav>

        <div className="admin-sidebar-bottom">

          <a
            href="/"
            className="admin-nav-item"
          >
            <span>🏠</span>
            Website
          </a>

          <button
            className="admin-logout"
            onClick={logout}
          >
            <span>🚪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">

          <div>
            <p className="admin-small-title">
              Admin Panel
            </p>

            <h1>
              Welcome back, {user?.username || "Admin"} 👋
            </h1>
          </div>

          <div className="admin-profile">

            <div className="admin-avatar">
              {user?.username?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div>
              <strong>
                {user?.username || "Admin"}
              </strong>

              <span>
                Administrator
              </span>
            </div>

          </div>

        </header>

        {/* STATS */}

        <section className="admin-stats">

          {stats.map((stat) => (
            <div
              className="admin-stat-card"
              key={stat.title}
            >

              <div className="stat-icon">
                {stat.icon}
              </div>

              <div className="stat-content">

                <p>{stat.title}</p>

                <h2>{stat.value}</h2>

                <span>
                  {stat.description}
                </span>

              </div>

            </div>
          ))}

        </section>

        {/* QUICK ACTIONS */}

        <section className="admin-section">

          <div className="section-heading">

            <div>
              <h2>Quick Actions</h2>

              <p>
                Manage your recipe website
              </p>
            </div>

          </div>

          <div className="quick-actions">

            <a
              href="/admin/recipes/add"
              className="quick-action"
            >
              <span>➕</span>

              <div>
                <strong>
                  Add Recipe
                </strong>

                <p>
                  Create a new recipe
                </p>
              </div>
            </a>

            <a
              href="/admin/ingredients"
              className="quick-action"
            >
              <span>🥕</span>

              <div>
                <strong>
                  Add Ingredient
                </strong>

                <p>
                  Manage available ingredients
                </p>
              </div>
            </a>

            <a
              href="/admin/categories"
              className="quick-action"
            >
              <span>📂</span>

              <div>
                <strong>
                  Categories
                </strong>

                <p>
                  Manage recipe categories
                </p>
              </div>
            </a>

          </div>

        </section>

        {/* TWO COLUMNS */}

        <div className="admin-grid">

          {/* RECENT RECIPES */}

          <section className="admin-card">

            <div className="card-header">

              <div>
                <h2>Recent Recipes</h2>

                <p>
                  Recently added recipes
                </p>
              </div>

              <a href="/admin/recipes">
                View all
              </a>

            </div>

            <div className="recipe-table">

              {recentRecipes.map((recipe) => (
                <div
                  className="recipe-row"
                  key={recipe.id}
                >

                  <div className="recipe-icon">
                    🍽️
                  </div>

                  <div className="recipe-info">

                    <strong>
                      {recipe.name}
                    </strong>

                    <span>
                      {recipe.category}
                    </span>

                  </div>

                  <span
                    className={`difficulty ${recipe.difficulty.toLowerCase()}`}
                  >
                    {recipe.difficulty}
                  </span>

                  <span
                    className={`status ${recipe.status.toLowerCase()}`}
                  >
                    {recipe.status}
                  </span>

                </div>
              ))}

            </div>

          </section>

          {/* POPULAR INGREDIENTS */}

          <section className="admin-card">

            <div className="card-header">

              <div>
                <h2>Popular Ingredients</h2>

                <p>
                  Most searched ingredients
                </p>
              </div>

              <a href="/admin/ingredients">
                View all
              </a>

            </div>

            <div className="ingredient-list">

              {popularIngredients.map(
                (ingredient, index) => (
                  <div
                    className="ingredient-row"
                    key={ingredient.name}
                  >

                    <div className="ingredient-number">
                      {index + 1}
                    </div>

                    <div className="ingredient-name">
                      <strong>
                        {ingredient.name}
                      </strong>

                      <div className="ingredient-progress">

                        <span
                          style={{
                            width: `${
                              (ingredient.searches /
                                popularIngredients[0]
                                  .searches) *
                              100
                            }%`,
                          }}
                        />

                      </div>

                    </div>

                    <strong>
                      {ingredient.searches}
                    </strong>

                  </div>
                )
              )}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;
