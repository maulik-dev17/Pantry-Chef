import React from "react";
import { Link } from "react-router-dom";
import logobg from "../assets/logos.png";
import "../styles/Footer.css";

function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Brand */}
                <div className="footer-brand">
                    <Link
                        to="/"
                        className="footer-logo"
                        aria-label="Go to PantryChef home"
                    >
                        <img src={logobg} alt="PantryChef logo" />
                    </Link>
                </div>
                {/* Footer texts */}

                 <p>
                        Discover delicious recipes and make every meal
                        special with PantryChef.
                    </p>

                {/* Social Media */}
                <div className="footer-connect">
                    <h3>Follow Us</h3>

                    <div className="footer-socials">
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow PantryChef on Instagram"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="5"
                                />
                                <circle cx="12" cy="12" r="4" />
                                <circle
                                    cx="17.5"
                                    cy="6.5"
                                    r="1"
                                    fill="currentColor"
                                    stroke="none"
                                />
                            </svg>

                            <span>Instagram</span>
                        </a>

                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow PantryChef on Facebook"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v4h4v-4h3.5l.5-4H13V9c0-.7.3-1 1-1Z" />
                            </svg>

                            <span>Facebook</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p>
                    © {currentYear} PantryChef. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;