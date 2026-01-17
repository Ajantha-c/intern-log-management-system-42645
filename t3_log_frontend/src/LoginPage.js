import React, { useEffect, useState } from "react";
import "./LoginPage.css";

// PUBLIC_INTERFACE
function LoginPage() {
  /** Role-selection login page with a two-card layout and a modal popup sign-in (UI-only). */
  const [entered, setEntered] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // "intern" | "mentor" | null

  useEffect(() => {
    // Trigger initial entrance animation after first paint.
    const t = window.setTimeout(() => setEntered(true), 50);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    // Escape closes modal.
    function onKeyDown(e) {
      if (e.key === "Escape" && selectedRole) setSelectedRole(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedRole]);

  // PUBLIC_INTERFACE
  const openRole = (role) => {
    /** Opens the sign-in modal for the specified role. */
    setSelectedRole(role);
  };

  // PUBLIC_INTERFACE
  const closeModal = () => {
    /** Closes the sign-in modal and returns to role selection. */
    setSelectedRole(null);
  };

  // PUBLIC_INTERFACE
  const handleGoogleSignIn = () => {
    /**
     * Placeholder for Google Sign-In.
     * Requirement: preserve selectedRole during auth and then redirect:
     * - intern -> Intern Dashboard
     * - mentor -> Mentor Dashboard
     *
     * Auth is not wired in this template; this handler is intentionally UI-only.
     */
    // no-op
  };

  const roleTitle =
    selectedRole === "intern"
      ? "Sign in as Intern"
      : selectedRole === "mentor"
      ? "Sign in as Mentor"
      : "Sign in";

  return (
    <main className="loginPage" aria-label="T3 Log Login">
      <div className="loginBg" aria-hidden="true" />

      <section className={`loginShell ${entered ? "isEntered" : ""}`}>
        <header className={`loginHeader ${entered ? "isEntered" : ""}`}>
          <div className="brandPill" aria-label="T3 Log">
            <span className="brandDot" aria-hidden="true" />
            <span className="brandText">Welcome to T3Log</span>
          </div>
          <p className="loginSubtitle">
            Choose your role to continue. Secure sign-in powered by Google.
          </p>
        </header>

        <div className={`roleRow ${entered ? "isEntered" : ""}`}>
          <button
            type="button"
            className="roleCard"
            onClick={() => openRole("intern")}
            aria-label="Continue as Intern"
          >
            <div className="roleIcon" aria-hidden="true">
              🧑‍💻
            </div>
            <div className="roleLabel">Intern</div>
            <div className="roleHint">Log work, progress, and updates.</div>
          </button>

          <button
            type="button"
            className="roleCard"
            onClick={() => openRole("mentor")}
            aria-label="Continue as Mentor"
          >
            <div className="roleIcon" aria-hidden="true">
              🧑‍🏫
            </div>
            <div className="roleLabel">Mentor</div>
            <div className="roleHint">Review intern logs and give feedback.</div>
          </button>
        </div>

        {/* Modal popup (pre-enhancement behavior) */}
        {selectedRole ? (
          <div
            className="modalOverlay"
            role="presentation"
            onMouseDown={(e) => {
              // Click outside closes the modal.
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-label={roleTitle}
            >
              <div className="modalHeader">
                <div>
                  <div className="modalKicker">Google Sign-In</div>
                  <div className="modalTitle">{roleTitle}</div>
                </div>

                <button
                  type="button"
                  className="modalClose"
                  onClick={closeModal}
                  aria-label="Close sign-in"
                  title="Close"
                >
                  ×
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

              <div className="modalFootnote">
                Selected role:{" "}
                <strong className="panelRoleStrong">{selectedRole}</strong>
              </div>
            </div>
          </div>
        ) : null}

        <footer className={`loginFooter ${entered ? "isEntered" : ""}`}>
          <span className="footerNote">
            UI only — authentication + redirects will be wired later.
          </span>
        </footer>
      </section>
    </main>
  );
}

export default LoginPage;
