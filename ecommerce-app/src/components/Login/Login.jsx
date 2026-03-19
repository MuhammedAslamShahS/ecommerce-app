import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../authSlice";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const registeredUsers = useSelector((state) => state.auth?.registeredUsers ?? []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const redirectPath = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const enteredEmail = String(formData.get("loginEmail") || "").trim();
    const enteredPassword = String(formData.get("loginPassword") || "").trim();

    if (!enteredEmail || !enteredPassword) {
      const message = "Please enter both email and password.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    const matchedUser = registeredUsers.find((registeredUser) => {
      return registeredUser.email.toLowerCase() === enteredEmail.toLowerCase();
    });

    if (!matchedUser) {
      const message = "Account not found. Please sign up first.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (matchedUser.password !== enteredPassword) {
      const message = "Incorrect password. Please try again.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setErrorMessage("");

    dispatch(
      loginSuccess({
        user: { email: matchedUser.email },
        token: `demo-user-token-${Date.now()}`,
      })
    );

    toast.success("Logged in successfully.");
    navigate(redirectPath, { replace: true });
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-copy">
          <span className="login-badge">Welcome back</span>
          <h2 className="login-title">Sign in to continue shopping</h2>
          <p className="login-subtitle">
            Use the email and password you created from the sign-up page to access your account.
          </p>

          {redirectPath !== "/" ? (
            <p className="login-redirect-note">Please log in to continue to {redirectPath}.</p>
          ) : null}
        </div>

        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="login-decoy-fields" aria-hidden="true">
            <input type="text" name="username" autoComplete="username" tabIndex={-1} />
            <input type="password" name="password" autoComplete="current-password" tabIndex={-1} />
          </div>

          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="loginEmail"
              type="email"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="loginPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
            />
          </div>

          {errorMessage ? <p className="login-error">{errorMessage}</p> : null}

          <button type="submit" className="login-submit-btn">
            Log In
          </button>

          <div className="login-footer">
            <span>New here?</span>
            <Link to="/signup" state={location.state} className="login-footer-link">
              Create an account
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

export default Login;
