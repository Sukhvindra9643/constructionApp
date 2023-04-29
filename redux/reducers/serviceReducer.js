import { createReducer } from "@reduxjs/toolkit";
const initialState = {};


export const serviceReducer = createReducer(initialState,builder => {
    // User Reducer
    builder.addCase( "getAllServicesRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("getAllServicesSuccess", (state, action) => {
      state.loading = false;
      state.services = action.payload.services;
      state.message = action.payload.success;
    });
    builder.addCase("getAllServicesFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase("ServiceDetailRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("ServiceDetailSuccess", (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.service = action.payload.service;
      state.message = action.payload.success;
    });
    builder.addCase("ServiceDetailFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  
  
    // Admin Reducer
    builder.addCase("createAdminServiceRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("createAdminServiceSuccess", (state, action) => {
      state.loading = false;
      state.service = action.payload.service;
      state.message = action.payload.success;
    });
    builder.addCase( "createAdminServiceFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  
    builder.addCase( "getAllAdminServicesRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("getAllAdminServicesSuccess", (state, action) => {
      state.loading = false;
      state.services = action.payload.services;
      state.message = action.payload.success;
    });
    builder.addCase("getAllAdminServicesFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  
    builder.addCase( "updateAdminServiceRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("updateAdminServiceSuccess", (state, action) => {
      state.loading = false;
      state.service = action.payload.service;
      state.isUpdated = action.payload.success;
    });
    builder.addCase("updateAdminServiceFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  
    builder.addCase( "deleteAdminServiceRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("deleteAdminServiceSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isDeleted = action.payload.success;
    });
    builder.addCase("deleteAdminServiceFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  
  
    // Seller Reducer
    builder.addCase("createSellerServiceRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("createSellerServiceSuccess", (state, action) => {
      state.loading = false;
      state.service = action.payload.service;
      state.message = action.payload.success;
    });
    builder.addCase( "createSellerServiceFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  
    builder.addCase( "getAllSellerServicesRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("getAllSellerServicesSuccess", (state, action) => {
      state.loading = false;
      state.sellerservices = action.payload.services;
      state.message = action.payload.success;
    });
    builder.addCase("getAllSellerServicesFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  
    builder.addCase( "updateSellerServiceRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("updateSellerServiceSuccess", (state, action) => {
      state.loading = false;
      state.service = action.payload.service;
      state.isUpdated = action.payload.success;
    });
    builder.addCase("updateSellerServiceFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  
    builder.addCase( "deleteSellerServiceRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("deleteSellerServiceSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success;
    });
    builder.addCase("deleteSellerServiceFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


// Category Reducer
    builder.addCase("createCategoryRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("createCategorySuccess", (state, action) => {
      state.loading = false;
      state.category = action.payload.category;
      state.message = action.payload.success;
    });
    builder.addCase( "createCategoryFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase( "getAllCategoriesRequest", (state) => {
      state.loading = true;
    });
    builder.addCase("getAllCategoriesSuccess", (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
      state.message = action.payload.success;
    });

    builder.addCase("getAllCategoriesFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase( "updateCategoryRequest", (state) => {
      state.loading = true;
      state.isCategoryUpdated = false;
    });
    builder.addCase("updateCategorySuccess", (state, action) => {
      state.loading = false;
      state.category = action.payload.category;
      state.isCategoryUpdated = action.payload.success;

    });
    builder.addCase("updateCategoryFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase( "deleteCategoryRequest", (state) => {
      state.loading = true;
      state.isCategoryDeleted = false;
    });
    builder.addCase("deleteCategorySuccess", (state, action) => {
      state.loading = false;
      state.isCategoryDeleted = action.payload.success;
    });
    builder.addCase("deleteCategoryFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase( "CategoryDetailRequest", (state) => {
      state.message = false;
    });
    builder.addCase("CategoryDetailSuccess", (state, action) => {
      state.loading = false;
      state.Category = action.payload.category;
      state.message = action.payload.success;
    });

    builder.addCase("CategoryDetailFailure", (state, action) => {
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


