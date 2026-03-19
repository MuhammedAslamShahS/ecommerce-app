import { createSlice } from "@reduxjs/toolkit";

const isValidStoredUser = (value) => {
  return typeof value?.email === "string" && value.email.trim().length > 0;
};

const isValidRegisteredUser = (value) => {
  return (
    typeof value?.email === "string" &&
    value.email.trim().length > 0 &&
    typeof value?.password === "string" &&
    value.password.length > 0
  );
};

const sanitizeSavedUser = (value) => {
  if (!isValidStoredUser(value)) {
    return null;
  }

  return { email: value.email.trim() };
};

const sanitizeRegisteredUsers = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isValidRegisteredUser)
    .map((registeredUser) => ({
      email: registeredUser.email.trim(),
      password: registeredUser.password,
    }));
};

const readStoredString = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const readStoredJson = (key, fallbackValue) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallbackValue;
  } catch {
    return fallbackValue;
  }
};

const saveCurrentSession = (user, token) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  } catch {
    // Ignore storage errors in this local demo auth flow.
  }
};

const clearCurrentSession = () => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } catch {
    // Ignore storage errors in this local demo auth flow.
  }
};

const saveRegisteredUsers = (registeredUsers) => {
  try {
    localStorage.setItem("users", JSON.stringify(registeredUsers));
  } catch {
    // Ignore storage errors in this local demo auth flow.
  }
};

const savedUser = readStoredJson("user", null);
const savedToken = readStoredString("token");
const savedRegisteredUsers = sanitizeRegisteredUsers(readStoredJson("users", []));
const sanitizedSavedUser = sanitizeSavedUser(savedUser);

const initialState = {
  isAuthenticated: !!savedToken && !!sanitizedSavedUser,
  user: sanitizedSavedUser,
  token: savedToken || null,
  registeredUsers: savedRegisteredUsers,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const sanitizedUser = sanitizeSavedUser(action.payload.user);

      if (!sanitizedUser) {
        return;
      }

      state.isAuthenticated = true;
      state.user = sanitizedUser;
      state.token = action.payload.token;

      saveCurrentSession(sanitizedUser, action.payload.token);
    },
    signupSuccess: (state, action) => {
      const newRegisteredUser = {
        email: action.payload.user.email.trim(),
        password: action.payload.password,
      };

      const filteredUsers = state.registeredUsers.filter((registeredUser) => {
        return registeredUser.email.toLowerCase() !== newRegisteredUser.email.toLowerCase();
      });

      state.registeredUsers = [...filteredUsers, newRegisteredUser];
      state.isAuthenticated = true;
      state.user = { email: newRegisteredUser.email };
      state.token = action.payload.token;

      saveRegisteredUsers(state.registeredUsers);
      saveCurrentSession(state.user, action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      clearCurrentSession();
    },
  },
});

export const { loginSuccess, signupSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
