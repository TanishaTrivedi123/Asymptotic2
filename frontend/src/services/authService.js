import axios from "axios";

//VITE me "process.env" kaam nhi karta
// VITE me variable access karne ka sahi tarika
const API_URL = import.meta.env.VITE_BACKEND_URL;

//------------------api call for signup-----------------------------

export const signupService = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, payload);
    return response.data;
  } catch (error) {
    // safely handle backend error
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Signup failed" };
    }
  }
};

//--------------------------api call for login-----------------------------
export const loginService = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, payload);
    return response.data;
  } catch (error) {
    //safely handle backedn error
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Login failed" };
    }
  }
};

//-------------------------api call for forgot password--------------------------
export const forgotPasswordService = async (payload) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/forgot-password`,
      payload
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Failed to send reset link" };
    }
  }
};

//--------------------------api call for verify reset-token-----------------
export const verifyResetToken = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/auth/verify-reset-token/${token}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Token verification failed" };
    }
  }
};

//--------------------------api call for reset-password----------------------------
export const resetPasswordService = async (token, payload) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/reset-password/${token}`,
      payload
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Failed to reset password" };
    }
  }
};
