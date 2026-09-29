import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/load.css";

const CONTEXTS = {
  fullscreen: {
    frame: "fullscreen", ingredients: 5, accent: "primary",
    loading: ["Finding recipes for you…", "Checking what's in season…", "Matching your preferences…", "Preparing your recommendations…"],
    long: ["Still gathering the best matches…", "Almost there — thanks for waiting."],
    error: "Something went wrong while finding your recipes.",
  },
  overlay: {
    frame: "overlay", ingredients: 5, accent: "primary",
    loading: ["Refreshing your recipes…", "Checking for anything new…", "Almost ready…"],
    long: ["Taking a little longer than usual…"],
    error: "Something went wrong while refreshing this page.",
  },
  recommendation: {
    frame: "fullscreen", ingredients: 5, accent: "primary",
    loading: ["Reading your ingredients…", "Matching flavors you'll like…", "Narrowing it down…", "Almost ready…"],
    long: ["Still narrowing things down…", "A few more seconds…"],
    error: "Something went wrong while matching your ingredients.",
  },
  recipe: {
    frame: "fullscreen", ingredients: 5, accent: "primary",
    loading: ["Loading the recipe…", "Lining up the ingredients…", "Getting the steps ready…", "Nearly there…"],
    long: ["Still loading this recipe…"],
    error: "Something went wrong while loading this recipe.",
  },
  auth: {
    frame: "card", ingredients: 3, accent: "primary",
    loading: ["Signing you in…", "Setting up your kitchen…", "Just a moment…"],
    long: ["Still signing you in…"],
    error: "We couldn't sign you in.",
  },
  admin: {
    frame: "fullscreen", ingredients: 0, accent: "tertiary",
    loading: ["Loading dashboard data…", "Pulling the latest numbers…", "One moment…"],
    long: ["Still loading the dashboard…"],
    error: "Something went wrong while loading the dashboard.",
  },
};

const INGREDIENTS = ["tomato", "basil", "chili", "carrot", "lemon"];
const TIMEOUT_MESSAGE = "Having trouble connecting? Try again.";

