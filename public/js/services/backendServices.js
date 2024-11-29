// Base URL of the API
const baseURL = "http://localhost:3000/api";

// --- Helper Functions ---
const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// --- Methods for OfertaLaboral ---
const createJobOffer = async (jobOffer) => {
  return handleResponse(axios.post(`${baseURL}/ofertas-laborales`, jobOffer));
};

const getAllJobOffers = async () => {
  return handleResponse(axios.get(`${baseURL}/ofertas-laborales`));
};

const getJobOfferById = async (id) => {
  return handleResponse(axios.get(`${baseURL}/ofertas-laborales/${id}`));
};

const updateJobOffer = async (id, updatedData) => {
  return handleResponse(axios.put(`${baseURL}/ofertas-laborales/${id}`, updatedData));
};

const deleteJobOffer = async (id) => {
  return handleResponse(axios.delete(`${baseURL}/ofertas-laborales/${id}`));
};

// --- Methods for Usuarios ---
const createUser = async (user) => {
  return handleResponse(axios.post(`${baseURL}/usuarios`, user));
};

const getAllUsers = async () => {
  return handleResponse(axios.get(`${baseURL}/usuarios`));
};

const getUserById = async (id) => {
  return handleResponse(axios.get(`${baseURL}/usuarios/${id}`));
};

const updateUser = async (id, updatedData) => {
  return handleResponse(axios.put(`${baseURL}/usuarios/${id}`, updatedData));
};

const deleteUser = async (id) => {
  return handleResponse(axios.delete(`${baseURL}/usuarios/${id}`));
};