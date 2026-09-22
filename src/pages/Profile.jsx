import React, { useState } from "react";
import "../styles/Profile.css";

const initialRecipes = [
  {
    id: 101,
    title: "Creamy Tuscan Garlic Pasta",
    category: "Dinner",
    tag: "Italian",
    status: "published",
    time: "25 mins",
    calories: "520 kcal",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 102,
    title: "Rosemary Sourdough Focaccia",
    category: "Breakfast",
    tag: "Baking",
    status: "published",
    time: "45 mins",
    calories: "310 kcal",
    image:
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 103,
    title: "Lemon Herb Grilled Salmon",
    category: "Lunch",
    tag: "Seafood",
    status: "draft",
    time: "20 mins",
    calories: "450 kcal",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
  },
];

const initialSavedRecipes = [
  {
    id: 201,
    title: "Avocado Heirloom Citrus Salad",
    folder: "Healthy Eats",
    time: "15 mins",
    calories: "290 kcal",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 202,
    title: "Classic Pistachio Cannoli",
    folder: "Weekend Baking",
    time: "50 mins",
    calories: "410 kcal",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 203,
    title: "10-Minute Spicy Ramen",
    folder: "Quick Dinners",
    time: "10 mins",
    calories: "480 kcal",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800",
  },
];

const initialProfile = {
  name: "Chef Elena Rostova",
  handle: "@elena_bakes",
  role: "Senior Pastry & Artisanal Chef",
  location: "Barcelona, Spain",
  joined: "March 2023",
  bio: "Passionate food stylist, sourdough lover, and Mediterranean cuisine explorer. Teaching home cooks how to bring restaurant-quality pasta and pastries into their everyday kitchens. 🥖🍝✨",
  avatar:
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=500",
  banner:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600",
};

