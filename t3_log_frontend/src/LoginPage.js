import React, { useEffect, useMemo, useRef, useState } from "react";
import "./LoginPage.css";

/**
 * Role options for the login UI.
 */
const ROLES = {
  mentor: {
    key: "mentor",
    label: "Mentor",
    continueText: "Continue as Mentor",
    icon: "🧑‍🏫",
  },
  intern: {
    key: "intern",
    label: "Intern",
    continueText: "Continue as Intern",
    icon: "🧑‍💻",
  },
};

/**
 * Lightweight helper to join class names.
 */
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

// PUBLIC_INTERFACE
function LoginPage() {
  /** This is the T3 Log login UI page with role selection and animations (no auth wiring). */
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // "mentor" | "intern" | null

  const popupRef = useRef(null);

  useEffect(() => {
    // Trigger initial fade/slide-in animation after first paint.
    const t = window.setTimeout(() => setHasEntered(true), 40);
    return () => window.clearTimeout(t);
  }, []);

  const roleData = useMemo(() => {
    if (!selectedRole) return null;
    return ROLES[selectedRole];
  }, [selectedRole]);

  // Clicking outside the popup resets the view to the initial two-card layout.
  useEffect(() => {
    if (!selectedRole) return;

    function onPointerDown(e) {
      if (!popupRef.current) return;
      if (popupRef.current.contains(e.target)) return;
      setSelectedRole(null);
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [selectedRole]);

  function handleSelect(roleKey) {
    setSelectedRole(roleKey);
  }

  return (
    <main className="loginPage" aria-label="T3 Log Login">
      <div className="loginBg" aria-hidden="true" />

      <section className="loginShell">
        <header className={cx("loginHeader", hasEntered && "isEntered")}>
          <div className="brandPill" aria-label="T3 Log">
            <span className="brandDot" aria-hidden="true" />
            <span className="brandText">T3 Log</span>
          </div>
          <h1 className="loginTitle">Welcome</h1>
          <p className="loginSubtitle">Choose your role to continue.</p>
        </header>

        <div
          className={cx(
            "roleRow",
            hasEntered && "isEntered",
            selectedRole && "hasSelection",
            selectedRole === "mentor" && "selectionMentor",
            selectedRole === "intern" && "selectionIntern"
          )}
        >
          {/* Mentor Card */}
          <button
            type="button"
            className={cx(
              "roleCard",
              "mentorCard",
              selectedRole === "mentor" && "isSelected",
              selectedRole === "intern" && "isHiddenAway"
            )}
            onClick={() => handleSelect("mentor")}
            aria-label="Continue as Mentor"
          >
            <div className="roleIcon" aria-hidden="true">
              {ROLES.mentor.icon}
            </div>
            <div className="roleLabel">{ROLES.mentor.label}</div>
            <div className="roleHint">Review intern logs and give feedback.</div>
          </button>

          {/* Popup Panel (occupies the empty space when a role is selected) */}
          <div
            className={cx(
              "popupSlot",
              selectedRole && "isVisible",
              selectedRole === "mentor" && "forMentor",
              selectedRole === "intern" && "forIntern"
            )}
            aria-hidden={!selectedRole}
          >
            <div
              ref={popupRef}
              className={cx("popupPanel", selectedRole && "isVisible")}
              role="dialog"
              aria-modal="true"
              aria-label={roleData ? roleData.continueText : "Continue"}
            >
              <div className="popupTitle">{roleData ? roleData.continueText : ""}</div>

              <button
                type="button"
                className="googleBtn"
                onClick={() => {
                  // Intentionally no auth wiring yet.
                  // This placeholder allows future wiring without changing UI structure.
                }}
                aria-label="Google Sign-In (placeholder)"
              >
                <span className="googleMark" aria-hidden="true">
                  G
                </span>
                <span>Sign in with Google</span>
              </button>

              <div className="popupFootnote">
                Click outside this panel to go back.
              </div>
            </div>
          </div>

          {/* Intern Card */}
          <button
            type="button"
            className={cx(
              "roleCard",
              "internCard",
              selectedRole === "intern" && "isSelected",
              selectedRole === "mentor" && "isHiddenAway"
            )}
            onClick={() => handleSelect("intern")}
            aria-label="Continue as Intern"
          >
            <div className="roleIcon" aria-hidden="true">
              {ROLES.intern.icon}
            </div>
            <div className="roleLabel">{ROLES.intern.label}</div>
            <div className="roleHint">Log work, progress, and updates.</div>
          </button>
        </div>

        <footer className={cx("loginFooter", hasEntered && "isEntered")}>
          <span className="footerNote">
            Minimal UI only — authentication will be wired later.
          </span>
        </footer>
      </section>
    </main>
  );
}

export default LoginPage;
