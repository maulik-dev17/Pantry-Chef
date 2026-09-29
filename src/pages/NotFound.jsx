// NotFound.jsx

import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__glow" />

      <section className="not-found__content">
        <div className="not-found__badge">
          <span className="not-found__dot" />
          KITCHEN ERROR
        </div>

        <div className="not-found__number">
          <span>4</span>

          <div className="not-found__plate">
            <div className="not-found__plate-inner">
              <span className="not-found__leaf">✦</span>
            </div>
          </div>

          <span>4</span>
        </div>

        <div className="not-found__text">
          <h1>Oops! This recipe is missing.</h1>

          <p>
            Looks like this page wandered out of the kitchen.
            Let’s get you back to the good stuff.
          </p>
        </div>

        <a href="/" className="not-found__button">
          <span>←</span>
          Back to Kitchen
        </a>
      </section>

      <div className="not-found__ingredients">
        <span className="ingredient ingredient--one">✦</span>
        <span className="ingredient ingredient--two">•</span>
        <span className="ingredient ingredient--three">✧</span>
        <span className="ingredient ingredient--four">•</span>
      </div>

      <div className="not-found__grid" />
    </main>
  );
}