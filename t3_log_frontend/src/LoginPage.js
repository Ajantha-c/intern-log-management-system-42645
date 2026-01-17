import React, { useEffect, useMemo, useRef, useState } from "react";
import "./LoginPage.css";

/**
 * Role options for the login UI.
 */
const ROLES = {
  intern: {
    key: "intern",
    label: "Intern",
    panelTitle: "Sign in as Intern",
    icon: "🧑‍💻",
    hint: "Log work, progress, and updates.",
  },
  mentor: {
    key: "mentor",
    label: "Mentor",
    panelTitle: "Sign in as Mentor",
    icon: "🧑‍🏫",
    hint: "Review intern logs and give feedback.",
  },
};

/**
 * Lightweight helper to join class names.
 */
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Returns the opposite role key.
 * @param {string|null} role
 * @returns {string|null}
 */
function getOtherRole(role) {
  if (!role) return null;
  return role === "intern" ? "mentor" : "intern";
}

// PUBLIC_INTERFACE
function LoginPage() {
  /** Premium role-selection login UI with directional animations and a glass sign-in panel (UI only). */
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // "intern" | "mentor" | null

  const panelRef = useRef(null);

  useEffect(() => {
    // Trigger initial fade/slide-in animation after first paint.
    const t = window.setTimeout(() => setHasEntered(true), 40);
    return () => window.clearTimeout(t);
  }, []);

  const roleData = useMemo(() => {
    if (!selectedRole) return null;
    return ROLES[selectedRole];
  }, [selectedRole]);

  const otherRole = useMemo(() => getOtherRole(selectedRole), [selectedRole]);

  // Escape returns to role selection.
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && selectedRole) setSelectedRole(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedRole]);

  // Click outside panel returns to role selection (desktop-friendly).
  useEffect(() => {
    if (!selectedRole) return;

    function onPointerDown(e) {
      if (!panelRef.current) return;
      if (panelRef.current.contains(e.target)) return;
      setSelectedRole(null);
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [selectedRole]);

  // PUBLIC_INTERFACE
  function handleSelect(roleKey) {
    /** Selects a role and transitions into the sign-in panel. */
    setSelectedRole(roleKey);
  }

  // PUBLIC_INTERFACE
  function handleBack() {
    /** Returns to the default two-card role selection layout. */
    setSelectedRole(null);
  }

  // PUBLIC_INTERFACE
  function handleGoogleSignIn() {
    /**
     * Placeholder for Google Sign-In.
     * Requirement: preserve selectedRole during auth and then redirect:
     * - intern -> Intern Dashboard
     * - mentor -> Mentor Dashboard
     *
     * This project currently has no auth wiring; this handler is intentionally UI-only.
     */
    // no-op
  }

  return (
    <main className="loginPage" aria-label="T3 Log Login">
      <div className="loginBg" aria-hidden="true" />

      {/* Subtle focus/blur overlay when a role is selected */}
      <div
        className={cx("focusOverlay", selectedRole && "isActive")}
        aria-hidden="true"
      />

      <section className="loginShell">
        <header className={cx("loginHeader", hasEntered && "isEntered")}>
          <div className="brandPill" aria-label="T3 Log">
            <span className="brandDot" aria-hidden="true" />
            <span className="brandText">Welcome to T3Log</span>
          </div>
          <p className="loginSubtitle">
            Choose your role to continue. Secure sign-in powered by Google.
          </p>
        </header>

        <div
          className={cx(
            "stage",
            hasEntered && "isEntered",
            selectedRole && "hasSelection",
            selectedRole === "intern" && "selectionIntern",
            selectedRole === "mentor" && "selectionMentor"
          )}
        >
          {/* Default state requirement: Intern left, Mentor right */}
          <div className="roleRow" role="group" aria-label="Role selection">
            {/* Intern Card (left) */}
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
              aria-pressed={selectedRole === "intern"}
            >
              <div className="roleIcon" aria-hidden="true">
                {ROLES.intern.icon}
              </div>
              <div className="roleLabel">{ROLES.intern.label}</div>
              <div className="roleHint">{ROLES.intern.hint}</div>
            </button>

            {/* Mentor Card (right) */}
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
              aria-pressed={selectedRole === "mentor"}
            >
              <div className="roleIcon" aria-hidden="true">
                {ROLES.mentor.icon}
              </div>
              <div className="roleLabel">{ROLES.mentor.label}</div>
              <div className="roleHint">{ROLES.mentor.hint}</div>
            </button>
          </div>

          {/* Sliding sign-in panel */}
          <aside
            className={cx(
              "signInPanel",
              selectedRole && "isOpen",
              selectedRole === "intern" ? "fromLeft" : null,
              selectedRole === "mentor" ? "fromRight" : null
            )}
            aria-hidden={!selectedRole}
          >
            <div
              ref={panelRef}
              className={cx("signInPanelInner", selectedRole && "isVisible")}
              role="dialog"
              aria-modal="true"
              aria-label={roleData ? roleData.panelTitle : "Sign in"}
            >
              <div className="panelTopRow">
                <div className="panelTitleBlock">
                  <div className="panelKicker">Google Sign-In</div>
                  <div className="panelTitle">
                    {roleData ? roleData.panelTitle : ""}
                  </div>
                </div>

                <button
                  type="button"
                  className="panelCloseBtn"
                  onClick={handleBack}
                  aria-label="Back to role selection"
                  title="Back"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <button
                type="button"
                className="googleBtn"
                onClick={handleGoogleSignIn}
                aria-label="Sign in with Google"
              >
                <span className="googleMark" aria-hidden="true">
                  G
                </span>
                <span>Sign in with Google</span>
              </button>

              <div className="panelFootnote">
                Selected role:{" "}
                <strong className="panelRoleStrong">
                  {selectedRole ? selectedRole : ""}
                </strong>
                {otherRole ? (
                  <>
                    {" "}
                    •{" "}
                    <button
                      type="button"
                      className="inlineLink"
                      onClick={() => handleSelect(otherRole)}
                      aria-label={`Switch to ${otherRole}`}
                    >
                      Switch to {otherRole}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </aside>
        </div>

        <footer className={cx("loginFooter", hasEntered && "isEntered")}>
          <span className="footerNote">
            UI only — authentication + redirects will be wired later.
          </span>
        </footer>
      </section>
    </main>
  );
}

export default LoginPage;
