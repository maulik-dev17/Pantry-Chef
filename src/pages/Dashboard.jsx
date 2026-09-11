import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  HelpCircle,
  LayoutGrid,
  UtensilsCrossed,
  Droplet,
  LayoutList,
  SlidersHorizontal,
  TrendingUp,
  Settings,
  User,
  Plus,
  ChevronDown,
  Download,
  Star,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  PieChart,
  Activity,
  FilePlus2,
} from "lucide-react";
import "../styles/Dashboard.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "recipes", label: "Recipes", icon: UtensilsCrossed },
  { id: "ingredients", label: "Ingredients", icon: Droplet },
  { id: "categories", label: "Categories", icon: LayoutList },
  { id: "rules", label: "Rules", icon: SlidersHorizontal },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
];

const POPULAR_RECIPES = [
  { name: "Vegetable Fried Rice", rating: 4.9, views: "3.2k", color: "#f4c95d" },
  { name: "Potato Rice", rating: 4.7, views: "2.8k", color: "#e8a15c" },
  { name: "Tomato Rice", rating: 4.3, views: "1.9k", color: "#e0705a" },
];

const RECENT_ACTIVITY = [
  {
    icon: CheckCircle2,
    text: (
      <>
        Recipe <strong>&lsquo;Potato Rice&rsquo;</strong> published
      </>
    ),
    time: "5m ago",
  },
  {
    icon: Plus,
    text: (
      <>
        Ingredient <strong>&lsquo;Cumin&rsquo;</strong> added
      </>
    ),
    time: "20m ago",
  },
];

const QUICK_ACTIONS = [
  { icon: Plus, label: "Add Recipe", primary: true },
  { icon: FilePlus2, label: "Add Ingredient", primary: false },
  { icon: LayoutList, label: "Manage Recipes", primary: false },
  { icon: TrendingUp, label: "View Analytics", primary: false },
];

// Smooth wavy area path approximating "Recipe Performance" trend
const CHART_LINE =
  "M0,150 C40,145 60,178 100,174 C140,170 150,112 190,104 " +
  "C230,96 252,150 292,160 C330,168 352,150 392,138 " +
  "C432,126 440,66 480,42 C516,20 532,14 560,34 C580,46 592,40 600,44";
const CHART_AREA = `${CHART_LINE} L600,220 L0,220 Z`;

