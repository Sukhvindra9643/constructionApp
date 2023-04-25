import { configureStore } from "@reduxjs/toolkit";
import { authReducer, messageReducer } from "./reducers/userReducer.js";
import {serviceReducer } from "./reducers/serviceReducer.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    services:serviceReducer
  },
});

export default store;
