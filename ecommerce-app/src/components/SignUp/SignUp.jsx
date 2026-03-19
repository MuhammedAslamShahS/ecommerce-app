import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signupSuccess } from "../../authSlice";
import { toast } from "react-toastify";
import "../Login/Login.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const registeredUsers = useSelector((state) => state.auth?.registeredUsers ?? []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const redirectPath = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const enteredEmail = String(formData.get("signupEmail") || "").trim();
    const enteredPassword = String(formData.get("signupPassword") || "").trim();
    const enteredConfirmPassword = String(formData.get("signupConfirmPassword") || "").trim();

    if (!enteredEmail || !enteredPassword || !enteredConfirmPassword) {
      const message = "Please fill in all fields.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (enteredPassword.length < 6) {
      const message = "Password must be at least 6 characters.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      const message = "Passwords do not match.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    const existingUser = registeredUsers.find((registeredUser) => {
      return registeredUser.email.toLowerCase() === enteredEmail.toLowerCase();
    });

    if (existingUser) {
      const message = "This email is already registered. Please log in instead.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setErrorMessage("");

    dispatch(
      signupSuccess({
        user: { email: enteredEmail },
        password: enteredPassword,
        token: `demo-user-token-${Date.now()}`,
      })
    );

    toast.success("Account created successfully.");
    navigate(redirectPath, { replace: true });
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-copy">
          <span className="login-badge">Create account</span>
          <h2 className="login-title">Sign up with your own email and password</h2>
          <p className="login-subtitle">
            This demo stores your account in this browser so you can log in with the same details later.
          </p>

          {redirectPath !== "/" ? (
            <p className="login-redirect-note">Create an account to continue to {redirectPath}.</p>
          ) : null}
        </div>

        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="login-decoy-fields" aria-hidden="true">
            <input type="text" name="username" autoComplete="username" tabIndex={-1} />
            <input type="password" name="password" autoComplete="new-password" tabIndex={-1} />
          </div>

          <div className="login-field">
            <label htmlFor="signup-email">Email address</label>
            <input
              id="signup-email"
              name="signupEmail"
              type="email"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Enter your email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
            />
          </div>

          <div className="login-field">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="signupPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
            />
          </div>

          <div className="login-field">
            <label htmlFor="signup-confirm-password">Confirm password</label>
            <input
              id="signup-confirm-password"
              name="signupConfirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
            />
          </div>

          {errorMessage ? <p className="login-error">{errorMessage}</p> : null}

          <button type="submit" className="login-submit-btn">
            Sign Up
          </button>

          <div className="login-footer">
            <span>Already have an account?</span>
            <Link to="/login" state={location.state} className="login-footer-link">
              Log in
            </Link>
          </div>

          <Link to="/" className="login-secondary-link">
            Continue browsing products
          </Link>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
