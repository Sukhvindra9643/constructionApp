import { configureStore } from "@reduxjs/toolkit";
import { authReducer, messageReducer } from "./reducers/userReducer.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
});

export default store;
