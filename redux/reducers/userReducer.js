import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const authReducer = createReducer(initialState,builder => {
  builder.addCase("loginRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("loginSuccess", (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.user;
    state.message = action.payload.success;
  });
  builder.addCase( "loginFailure", (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  });
  builder.addCase( "registerRequest", (state) => {
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
  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
})
export const messageReducer = createReducer(initialState,builder => {
  builder.addCase("addTaskRequest", (state) => {
    state.loading = true;
  }),
  builder.addCase("addTaskSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    }),
    builder.addCase("addTaskFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase("updateTaskRequest", (state) => {
      state.loading = true;
    }),
    builder.addCase("updateTaskSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    }),
    builder.addCase("updateTaskFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase( "deleteTaskRequest", (state) => {
      state.loading = true;
    }),
    builder.addCase( "deleteTaskSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    }),
    builder.addCase("deleteTaskFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase("updateProfileRequest", (state) => {
      state.loading = true;
    }),
    builder.addCase("updateProfileSuccess", (state, action) => {
      state.loading = false;
      console.log(action.payload)
      state.isUpdated = action.payload;
    }),
    builder.addCase("updateProfileReset", (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    }),
    builder.addCase( "updateProfileFailure",(state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase("updatePasswordRequest", (state) => {
      state.loading = true;
    }),
    builder.addCase("updatePasswordSuccess", (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    }),
    builder.addCase("updatePasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase("updatePasswordReset", (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    })
    builder.addCase("forgetPasswordRequest", (state) => {
      state.loading = true;
    }),
    builder.addCase("forgetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    }),
    builder.addCase("forgetPasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase("resetPasswordRequest", (state) => {
      state.loading = true;
    }),
    builder.addCase("resetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    }),
    builder.addCase("resetPasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase("clearError", (state) => {
      state.error = null;
    }),
    builder.addCase("clearMessage", (state) => {
      state.message = null;
    })
})