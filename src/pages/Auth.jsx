import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import darkbg from "../assets/logos.png";
import "../styles/Auth.css";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Auth() {
  const [mode, setMode] = useState("login");

  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const imageContentRef = useRef(null);

  const loginRef = useRef(null);
  const signupRef = useRef(null);

  const particlesRef = useRef([]);

  const animation = useRef(null);

  /* ==========================================
     PARTICLES
  ========================================== */

  useLayoutEffect(() => {
    const particles = particlesRef.current.filter(Boolean);

    particles.forEach((particle) => {
      gsap.set(particle, {
        opacity: gsap.utils.random(0.25, 0.8),
        scale: gsap.utils.random(0.5, 1.5),
      });

      gsap.to(particle, {
        y: `+=${gsap.utils.random(-30, 30)}`,
        x: `+=${gsap.utils.random(-20, 20)}`,
        opacity: gsap.utils.random(0.15, 0.7),
        duration: gsap.utils.random(2.5, 5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 2),
      });
    });

    return () => {
      gsap.killTweensOf(particles);
    };
  }, []);

  /* ==========================================
     LOGIN -> SIGNUP
  ========================================== */

  const showSignup = () => {
    if (animation.current?.isActive()) return;

    setMode("signup");

    const image = imageRef.current;
    const imageContent = imageContentRef.current;
    const login = loginRef.current;
    const signup = signupRef.current;

    gsap.killTweensOf([
      image,
      imageContent,
      login,
      signup,
    ]);

    gsap.set(signup, {
      x: "-100%",
      opacity: 0,
      zIndex: 5,
      pointerEvents: "none",
    });

    gsap.set(login, {
      x: "0%",
      opacity: 1,
      zIndex: 2,
      pointerEvents: "none",
    });

    gsap.set(image, {
      x: "0%",
      zIndex: 10,
    });

    animation.current = gsap.timeline();

    animation.current
      .to(imageContent, {
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
      })

      .to(image, {
        x: "100%",
        duration: 0.9,
        ease: "power4.inOut",
      })

      .to(
        login,
        {
          x: "100%",
          opacity: 0,
          duration: 0.55,
          ease: "power3.inOut",
        },
        "-=0.65"
      )

      .to(
        signup,
        {
          x: "0%",
          opacity: 1,
          duration: 0.65,
          ease: "power4.out",
          onStart: () => {
            signup.style.pointerEvents = "auto";
          },
        },
        "-=0.35"
      )

      .to(
        imageContent,
        {
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.5)",
        },
        "-=0.35"
      );
  };

  /* ==========================================
     SIGNUP -> LOGIN
  ========================================== */

  const showLogin = () => {
    if (animation.current?.isActive()) return;

    setMode("login");

    const image = imageRef.current;
    const imageContent = imageContentRef.current;
    const login = loginRef.current;
    const signup = signupRef.current;

    gsap.killTweensOf([
      image,
      imageContent,
      login,
      signup,
    ]);

    gsap.set(login, {
      x: "100%",
      opacity: 0,
      zIndex: 5,
      pointerEvents: "none",
    });

    gsap.set(signup, {
      x: "0%",
      opacity: 1,
      zIndex: 2,
      pointerEvents: "none",
    });

    gsap.set(image, {
      x: "100%",
      zIndex: 10,
    });

    animation.current = gsap.timeline();

    animation.current
      .to(imageContent, {
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
      })

      .to(signup, {
        x: "-100%",
        opacity: 0,
        duration: 0.55,
        ease: "power3.inOut",
      })

      .to(
        image,
        {
          x: "0%",
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.35"
      )

      .to(
        login,
        {
          x: "0%",
          opacity: 1,
          duration: 0.65,
          ease: "power4.out",
          onStart: () => {
            login.style.pointerEvents = "auto";
          },
        },
        "-=0.55"
      )

      .to(
        imageContent,
        {
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.5)",
        },
        "-=0.35"
      );
  };

  return (
    <main className="auth-page">

      <div
        ref={wrapperRef}
        className={`auth-wrapper ${mode}`}
      >

        {/* IMAGE */}

        <div
          ref={imageRef}
          className="image-panel"
        >

          {/* PARTICLES */}

          <div className="particles">
            {Array.from({ length: 50 }).map((_, index) => {

              const left = Math.random() * 100;
              const top = Math.random() * 100;

              return (
                <span
                  key={index}
                  ref={(element) => {
                    particlesRef.current[index] = element;
                  }}
                  className="particle"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                  }}
                />
              );
            })}
          </div>

          {/* IMAGE */}

          <div
            ref={imageContentRef}
            className="image-content"
          >
            <img
              src={darkbg}
              alt="Main logo"
            />

            <div className="image-glow" />
          </div>

        </div>

        {/* LOGIN */}

        <section
          ref={loginRef}
          className="form-panel login-panel"
        >
          <LoginForm onSwitch={showSignup} />
        </section>

        {/* SIGNUP */}

        <section
          ref={signupRef}
          className="form-panel signup-panel"
        >
          <SignupForm onSwitch={showLogin} />
        </section>

      </div>

    </main>
  );
}

export default Auth;