function IngredientIcon({ type }) {
  switch (type) {
    case "tomato":
      return (
        <svg viewBox="0 0 36 36" aria-hidden="true">
          <ellipse cx="18" cy="20" rx="11" ry="10" fill="var(--ing-tomato)" />
          <path d="M18 11c-1.6-3-6-2.6-6.4-.4C13 9 15 9.6 18 11Z" fill="var(--ing-basil)" />
          <path d="M18 11c1.6-3 6-2.6 6.4-.4C23 9 21 9.6 18 11Z" fill="var(--ing-basil)" />
        </svg>
      );
    case "basil":
      return (
        <svg viewBox="0 0 36 36" aria-hidden="true">
          <path d="M18 6c7 2 11 9 8 17-7 2-14-2-16-9-1-5 2-9 8-8Z" fill="var(--ing-basil)" />
          <path d="M18 8v15" stroke="var(--color-primary-700)" strokeWidth="1" strokeLinecap="round" opacity=".5" />
        </svg>
      );
    case "chili":
      return (
        <svg viewBox="0 0 36 36" aria-hidden="true">
          <path d="M10 10c2-3 5-3 6-1 6 1 12 7 11 14-1 6-7 8-11 5-6-4-9-11-6-18Z" fill="var(--ing-chili)" />
          <path d="M10 10c-1-2-1-4 1-5" stroke="var(--ing-basil)" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "carrot":
      return (
        <svg viewBox="0 0 36 36" aria-hidden="true">
          <path d="M14 8h8l-3 20a1 1 0 0 1-2 0Z" fill="var(--ing-carrot)" />
          <path d="M15 8c-2-4-6-5-7-3M18 8c0-4 2-6 4-5M21 8c2-3 6-3 7-1" stroke="var(--ing-basil)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 36 36" aria-hidden="true">
          <ellipse cx="18" cy="18" rx="11" ry="9" fill="var(--ing-lemon)" />
          <path d="M7 18c0-1 2-2 3-1M29 18c0-1-2-2-3-1" stroke="var(--ing-lemon)" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );
  }
}

function usePrefersReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = (e) => setReduced(e.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/**
 * Props
 *  context      "fullscreen" | "overlay" | "recommendation" | "recipe" | "auth" | "admin"
 *  status       "loading" | "success" | "error"   (controlled by your app)
 *  onRetry      called when "Try again" is clicked
 *  onBack       called when "Back to home" is clicked
 *  onExited     called after the success animation finishes -> unmount the loader here
 *  longAfter    ms before "taking longer" messages (default 4600)
 *  timeoutAfter ms before the retry prompt appears (default 12000)
 */
export default function LoadContext({
  context = "fullscreen",
  status = "loading",
  onRetry,
  onBack,
  onExited,
  longAfter = 4600,
  timeoutAfter = 12000,
}) {
  const cfg = useMemo(() => CONTEXTS[context] ?? CONTEXTS.fullscreen, [context]);
  const reduced = usePrefersReducedMotion();

  const [message, setMessage] = useState(cfg.loading[0]);
  const [showActions, setShowActions] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const rootRef = useRef(null);
  const apiRef = useRef(null);
  const onExitedRef = useRef(onExited);
  const prevStatus = useRef(status);

  useEffect(() => { onExitedRef.current = onExited; }, [onExited]);

  // error -> loading (parent retried): restart the whole loading flow
  useEffect(() => {
    if (prevStatus.current === "error" && status === "loading") setRunKey((k) => k + 1);
    prevStatus.current = status;
  }, [status]);

  // Loading flow: intro, loop, message cycling, timeouts
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const $ = (s) => root.querySelector(s);
    const slots = Array.from(root.querySelectorAll(".lc-slot"));
    const visible = slots.slice(0, cfg.ingredients);
    const hidden = slots.slice(cfg.ingredients);
    const panel = $(".lc-panel");
    const visual = $(".lc-visual");
    const orbit = $(".lc-orbit");
    const ring = $(".lc-ring");
    const arc = $(".lc-ring-arc");
    const emblem = $(".lc-emblem");
    const leaf = $(".lc-leaf");
    const check = $(".lc-check");
    const statusEl = $(".lc-status");

    const timeouts = [];
    let cycleId = null;
    let loops = [];
    let bobs = [];
    let introTl = null;
    let exitTl = null;

    const later = (fn, ms) => timeouts.push(setTimeout(fn, ms));
    const stopTimers = () => {
      timeouts.forEach(clearTimeout);
      timeouts.length = 0;
      clearInterval(cycleId);
      cycleId = null;
    };
    const killBobs = () => { bobs.forEach((t) => t.kill()); bobs = []; };
    const killLoops = () => { loops.forEach((t) => t.kill()); loops = []; killBobs(); };

    const swap = (text) => {
      gsap.killTweensOf(statusEl);
      gsap.to(statusEl, {
        opacity: 0,
        y: reduced ? 0 : -6,
        duration: 0.18,
        ease: "power1.in",
        onComplete: () => {
          setMessage(text);
          gsap.fromTo(statusEl, { y: reduced ? 0 : 6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, ease: "power1.out" });
        },
      });
    };

    const cycle = (list) => {
      clearInterval(cycleId);
      let i = 0;
      swap(list[0]);
      if (list.length > 1) {
        cycleId = setInterval(() => {
          i = (i + 1) % list.length;
          swap(list[i]);
        }, 2400);
      }
    };

    const slowLoop = () => {
      if (reduced) return;
      loops.forEach((t) => t !== loops[2] && t.timeScale(0.4));
      bobs.forEach((t) => t.timeScale(0.5));
    };

    const startLoop = () => {
      killLoops();
      if (reduced) {
        loops.push(gsap.to(arc, { opacity: 0.45, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" }));
        return;
      }
      loops.push(gsap.to(orbit, { rotation: 360, duration: 46, repeat: -1, ease: "none", transformOrigin: "50% 50%" }));
      loops.push(gsap.to(slots, { rotation: -360, duration: 46, repeat: -1, ease: "none", transformOrigin: "50% 50%" }));
      loops.push(gsap.to(ring, { rotation: 360, duration: 1.8, repeat: -1, ease: "none", transformOrigin: "50% 50%" }));
      visible.forEach((slot, i) => {
        bobs.push(gsap.to(slot, {
          y: "+=6", duration: gsap.utils.random(2.2, 3.2), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.15,
        }));
      });
    };

    // ---- reset + layout ----
    setMessage(cfg.loading[0]);
    setShowActions(false);

    gsap.set(root, { opacity: 1 });
    gsap.set(panel, { opacity: 0, scale: 1 });
    gsap.set([orbit, ring], { rotation: 0 });
    gsap.set(arc, { opacity: 1 });
    gsap.set(leaf, { opacity: 1 });
    gsap.set(check, { opacity: 0 });
    gsap.set(statusEl, { opacity: 1, y: 0 });
    gsap.set(hidden, { opacity: 0 });

    const radius = visual.offsetWidth * 0.46;
    visible.forEach((slot, i) => {
      const angle = (i / visible.length) * Math.PI * 2 - Math.PI / 2;
      slot.dataset.x = Math.cos(angle) * radius;
      slot.dataset.y = Math.sin(angle) * radius;
    });
    const px = (i, t) => Number(t.dataset.x);
    const py = (i, t) => Number(t.dataset.y);

    const begin = () => {
      startLoop();
      later(() => { slowLoop(); cycle(cfg.long); }, longAfter);
      later(() => {
        clearInterval(cycleId);
        slowLoop();
        swap(TIMEOUT_MESSAGE);
        setShowActions(true);
      }, timeoutAfter);
      cycleId = setInterval(() => {}, 1e9); // placeholder, replaced below
      clearInterval(cycleId);
      let i = 0;
      cycleId = setInterval(() => {
        i = (i + 1) % cfg.loading.length;
        swap(cfg.loading[i]);
      }, 2400);
    };

    if (reduced) {
      gsap.set(visual, { scale: 1, opacity: 1 });
      gsap.set(emblem, { opacity: 1, scale: 1 });
      gsap.set(visible, { opacity: 0, x: px, y: py, scale: 1, rotation: 0 });
      introTl = gsap.timeline()
        .to(panel, { opacity: 1, duration: 0.35 })
        .to(visible, { opacity: 1, duration: 0.35 }, "<")
        .call(begin);
    } else {
      gsap.set(visual, { scale: 0.85, opacity: 0 });
      gsap.set(emblem, { opacity: 0, scale: 0.8 });
      gsap.set(visible, {
        opacity: 0, scale: 0.5,
        rotation: () => gsap.utils.random(-40, 40),
        x: (i, t) => px(i, t) * 1.35,
        y: (i, t) => py(i, t) * 1.35 - 10,
      });
      introTl = gsap.timeline()
        .to(panel, { opacity: 1, duration: 0.3, ease: "power1.out" })
        .to(visual, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }, "<")
        .to(emblem, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" }, "<0.1")
        .to(visible, { opacity: 1, scale: 1, rotation: 0, x: px, y: py, duration: 0.7, ease: "back.out(1.5)", stagger: 0.08 }, "<0.15")
        .call(begin);
    }

    // ---- transitions the status effect can trigger ----
    apiRef.current = {
      success() {
        if (introTl && introTl.progress() < 1) introTl.progress(1);
        stopTimers();
        killBobs();
        setShowActions(false);

        const tl = gsap.timeline();
        if (!reduced) {
          tl.to(visible, { x: 0, y: 0, scale: 0.3, opacity: 0, duration: 0.45, ease: "power2.in", stagger: 0.04 })
            .to(arc, { opacity: 0, duration: 0.3 }, "<")
            .to(emblem, { scale: 1.08, duration: 0.2, ease: "power1.out" }, "-=0.1")
            .to(emblem, { scale: 1, duration: 0.25, ease: "power1.inOut" })
            .to(leaf, { opacity: 0, duration: 0.2 }, "<")
            .to(check, { opacity: 1, duration: 0.3 }, "<");
        } else {
          tl.to(visible, { opacity: 0, duration: 0.25 })
            .to(leaf, { opacity: 0, duration: 0.25 }, "<")
            .to(check, { opacity: 1, duration: 0.25 }, "<");
        }
        tl.call(killLoops).call(() => swap("Ready!")).to({}, { duration: 0.45 });
        tl.to(panel, { opacity: 0, scale: reduced ? 1 : 0.97, duration: reduced ? 0.25 : 0.4, ease: "power1.in" })
          .to(root, { opacity: 0, duration: reduced ? 0.2 : 0.35, ease: "power1.out" }, "-=0.2")
          .call(() => onExitedRef.current?.());
        exitTl = tl;
      },
      error() {
        if (introTl && introTl.progress() < 1) introTl.progress(1);
        stopTimers();
        killLoops();

        const tl = gsap.timeline();
        if (!reduced) {
          tl.to(visible, { opacity: 0.25, y: "+=10", duration: 0.4, stagger: 0.03, ease: "power1.out" })
            .to(arc, { opacity: 0, duration: 0.3 }, "<")
            .to(leaf, { opacity: 0.35, duration: 0.3 }, "<");
        } else {
          tl.to([visible, arc], { opacity: 0.3, duration: 0.2 })
            .to(leaf, { opacity: 0.35, duration: 0.2 }, "<");
        }
        tl.call(() => { swap(cfg.error); setShowActions(true); });
        exitTl = tl;
      },
    };

    return () => {
      apiRef.current = null;
      stopTimers();
      killLoops();
      introTl?.kill();
      exitTl?.kill();
      gsap.killTweensOf([root, panel, visual, orbit, ring, arc, emblem, leaf, check, statusEl, ...slots]);
    };
  }, [cfg, reduced, runKey, longAfter, timeoutAfter]);

  // React to the parent's status
  useEffect(() => {
    if (status === "success") apiRef.current?.success();
    else if (status === "error") apiRef.current?.error();
  }, [status, cfg, reduced, runKey]);

  const handleRetry = () => {
    onRetry?.();
    if (status === "loading") setRunKey((k) => k + 1); // timeout-retry while still loading
  };

  return (
    <div
      className="lc-layer"
      ref={rootRef}
      data-frame={cfg.frame}
      data-accent={cfg.accent}
      aria-busy={status === "loading"}
    >
      <div className="lc-panel">
        <div className="lc-wordmark">
          <span className="lc-dot" aria-hidden="true" />
          <span>Larder</span>
          {context === "admin" && <span className="lc-admin-flag">Admin</span>}
        </div>

        <div className="lc-visual">
          <div className="lc-orbit">
            {INGREDIENTS.map((name) => (
              <div className="lc-slot" key={name}>
                <IngredientIcon type={name} />
              </div>
            ))}
          </div>

          <svg className="lc-ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-border)" strokeWidth="2" opacity=".6" />
            <circle className="lc-ring-arc" cx="60" cy="60" r="54" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="70 280" />
          </svg>

          <div className="lc-emblem">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path className="lc-leaf" d="M32 14c10 2 16 12 12 24-10 3-20-3-22-13-2-7 3-13 10-11Z" />
              <path className="lc-check" d="M20 33l8 8 16-16" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
            </svg>
          </div>
        </div>

        <p className="lc-status" role="status" aria-live="polite">{message}</p>

        {showActions && (
          <div className="lc-actions">
            <button type="button" className="lc-btn lc-btn-primary" onClick={handleRetry}>Try again</button>
            <button type="button" className="lc-btn lc-btn-secondary" onClick={onBack}>Back to home</button>
          </div>
        )}
      </div>
    </div>
  );
}