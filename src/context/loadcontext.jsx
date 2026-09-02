import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/laod.css";

const CONTEXTS = {
  fullscreen: {
    frame: "fullscreen",
    ingredients: 5,
    accent: "primary",
    loading: [
      "Finding recipes for you…",
      "Checking what's in season…",
      "Matching your preferences…",
      "Preparing your recommendations…",
    ],
    long: ["Still gathering the best matches…", "Almost there — thanks for waiting."],
    error: "Something went wrong while finding your recipes.",
  },
  overlay: {
    frame: "overlay",
    ingredients: 5,
    accent: "primary",
    loading: [
      "Refreshing your recipes…",
      "Checking for anything new…",
      "Almost ready…",
    ],
    long: ["Taking a little longer than usual…"],
    error: "Something went wrong while refreshing this page.",
  },
  recommendation: {
    frame: "fullscreen",
    ingredients: 5,
    accent: "primary",
    loading: [
      "Reading your ingredients…",
      "Matching flavors you'll like…",
      "Narrowing it down…",
      "Almost ready…",
    ],
    long: ["Still narrowing things down…", "A few more seconds…"],
    error: "Something went wrong while matching your ingredients.",
  },
  recipe: {
    frame: "fullscreen",
    ingredients: 5,
    accent: "primary",
    loading: [
      "Loading the recipe…",
      "Lining up the ingredients…",
      "Getting the steps ready…",
      "Nearly there…",
    ],
    long: ["Still loading this recipe…"],
    error: "Something went wrong while loading this recipe.",
  },
  auth: {
    frame: "card",
    ingredients: 3,
    accent: "primary",
    loading: ["Signing you in…", "Setting up your kitchen…", "Just a moment…"],
    long: ["Still signing you in…"],
    error: "We couldn't sign you in.",
  },
  admin: {
    frame: "fullscreen",
    ingredients: 0,
    accent: "tertiary",
    loading: ["Loading dashboard data…", "Pulling the latest numbers…", "One moment…"],
    long: ["Still loading the dashboard…"],
    error: "Something went wrong while loading the dashboard.",
  },
};

const CONTEXT_LABELS = {
  fullscreen: "Full-screen",
  overlay: "Overlay",
  recommendation: "Recommendations",
  recipe: "Recipe",
  auth: "Sign in",
  admin: "Admin",
};

const INGREDIENTS = ["tomato", "basil", "chili", "carrot", "lemon"];