function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [savedRecipes] = useState(initialSavedRecipes);

  const [activeTab, setActiveTab] = useState("recipes");
  const [recipeFilter, setRecipeFilter] = useState("all");
  const [savedFolder, setSavedFolder] = useState("All");

  const [darkMode, setDarkMode] = useState(false);
  const [measurement, setMeasurement] = useState("metric");

  const [editModal, setEditModal] = useState(false);
  const [recipeModal, setRecipeModal] = useState(false);

  const [editForm, setEditForm] = useState({
    name: profile.name,
    handle: profile.handle,
    bio: profile.bio,
    avatar: profile.avatar,
  });

  const [recipeForm, setRecipeForm] = useState({
    title: "",
    category: "Dinner",
    tag: "",
    time: "",
    calories: "",
    image: "",
  });

  const filteredRecipes =
    recipeFilter === "all"
      ? recipes
      : recipes.filter((recipe) => recipe.status === recipeFilter);

  const filteredSaved =
    savedFolder === "All"
      ? savedRecipes
      : savedRecipes.filter((recipe) => recipe.folder === savedFolder);

  const publishedCount = recipes.filter(
    (recipe) => recipe.status === "published"
  ).length;

  const draftCount = recipes.filter(
    (recipe) => recipe.status === "draft"
  ).length;

  const handleEditProfile = (event) => {
    event.preventDefault();

    setProfile((current) => ({
      ...current,
      name: editForm.name,
      handle: editForm.handle,
      bio: editForm.bio,
      avatar: editForm.avatar,
    }));

    setEditModal(false);
  };

  const handleCreateRecipe = (event) => {
    event.preventDefault();

    const newRecipe = {
      id: Date.now(),
      title: recipeForm.title,
      category: recipeForm.category,
      tag: recipeForm.tag,
      status: "published",
      time: recipeForm.time,
      calories: recipeForm.calories,
      image:
        recipeForm.image ||
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800",
    };

    setRecipes((current) => [newRecipe, ...current]);

    setRecipeForm({
      title: "",
      category: "Dinner",
      tag: "",
      time: "",
      calories: "",
      image: "",
    });

    setRecipeModal(false);
    setActiveTab("recipes");
  };

  const deleteRecipe = (id) => {
    setRecipes((current) => current.filter((recipe) => recipe.id !== id));
  };

  const changeBanner = () => {
    const newBanner = window.prompt(
      "Enter a new banner image URL:",
      profile.banner
    );

    if (newBanner) {
      setProfile((current) => ({
        ...current,
        banner: newBanner,
      }));
    }
  };

  const shareProfile = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      window.alert("Profile URL copied to clipboard!");
    } catch {
      window.alert("Unable to copy the profile URL.");
    }
  };

  const logDish = () => {
    const dish = window.prompt("What dish did you cook today?");

    if (dish) {
      window.alert(
        `"${dish}" was added to your cooking log and +50 XP was added!`
      );
    }
  };

  const savePreferences = () => {
    window.alert("Preferences saved successfully!");
  };

  return (
    <div className={darkMode ? "profile-app dark" : "profile-app"}>
      <main className="profile-container">
        {/* PROFILE HERO */}
        <section className="profile-card profile-hero">
          <div className="profile-cover">
            <img src={profile.banner} alt="Kitchen banner" />

            <div className="profile-cover-overlay" />

            <button
              className="cover-edit-button"
              onClick={changeBanner}
              type="button"
            >
              <span>📷</span>
              Change Banner
            </button>
          </div>

          <div className="profile-info">
            <div className="profile-header-row">
              <div className="profile-identity">
                <div className="avatar-wrapper">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="profile-avatar"
                  />

                  <button
                    className="avatar-edit-button"
                    onClick={() => setEditModal(true)}
                    type="button"
                    aria-label="Edit profile"
                  >
                    ✎
                  </button>
                </div>

                <div className="profile-basic-info">
                  <div className="profile-name-row">
                    <h1>{profile.name}</h1>
                    <span className="verified-badge">✓</span>
                  </div>

                  <p className="profile-handle">
                    {profile.handle} • {profile.role}
                  </p>

                  <div className="profile-meta">
                    <span>📍 {profile.location}</span>
                    <span>•</span>
                    <span>📅 Joined {profile.joined}</span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button
                  className="button button-outline"
                  onClick={() => setEditModal(true)}
                  type="button"
                >
                  ⚙ Edit Profile
                </button>

                <button
                  className="icon-button"
                  onClick={shareProfile}
                  type="button"
                  title="Share profile"
                >
                  ↗
                </button>

                <button
                  className="button button-primary"
                  onClick={() => setRecipeModal(true)}
                  type="button"
                >
                  + New Recipe
                </button>

                <button
                  className="theme-button"
                  onClick={() => setDarkMode((current) => !current)}
                  type="button"
                  title="Toggle theme"
                >
                  {darkMode ? "☀" : "☾"}
                </button>
              </div>
            </div>

            <div className="profile-bio-section">
              <p className="profile-bio">{profile.bio}</p>

              <div className="specialty-tags">
                <span>🇮🇹 Italian & Mediterranean</span>
                <span>🥐 Artisanal Baking</span>
                <span>🌱 Farm-To-Table</span>
                <span>🍷 Wine Pairing</span>
              </div>
            </div>

            {/* STATS */}
            <div className="profile-stats">
              <Stat
                value={recipes.length}
                label="Recipes Created"
                accent
              />

              <Stat value="42" label="Bookmarks" />

              <Stat value="3.4k" label="Followers" />

              <Stat value="289" label="Following" />

              <div className="stat-card streak-stat">
                <strong>🔥 12 Days</strong>
                <span>Cook Streak</span>
              </div>
            </div>
          </div>
        </section>

        {/* TABS */}
        <div className="profile-tabs">
          <TabButton
            active={activeTab === "recipes"}
            onClick={() => setActiveTab("recipes")}
            icon="🍴"
            label="My Recipes"
            count={recipes.length}
          />

          <TabButton
            active={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
            icon="🔖"
            label="Saved & Collections"
          />

          <TabButton
            active={activeTab === "activity"}
            onClick={() => setActiveTab("activity")}
            icon="◷"
            label="Cooking Log"
          />

        </div>

        {/* MY RECIPES */}
        {activeTab === "recipes" && (
          <section className="tab-content">
            <div className="section-heading">
              <div>
                <h2>Created Recipes Overview</h2>
                <p>
                  Manage, edit, or publish your custom culinary creations.
                </p>
              </div>

              <div className="recipe-toolbar">
                <div className="filter-pills">
                  <button
                    className={recipeFilter === "all" ? "active" : ""}
                    onClick={() => setRecipeFilter("all")}
                    type="button"
                  >
                    All
                  </button>

                  <button
                    className={recipeFilter === "published" ? "active" : ""}
                    onClick={() => setRecipeFilter("published")}
                    type="button"
                  >
                    Published
                  </button>

                  <button
                    className={recipeFilter === "draft" ? "active" : ""}
                    onClick={() => setRecipeFilter("draft")}
                    type="button"
                  >
                    Drafts
                  </button>
                </div>

                <button
                  className="button button-primary"
                  onClick={() => setRecipeModal(true)}
                  type="button"
                >
                  + New Recipe
                </button>
              </div>
            </div>

            <div className="recipe-grid">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onDelete={deleteRecipe}
                />
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <EmptyState message="No recipes found for this filter." />
            )}
          </section>
        )}

        {/* SAVED */}
        {activeTab === "saved" && (
          <section className="tab-content">
            <div className="section-heading">
              <div>
                <h2>Saved Collections</h2>
                <p>Your favorite recipes organized into collections.</p>
              </div>

              <button
                className="text-button"
                type="button"
                onClick={() => window.alert("Create collection feature")}
              >
                + New Folder
              </button>
            </div>

            <div className="collection-grid">
              <CollectionCard
                icon="🔖"
                title="All Saved"
                count="42 Items"
                active={savedFolder === "All"}
                onClick={() => setSavedFolder("All")}
              />

              <CollectionCard
                icon="⏱"
                title="Quick Dinners"
                count="14 Items"
                active={savedFolder === "Quick Dinners"}
                onClick={() => setSavedFolder("Quick Dinners")}
              />

              <CollectionCard
                icon="🍪"
                title="Weekend Baking"
                count="18 Items"
                active={savedFolder === "Weekend Baking"}
                onClick={() => setSavedFolder("Weekend Baking")}
              />

              <CollectionCard
                icon="🌿"
                title="Healthy Eats"
                count="10 Items"
                active={savedFolder === "Healthy Eats"}
                onClick={() => setSavedFolder("Healthy Eats")}
              />
            </div>

            <div className="saved-section">
              <h3>
                {savedFolder === "All"
                  ? "Saved Dishes"
                  : `${savedFolder} Collection`}
              </h3>

              <div className="recipe-grid">
                {filteredSaved.map((recipe) => (
                  <SavedRecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ACTIVITY */}
        {activeTab === "activity" && (
          <section className="tab-content">
            <div className="section-heading">
              <div>
                <h2>Culinary Activity Log</h2>
                <p>Your recent kitchen milestones and cooking records.</p>
              </div>

              <button
                className="button button-dark"
                onClick={logDish}
                type="button"
              >
                + Log Dish Cooked
              </button>
            </div>

            <div className="activity-card">
              <ActivityItem
                icon="🍴"
                color="green"
                title="Cooked a Recipe"
                date="Today, 2:15 PM"
                heading="Creamy Tuscan Garlic Pasta"
                description="Added a pinch of chili flakes and sun-dried tomatoes. Came out rich and restaurant-worthy!"
                rating
              />

              <ActivityItem
                icon="🏆"
                color="amber"
                title="Achievement Unlocked"
                date="Yesterday"
                heading="Earned Badge: Master Pasta Artisan 🍝"
                description="Completed 15 handcrafted pasta dishes with perfect texture ratings."
              />

              <ActivityItem
                icon="+"
                color="primary"
                title="Published New Recipe"
                date="3 days ago"
                heading="Artisanal Rosemary Sourdough Bread"
                description="Published to public gallery • Received 128 saves and 45 likes in 24 hours."
              />
            </div>
          </section>
        )}
      </main>

      {/* EDIT PROFILE MODAL */}
      {editModal && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setEditModal(false)}
        >
          <div
            className="modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h2>✎ Edit Chef Profile</h2>

              <button
                className="modal-close"
                onClick={() => setEditModal(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditProfile} className="modal-form">
              <FormField
                label="Display Name"
                value={editForm.name}
                onChange={(value) =>
                  setEditForm((current) => ({
                    ...current,
                    name: value,
                  }))
                }
              />

              <FormField
                label="Handle"
                value={editForm.handle}
                onChange={(value) =>
                  setEditForm((current) => ({
                    ...current,
                    handle: value,
                  }))
                }
              />

              <div className="form-group">
                <label>Chef Bio</label>
                <textarea
                  rows="4"
                  value={editForm.bio}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      bio: event.target.value,
                    }))
                  }
                />
              </div>

              <FormField
                label="Avatar Image URL"
                value={editForm.avatar}
                onChange={(value) =>
                  setEditForm((current) => ({
                    ...current,
                    avatar: value,
                  }))
                }
              />

              <div className="modal-actions">
                <button
                  className="button button-outline"
                  type="button"
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </button>

                <button className="button button-primary" type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE RECIPE MODAL */}
      {recipeModal && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setRecipeModal(false)}
        >
          <div
            className="modal recipe-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h2>🍴 Create New Recipe</h2>

              <button
                className="modal-close"
                onClick={() => setRecipeModal(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateRecipe} className="modal-form">
              <FormField
                label="Recipe Title"
                placeholder="e.g. Sourdough Focaccia with Rosemary"
                value={recipeForm.title}
                onChange={(value) =>
                  setRecipeForm((current) => ({
                    ...current,
                    title: value,
                  }))
                }
                required
              />

              <div className="form-grid">
                <div className="form-group">
                  <label>Category</label>

                  <select
                    value={recipeForm.category}
                    onChange={(event) =>
                      setRecipeForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                  >
                    <option>Dinner</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dessert</option>
                  </select>
                </div>

                <FormField
                  label="Cuisine / Tag"
                  placeholder="Italian, Vegan..."
                  value={recipeForm.tag}
                  onChange={(value) =>
                    setRecipeForm((current) => ({
                      ...current,
                      tag: value,
                    }))
                  }
                  required
                />

                <FormField
                  label="Cook Time"
                  placeholder="25 mins"
                  value={recipeForm.time}
                  onChange={(value) =>
                    setRecipeForm((current) => ({
                      ...current,
                      time: value,
                    }))
                  }
                  required
                />

                <FormField
                  label="Estimated Calories"
                  placeholder="420 kcal"
                  value={recipeForm.calories}
                  onChange={(value) =>
                    setRecipeForm((current) => ({
                      ...current,
                      calories: value,
                    }))
                  }
                  required
                />
              </div>

              <FormField
                label="Image URL"
                placeholder="https://images.unsplash.com/..."
                value={recipeForm.image}
                onChange={(value) =>
                  setRecipeForm((current) => ({
                    ...current,
                    image: value,
                  }))
                }
              />

              <div className="modal-actions">
                <button
                  className="button button-outline"
                  type="button"
                  onClick={() => setRecipeModal(false)}
                >
                  Cancel
                </button>

                <button className="button button-primary" type="submit">
                  Publish Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   SMALL COMPONENTS
------------------------------------------------------- */

function Stat({ value, label, accent }) {
  return (
    <div className="stat-card">
      <strong className={accent ? "accent-text" : ""}>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, count }) {
  return (
    <button
      className={`profile-tab ${active ? "active" : ""}`}
      onClick={onClick}
      type="button"
    >
      <span>{icon}</span>
      <span>{label}</span>

      {count !== undefined && (
        <small>{count}</small>
      )}
    </button>
  );
}

function RecipeCard({ recipe, onDelete }) {
  return (
    <article className="recipe-card">
      <div className="recipe-image-wrapper">
        <img src={recipe.image} alt={recipe.title} />

        <span
          className={`recipe-status ${
            recipe.status === "draft" ? "draft" : "published"
          }`}
        >
          {recipe.status}
        </span>

        <button
          className="delete-recipe"
          onClick={() => onDelete(recipe.id)}
          type="button"
          title="Delete recipe"
        >
          ×
        </button>
      </div>

      <div className="recipe-content">
        <span className="recipe-tag">
          {recipe.tag} • {recipe.category}
        </span>

        <h3>{recipe.title}</h3>

        <div className="recipe-meta">
          <span>◷ {recipe.time}</span>
          <span>🔥 {recipe.calories}</span>
        </div>
      </div>
    </article>
  );
}

function SavedRecipeCard({ recipe }) {
  return (
    <article className="recipe-card saved-card">
      <div className="recipe-image-wrapper">
        <img src={recipe.image} alt={recipe.title} />

        <span className="saved-folder">
          {recipe.folder}
        </span>
      </div>

      <div className="recipe-content">
        <h3>{recipe.title}</h3>

        <div className="recipe-meta">
          <span>{recipe.time}</span>
          <span>{recipe.calories}</span>
        </div>
      </div>
    </article>
  );
}

function CollectionCard({
  icon,
  title,
  count,
  active,
  onClick,
}) {
  return (
    <button
      className={`collection-card ${active ? "active" : ""}`}
      onClick={onClick}
      type="button"
    >
      <span className="collection-icon">{icon}</span>
      <strong>{title}</strong>
      <small>{count}</small>
    </button>
  );
}

function ActivityItem({
  icon,
  color,
  title,
  date,
  heading,
  description,
  rating,
}) {
  return (
    <div className="activity-item">
      <div className={`activity-icon ${color}`}>
        {icon}
      </div>

      <div className="activity-content">
        <div className="activity-top">
          <strong>{title}</strong>
          <span>{date}</span>
        </div>

        <h4>{heading}</h4>

        <p>{description}</p>

        {rating && (
          <div className="rating">
            ★★★★★
            <span>(5.0 Rating)</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Badge({ icon, title, description }) {
  return (
    <div className="badge-card">
      <div className="badge-icon">{icon}</div>

      <h4>{title}</h4>

      <p>{description}</p>
    </div>
  );
}

function Preference({ icon, label, checked = false }) {
  return (
    <label className="preference-item">
      <span>
        {icon} {label}
      </span>

      <input type="checkbox" defaultChecked={checked} />
    </label>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <span>🍽️</span>
      <p>{message}</p>
    </div>
  );
}

export default Profile;