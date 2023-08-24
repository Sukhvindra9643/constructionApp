import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase("loginRequest", (state) => {
    state.loading = true;
    state.error = "";
  });
  builder.addCase("loginSuccess", (state, action) => {
    state.loading = false;
    state.isAuthenticated = action.payload.success;
    state.user = action.payload.user;
    state.message = action.payload.success;
    state.token = action.payload.token;
  });
  builder.addCase("loginFailure", (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  });
  builder.addCase("registerRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("registerSuccess", (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.user;
    state.message = action.payload.message;
  });
  builder.addCase("registerFailure", (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  });
  builder.addCase("loadUserRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("loadUserSuccess", (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.user;
  });
  builder.addCase("loadUserFailure", (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  });
  builder.addCase("logoutRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("logoutSuccess", (state) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.message = false;
    state.token = "";
  });
  builder.addCase("logoutFailure", (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.error = action.payload;
  });
  builder.addCase("verificationRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("verificationSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  builder.addCase("verificationFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // Admin Reducer
  builder.addCase("deleteUserRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("deleteUserSuccess", (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.isDeleted = action.payload.success;
  });
  builder.addCase("deleteUserFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
});

export const messageReducer = createReducer(initialState, (builder) => {
    builder.addCase("updateProfileRequest", (state) => {
      state.isUpdated = false;
      state.loading = true;
    }),
    builder.addCase("updateProfileSuccess", (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    }),
    builder.addCase("updateProfileReset", (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    }),
    builder.addCase("updateProfileFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase("updatePasswordRequest", (state) => {
      state.loading = true;
      state.isPasswordUpdated = false;
    }),
    builder.addCase("updatePasswordSuccess", (state, action) => {
      state.loading = false;
      state.isPasswordUpdated = true;
    }),
    builder.addCase("updatePasswordFailure", (state, action) => {
      state.loading = false;
      state.isPasswordUpdated = false
      state.error = action.payload;
    }),
    builder.addCase("updatePasswordReset", (state, action) => {
      state.loading = false;
      state.isPasswordUpdated = false;
    });
    builder.addCase("forgetPasswordRequest", (state) => {
      state.loading = true;
    }),
    builder.addCase("forgetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.success = true;
    }),
    builder.addCase("forgetPasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;

    }),
    builder.addCase("clearError", (state) => {
      state.error = null;
    }),
    builder.addCase("clearMessage", (state) => {
      state.message = null;
    });
});
