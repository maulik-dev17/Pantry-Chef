import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <main className="home">
      {/* Background */}
      <div className="home__background" />

      {/* Hero */}
      <section className="home__hero">
        <div className="home__content">
          <h1 className="home__title">
            What can you cook with what you
            <br />
            have?
          </h1>

          <p className="home__description">
            Tell us what's in your kitchen, how much time you have, and your
            cooking experience. We'll find recipes that fit.
          </p>

          <button className="home__button" type="button">
            <svg
              className="home__button-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M14.5 5.5l4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M13.2 6.8l4 4-5.3 5.3-4-4 5.3-5.3z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              <path
                d="M8.5 15.5L4.5 19.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M5 4.5l14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M5.5 4.5c-1.1 1.1-1.1 2.8 0 3.9 1.1 1.1 2.8 1.1 3.9 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <span>Find a Recipe</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;