import axios from "axios";

const serverUrl = "http://192.168.100.66:4000/api/v1";
// const serverUrl = "https://constructionbackend.onrender.com/api/v1";

// User Action
export const getAllServices = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllServicesRequest" });

    const { data } = await axios.get(`${serverUrl}/getAllServices`);

    dispatch({ type: "getAllServicesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllServicesFailure",
      payload: error.response.data.message,
    });
  }
};
export const getServiceDetails = (serviceId) => async (dispatch) => {
  try {
    dispatch({ type: "ServiceDetailRequest" });

    const { data } = await axios.get(`${serverUrl}/service/${serviceId}`);
    
    dispatch({ type: "ServiceDetailSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "ServiceDetailFailure",
      payload: error.response.data.message,
    });
  }
};

// Admin Action
export const getAllAdminServices = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllAdminServicesRequest" });
  
    const { data } = await axios.get(`${serverUrl}/admin/getAllServices`);

    dispatch({ type: "getAllAdminServicesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllAdminServicesFailure",
      payload: error.response.data.message,
    });
  }
};
export const createService = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "createAdminServiceRequest" });

    const { data } = await axios.post(
      `${serverUrl}/admin/createservice`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "createAdminServiceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createAdminServiceFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateService = (serviceId,formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateAdminServiceRequest" });

    const { data } = await axios.put(
      `${serverUrl}/admin/service/${serviceId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "updateAdminServiceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateAdminServiceFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteAdminService = (serviceId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteAdminServiceRequest" });

    const { data } = await axios.delete(
      `${serverUrl}/admin/service/${serviceId}`
    );
    dispatch({ type: "deleteAdminServiceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteAdminServiceFailure",
      payload: error.response.data.message,
    });
  }
};

// Seller Action

export const getAllSellerServices = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllSellerServicesRequest" });
    
    const { data } = await axios.get(
      `${serverUrl}/seller/getAllSellerServices`
    );
    
    dispatch({ type: "getAllSellerServicesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllSellerServicesFailure",
      payload: error.response.data.message,
    });
  }
};

export const createSellerService = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "createSellerServiceRequest" });

    const { data } = await axios.post(
      `${serverUrl}/seller/createservice`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    dispatch({ type: "createSellerServiceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createSellerServiceFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateSellerService = (serviceId,formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateSellerServiceRequest" });

    const { data } = await axios.put(`${serverUrl}/seller/service/${serviceId}`,formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "updateSellerServiceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateSellerServiceFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteSellerService = (serviceId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteSellerServiceRequest" });

    const { data } = await axios.delete(
      `${serverUrl}/seller/service/${serviceId}`
    );
    dispatch({ type: "deleteSellerServiceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteSellerServiceFailure",
      payload: error.response.data.message,
    });
  }
};




// Create Category
export const CreateCategories = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "createCategoryRequest" });


    const { data } = await axios.post(
      `${serverUrl}/createCategory`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({ type: "createCategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createCategoryFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllCategoriesRequest" });
    
    const { data } = await axios.get(
      `${serverUrl}/getAllCategories`
    );
    dispatch({ type: "getAllCategoriesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllCategoriesFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (serviceId,formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateCategoryRequest" });

    const { data } = await axios.put(`${serverUrl}/updateCategory/${serviceId}`,formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "updateCategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateCategoryFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteCategory = (serviceId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCategoryRequest" });

    const { data } = await axios.delete(
      `${serverUrl}/deleteCategory/${serviceId}`
    );
    console.log("data",data)
    dispatch({ type: "deleteCategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteCategoryFailure",
      payload: error.response.data.message,
    });
  }
};


export const getCategoryDetails = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: "CategoryDetailRequest" });

    const { data } = await axios.get(`${serverUrl}/category/${categoryId}`);

    dispatch({ type: "CategoryDetailSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "CategoryDetailFailure",
      payload: error.response.data.message,
    });
  }
};