export default function Dashboard() {
  const [range, setRange] = useState("Last 30 Days");

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    console.log(userToken);


    if (!userToken) {
      navigate("/auth")
    }
    else {
      async function verifyUser() {
        let response = await fetch('https://dummyjson-clone-server.vercel.app/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userToken
          }
        })

        let result = await response.json();

        console.log(result);

        if (!result.username) {
          navigate("/auth")
        }

      }

      verifyUser();
    }
  }, [])

  return (
    <div className="ra-app">
      {/* ---------- Sidebar ---------- */}
      <aside className="ra-sidebar">
        <div className="ra-brand">
          <span className="ra-brand-mark">
            <UtensilsCrossed size={16} />
          </span>
          <div className="ra-brand-text">
            <div className="ra-brand-name">RecipeAdmin</div>
            <div className="ra-brand-sub">Management Suite</div>
          </div>
        </div>

        <nav className="ra-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`ra-nav-item${item.id === "dashboard" ? " is-active" : ""}`}
              >
                <Icon size={18} strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="ra-sidebar-footer">
          <button className="ra-nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="ra-nav-item">
            <User size={18} />
            <span>Admin Profile</span>
          </button>
        </div>
      </aside>

      {/* ---------- Main ---------- */}
      <main className="ra-main">
        {/* Topbar */}
        <header className="ra-topbar">
          <h1 className="ra-page-title">Dashboard</h1>

          <div className="ra-search">
            <Search size={16} />
            <input type="text" placeholder="Search recipes, ingredients..." />
          </div>

          <div className="ra-topbar-actions">
            <button className="ra-icon-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="ra-dot" />
            </button>
            <button className="ra-icon-btn" aria-label="Help">
              <HelpCircle size={18} />
            </button>
            <div className="ra-avatar">
              <User size={16} />
            </div>
          </div>
        </header>

        {/* Overview heading */}
        <section className="ra-overview-header">
          <div>
            <h2>Overview</h2>
            <p>High-level metrics for your recipe platform.</p>
          </div>
          <button className="ra-export-btn">
            <Download size={15} />
            Export Report
          </button>
        </section>

        {/* Stat cards */}
        <section className="ra-stats-grid">
          <div className="ra-card ra-stat-card">
            <div className="ra-stat-top">
              <span className="ra-stat-label">Total Recipes</span>
              <span className="ra-badge-icon">
                <UtensilsCrossed size={16} />
              </span>
            </div>
            <div className="ra-stat-bottom">
              <span className="ra-stat-value">248</span>
              <span className="ra-trend ra-trend-up">
                <ArrowUpRight size={14} />
                12%
              </span>
            </div>
          </div>

          <div className="ra-card ra-stat-card">
            <div className="ra-stat-top">
              <span className="ra-stat-label">Status Split</span>
              <span className="ra-badge-icon">
                <PieChart size={16} />
              </span>
            </div>
            <div className="ra-split-row">
              <div className="ra-split-item">
                <span className="ra-split-label">Published</span>
                <span className="ra-split-value">214</span>
              </div>
              <div className="ra-split-item">
                <span className="ra-split-label">Draft</span>
                <span className="ra-split-value">34</span>
              </div>
            </div>
          </div>

          <div className="ra-card ra-stat-card">
            <div className="ra-stat-top">
              <span className="ra-stat-label">Ingredients</span>
              <span className="ra-badge-icon">
                <Droplet size={16} />
              </span>
            </div>
            <div className="ra-stat-bottom">
              <span className="ra-stat-value">156</span>
              <span className="ra-trend ra-trend-neutral">
                <ArrowRight size={14} />
                0%
              </span>
            </div>
          </div>

          <div className="ra-card ra-stat-card ra-stat-card--outlined">
            <div className="ra-stat-top">
              <span className="ra-stat-label">Engagement</span>
              <span className="ra-badge-icon">
                <Activity size={16} />
              </span>
            </div>
            <div className="ra-split-row">
              <div className="ra-split-item">
                <span className="ra-split-label">Views</span>
                <span className="ra-split-value">12.8k</span>
              </div>
              <div className="ra-split-divider" />
              <div className="ra-split-item">
                <span className="ra-split-label">Started</span>
                <span className="ra-split-value">4.2k</span>
              </div>
            </div>
          </div>
        </section>

        {/* Two-column content */}
        <section className="ra-content-grid">
          {/* Left column */}
          <div className="ra-col-left">
            <div className="ra-card ra-chart-card">
              <div className="ra-chart-header">
                <h3>Recipe Performance</h3>
                <button
                  className="ra-range-btn"
                  onClick={() =>
                    setRange((r) =>
                      r === "Last 30 Days" ? "Last 7 Days" : "Last 30 Days"
                    )
                  }
                >
                  {range}
                  <ChevronDown size={14} />
                </button>
              </div>

              <svg
                className="ra-chart-svg"
                viewBox="0 0 600 220"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="raAreaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2f6b4f" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#2f6b4f" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={CHART_AREA} fill="url(#raAreaFill)" stroke="none" />
                <path
                  d={CHART_LINE}
                  fill="none"
                  stroke="#1f3d2e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="ra-quick-actions">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <button className="ra-quick-action" key={action.label}>
                    <span
                      className={`ra-quick-icon${action.primary ? " is-primary" : ""
                        }`}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="ra-quick-label">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="ra-col-right">
            <div className="ra-card ra-popular-card">
              <h3>Most Popular Recipes</h3>
              <ul className="ra-popular-list">
                {POPULAR_RECIPES.map((recipe) => (
                  <li key={recipe.name}>
                    <span
                      className="ra-thumb"
                      style={{ background: recipe.color }}
                    />
                    <div className="ra-popular-info">
                      <span className="ra-popular-name">{recipe.name}</span>
                      <span className="ra-popular-rating">
                        <Star size={12} fill="#f4b400" stroke="#f4b400" />
                        {recipe.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="ra-popular-views">
                      <span className="ra-popular-views-value">
                        {recipe.views}
                      </span>
                      <span className="ra-popular-views-label">views</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="ra-view-all">View All Rankings</button>
            </div>

            <div className="ra-card ra-activity-card">
              <h3>Recent Activity</h3>
              <ul className="ra-activity-list">
                {RECENT_ACTIVITY.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i}>
                      <span className="ra-activity-icon">
                        <Icon size={14} />
                      </span>
                      <div className="ra-activity-info">
                        <span className="ra-activity-text">{item.text}</span>
                        <span className="ra-activity-time">{item.time}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}