function IngredientIcon({ type }) {
  if (type === "tomato") {
    return (
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <ellipse cx="18" cy="20" rx="11" ry="10" fill="var(--ing-tomato)" />
        <path d="M18 11c-1.6-3-6-2.6-6.4-.4C13 9 15 9.6 18 11Z" fill="var(--ing-basil)" />
        <path d="M18 11c1.6-3 6-2.6 6.4-.4C23 9 21 9.6 18 11Z" fill="var(--ing-basil)" />
      </svg>
    );
  }

  if (type === "basil") {
    return (
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <path d="M18 6c7 2 11 9 8 17-7 2-14-2-16-9-1-5 2-9 8-8Z" fill="var(--ing-basil)" />
        <path d="M18 8v15" stroke="var(--color-primary-700)" strokeWidth="1" strokeLinecap="round" opacity=".5" />
      </svg>
    );
  }

  if (type === "chili") {
    return (
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <path d="M10 10c2-3 5-3 6-1 6 1 12 7 11 14-1 6-7 8-11 5-6-4-9-11-6-18Z" fill="var(--ing-chili)" />
        <path d="M10 10c-1-2-1-4 1-5" stroke="var(--ing-basil)" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  if (type === "carrot") {
    return (
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <path d="M14 8h8l-3 20a1 1 0 0 1-2 0Z" fill="var(--ing-carrot)" />
        <path d="M15 8c-2-4-6-5-7-3M18 8c0-4 2-6 4-5M21 8c2-3 6-3 7-1" stroke="var(--ing-basil)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <ellipse cx="18" cy="18" rx="11" ry="9" fill="var(--ing-lemon)" />
      <path d="M7 18c0-1 2-2 3-1M29 18c0-1-2-2-3-1" stroke="var(--ing-lemon)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function LoadingVisual({ activeCount, reducedMotion, visualRef, orbitRef, ringRef, ringArcRef, emblemRef, leafRef, checkRef, slotRefs }) {
  return (
    <div className="stage-visual" ref={visualRef}>
      <div className="orbit-group" ref={orbitRef}>
        {INGREDIENTS.map((ingredient, index) => (
          <div
            className="ingredient-slot"
            data-ing={ingredient}
            data-index={index}
            key={ingredient}
            ref={(node) => {
              slotRefs.current[index] = node;
            }}
          >
            <div className="ingredient-counter">
              <IngredientIcon type={ingredient} />
            </div>
          </div>
        ))}
      </div>

      <svg className="progress-ring" ref={ringRef} viewBox="0 0 120 120" aria-hidden="true">
        <circle className="ring-track" cx="60" cy="60" r="54" fill="none" stroke="var(--color-border)" strokeWidth="2" opacity=".6" />
        <circle className="ring-arc" ref={ringArcRef} cx="60" cy="60" r="54" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="70 280" />
      </svg>

      <div className="emblem" ref={emblemRef}>
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path className="emblem-leaf" ref={leafRef} d="M32 14c10 2 16 12 12 24-10 3-20-3-22-13-2-7 3-13 10-11Z" />
          <path className="emblem-check" ref={checkRef} d="M20 33l8 8 16-16" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
        </svg>
      </div>
    </div>
  );
}

export default function laodcontext() {
  const [context, setContext] = useState("fullscreen");
  const [message, setMessage] = useState(CONTEXTS.fullscreen.loading[0]);
  const [showActions, setShowActions] = useState(false);
  const [layerVisible, setLayerVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const config = useMemo(() => CONTEXTS[context], [context]);

  const layerRef = useRef(null);
  const panelRef = useRef(null);
  const wordmarkRef = useRef(null);
  const visualRef = useRef(null);
  const orbitRef = useRef(null);
  const ringRef = useRef(null);
  const ringArcRef = useRef(null);
  const emblemRef = useRef(null);
  const leafRef = useRef(null);
  const checkRef = useRef(null);
  const statusRef = useRef(null);
  const actionRowRef = useRef(null);
  const slotRefs = useRef([]);

  const timersRef = useRef([]);
  const tweensRef = useRef([]);
  const orbitTweenRef = useRef(null);
  const counterTweenRef = useRef(null);
  const ringTweenRef = useRef(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const killLoops = useCallback(() => {
    [orbitTweenRef, counterTweenRef, ringTweenRef].forEach((ref) => {
      if (ref.current) {
        ref.current.kill();
        ref.current = null;
      }
    });
    tweensRef.current.forEach((tween) => tween?.kill());
    tweensRef.current = [];
  }, []);

  const layoutSlots = useCallback(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const radius = visual.getBoundingClientRect().width * 0.42;
    const count = INGREDIENTS.length;

    slotRefs.current.forEach((slot, index) => {
      if (!slot) return;
      const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      slot.dataset.x = x;
      slot.dataset.y = y;
      gsap.set(slot, { x, y });
    });
  }, []);

  const isReduced = reducedMotion;

  const startLoop = useCallback(() => {
    killLoops();

    if (isReduced) {
      ringTweenRef.current = gsap.to(ringArcRef.current, {
        opacity: 0.45,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      return;
    }

    orbitTweenRef.current = gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 46,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    counterTweenRef.current = gsap.to(slotRefs.current, {
      rotation: -360,
      duration: 46,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    ringTweenRef.current = gsap.to(ringRef.current, {
      rotation: 360,
      duration: 1.8,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    slotRefs.current.forEach((slot, index) => {
      if (!slot) return;
      const tween = gsap.to(slot, {
        y: "+=6",
        duration: gsap.utils.random(2.2, 3.2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.15,
      });
      tweensRef.current.push(tween);
    });
  }, [isReduced, killLoops]);

  const slowLoop = useCallback(() => {
    if (isReduced) return;
    [orbitTweenRef.current, counterTweenRef.current].forEach((tween) => tween?.timeScale(0.4));
    tweensRef.current.forEach((tween) => tween?.timeScale(0.5));
  }, [isReduced]);

  const messageTransition = useCallback((text) => {
    const target = statusRef.current;
    if (!target) return;

    if (isReduced) {
      gsap.to(target, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          setMessage(text);
          gsap.to(target, { opacity: 1, duration: 0.2 });
        },
      });
      return;
    }

    gsap.to(target, {
      opacity: 0,
      y: -6,
      duration: 0.18,
      ease: "power1.in",
      onComplete: () => {
        setMessage(text);
        gsap.fromTo(target, { y: 6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, ease: "power1.out" });
      },
    });
  }, [isReduced]);

  const cycleMessages = useCallback((list) => {
    let index = 0;
    setMessage(list[0]);

    const interval = setInterval(() => {
      index = (index + 1) % list.length;
      messageTransition(list[index]);
    }, 2400);

    timersRef.current.push(interval);
  }, [messageTransition]);

  const exitTransition = useCallback(() => {
    const mockPage = document.querySelector(".mock-page");
    if (!mockPage) return;

    gsap.set(mockPage, {
      opacity: 0,
      scale: isReduced ? 1 : 0.98,
      y: isReduced ? 0 : 10,
    });

    const tl = gsap.timeline();
    tl.to(panelRef.current, {
      opacity: 0,
      scale: isReduced ? 1 : 0.97,
      duration: isReduced ? 0.25 : 0.5,
      ease: "power1.in",
    })
      .to(mockPage, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: isReduced ? 0.25 : 0.6,
        ease: "power2.out",
      }, "-=0.3")
      .call(() => setLayerVisible(false));

    return tl;
  }, [isReduced]);

  const successTransition = useCallback(() => {
    clearTimers();

    const tl = gsap.timeline();

    if (!isReduced) {
      tl.to(slotRefs.current, {
        x: 0,
        y: 0,
        scale: 0.3,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
        stagger: 0.04,
      })
        .to([orbitTweenRef.current, ringTweenRef.current].filter(Boolean), { timeScale: 2 }, "<")
        .to(ringArcRef.current, { opacity: 0, duration: 0.3 }, "<")
        .to(emblemRef.current, { scale: 1.08, duration: 0.2, ease: "power1.out" }, "-=0.1")
        .to(emblemRef.current, { scale: 1, duration: 0.25, ease: "power1.inOut" })
        .to(leafRef.current, { opacity: 0, duration: 0.2 }, "<")
        .fromTo(checkRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "<");
    } else {
      tl.to(slotRefs.current, { opacity: 0, duration: 0.25 })
        .to(leafRef.current, { opacity: 0, duration: 0.25 }, "<")
        .to(checkRef.current, { opacity: 1, duration: 0.25 }, "<");
    }

    tl.call(killLoops)
      .call(() => messageTransition("Ready!"))
      .to({}, { duration: 0.35 })
      .add(exitTransition());
  }, [clearTimers, exitTransition, isReduced, killLoops, messageTransition]);

  const errorTransition = useCallback((errorMessage) => {
    clearTimers();
    killLoops();

    const tl = gsap.timeline();

    if (!isReduced) {
      tl.to(slotRefs.current, { opacity: 0.25, y: "+=10", duration: 0.4, stagger: 0.03, ease: "power1.out" })
        .to(ringArcRef.current, { opacity: 0, duration: 0.3 }, "<")
        .to(leafRef.current, { opacity: 0.35, duration: 0.3 }, "<");
    } else {
      tl.to([slotRefs.current, ringArcRef.current], { opacity: 0.3, duration: 0.2 })
        .to(leafRef.current, { opacity: 0.35, duration: 0.2 }, "<");
    }

    tl.call(() => {
      messageTransition(errorMessage);
      setShowActions(true);
    }).fromTo(actionRowRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 });

    return tl;
  }, [clearTimers, isReduced, killLoops, messageTransition]);

  const timeoutRetry = useCallback((text) => {
    clearTimers();
    slowLoop();
    messageTransition(text);
    setShowActions(true);
    requestAnimationFrame(() => {
      if (actionRowRef.current) {
        gsap.fromTo(actionRowRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 });
      }
    });
  }, [clearTimers, messageTransition, slowLoop]);

  const runFlow = useCallback((cfg) => {
    clearTimers();
    killLoops();
    setShowActions(false);
    setLayerVisible(true);
    setMessage(cfg.loading[0]);

    const mockPage = document.querySelector(".mock-page");
    if (mockPage) {
      mockPage.style.opacity = cfg.frame === "overlay" ? "1" : "0";
      mockPage.style.filter = cfg.frame === "overlay" ? "blur(1.5px)" : "none";
    }

    if (layerRef.current) gsap.set(layerRef.current, { display: "flex" });
    gsap.set(panelRef.current, { scale: 1, opacity: 0 });
    gsap.set([orbitRef.current, ringRef.current], { rotation: 0 });
    gsap.set(leafRef.current, { opacity: 1 });
    gsap.set(checkRef.current, { opacity: 0 });
    gsap.set(emblemRef.current, { opacity: 1, scale: 1 });

    layoutSlots();

    const visible = slotRefs.current.slice(0, cfg.ingredients);
    const hidden = slotRefs.current.slice(cfg.ingredients);

    gsap.set(hidden, { opacity: 0 });

    if (isReduced) {
      gsap.set(panelRef.current, { opacity: 0 });
      gsap.set(visualRef.current, { scale: 1 });
      gsap.set(visible, {
        opacity: 0,
        x: (i, target) => Number(target.dataset.x),
        y: (i, target) => Number(target.dataset.y),
        scale: 1,
        rotation: 0,
      });

      gsap.timeline()
        .to(panelRef.current, { opacity: 1, duration: 0.35, ease: "power1.out" })
        .to(visible, { opacity: 1, duration: 0.35, ease: "power1.out" }, "<")
        .call(() => {
          startLoop();
          cycleMessages(cfg.loading);
          const longTimer = setTimeout(() => {
            slowLoop();
            cycleMessages(cfg.long);
            const successTimer = setTimeout(successTransition, 5200);
            timersRef.current.push(successTimer);
          }, 4600);
          timersRef.current.push(longTimer);
        });

      return;
    }

    gsap.set(panelRef.current, { opacity: 0 });
    gsap.set(visualRef.current, { scale: 0.85, opacity: 0 });
    gsap.set(emblemRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(visible, {
      opacity: 0,
      scale: 0.5,
      rotation: () => gsap.utils.random(-40, 40),
      x: (i, target) => Number(target.dataset.x) * 1.35,
      y: (i, target) => Number(target.dataset.y) * 1.35 - 10,
    });

    gsap.timeline()
      .to(panelRef.current, { opacity: 1, duration: 0.3, ease: "power1.out" })
      .to(visualRef.current, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }, "<")
      .to(emblemRef.current, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" }, "<0.1")
      .to(visible, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        x: (i, target) => Number(target.dataset.x),
        y: (i, target) => Number(target.dataset.y),
        duration: 0.7,
        ease: "back.out(1.5)",
        stagger: 0.08,
      }, "<0.15")
      .call(() => {
        startLoop();
        cycleMessages(cfg.loading);
        const longTimer = setTimeout(() => {
          slowLoop();
          cycleMessages(cfg.long);
          const successTimer = setTimeout(successTransition, 5200);
          timersRef.current.push(successTimer);
        }, 4600);
        timersRef.current.push(longTimer);
      });
  }, [clearTimers, cycleMessages, isReduced, killLoops, layoutSlots, slowLoop, startLoop, successTransition]);

  const applyContext = useCallback((key) => {
    setContext(key);
    runFlow(CONTEXTS[key]);
  }, [runFlow]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);

    const onChange = (event) => setReducedMotion(event.matches);
    media.addEventListener?.("change", onChange);

    return () => media.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!layerRef.current) return;
    runFlow(CONTEXTS.fullscreen);

    const onResize = () => layoutSlots();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimers();
      killLoops();
      window.removeEventListener("resize", onResize);
    };
  }, []); // Initialisation only.

  useEffect(() => {
    // Restart the active flow when the reduced-motion preference changes.
    if (layerRef.current && context) runFlow(CONTEXTS[context]);
  }, [reducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  const simulateRestart = () => applyContext(context);

  const simulateLong = () => {
    clearTimers();
    slowLoop();
    cycleMessages(CONTEXTS[context].long);
    const timer = setTimeout(() => timeoutRetry("Having trouble connecting? Try again."), 3200);
    timersRef.current.push(timer);
  };

  const simulateError = () => errorTransition(CONTEXTS[context].error);
  const simulateSuccess = () => successTransition();

  return (
    <div id="app">
      <header className="demo-topbar">
        <div className="brand">
          Larder
          <small>Loading experience system</small>
        </div>

        <div className="context-tabs" role="tablist" aria-label="Loading context">
          {Object.entries(CONTEXT_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              data-ctx={key}
              aria-pressed={context === key}
              onClick={() => applyContext(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="stage-wrap">
        <section className="mock-page" aria-hidden="true">
          <h1>Tonight&apos;s picks</h1>
          <p className="lead">Based on what&apos;s in your kitchen right now.</p>

          <div className="mock-grid">
            <div className="mock-card">
              <div className="thumb" />
              <div className="body"><strong>Weeknight lemon pasta</strong><span>20 min · Serves 2</span></div>
            </div>
            <div className="mock-card">
              <div className="thumb" />
              <div className="body"><strong>Charred carrot salad</strong><span>15 min · Serves 4</span></div>
            </div>
            <div className="mock-card">
              <div className="thumb" />
              <div className="body"><strong>Sunday roast chicken</strong><span>1 hr 20 min · Serves 4</span></div>
            </div>
            <div className="mock-card">
              <div className="thumb" />
              <div className="body"><strong>Basil tomato soup</strong><span>30 min · Serves 3</span></div>
            </div>
          </div>
        </section>

        {layerVisible && (
          <div
            className="loading-layer"
            ref={layerRef}
            data-frame={config.frame}
            style={{ "--ring-color": config.accent === "tertiary" ? "var(--color-tertiary-500)" : "var(--color-primary-500)" }}
          >
            <div className="loading-panel" ref={panelRef}>
              <div className="wordmark" ref={wordmarkRef}>
                <span className="dot" aria-hidden="true" />
                <span>Larder</span>
                {context === "admin" && <span className="admin-flag">Admin</span>}
              </div>

              <LoadingVisual
                activeCount={config.ingredients}
                reducedMotion={reducedMotion}
                visualRef={visualRef}
                orbitRef={orbitRef}
                ringRef={ringRef}
                ringArcRef={ringArcRef}
                emblemRef={emblemRef}
                leafRef={leafRef}
                checkRef={checkRef}
                slotRefs={slotRefs}
              />

              <p className="status-message" ref={statusRef} role="status" aria-live="polite">
                {message}
              </p>

              <div
                className="action-row"
                ref={actionRowRef}
                style={{ display: showActions ? "flex" : "none" }}
              >
                <button type="button" className="btn-primary" onClick={() => applyContext(context)}>
                  Try again
                </button>
                <button type="button" className="btn-secondary" onClick={() => applyContext(context)}>
                  Back to home
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="demo-dock">
        <span className="label">Simulate:</span>
        <button type="button" onClick={simulateRestart}>Restart</button>
        <button type="button" onClick={simulateLong}>Slow connection</button>
        <button type="button" onClick={simulateError}>Failed request</button>
        <button type="button" onClick={simulateSuccess}>Success now</button>

        <label className="toggle">
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(event) => setReducedMotion(event.target.checked)}
          />
          Reduced motion preview
        </label>
      </footer>
    </div>
  );
}
