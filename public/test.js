// Base URL of the API
const baseURL = "http://localhost:3000/api";

// Helper function to display results in the HTML
const displayOutput = (data) => {
  const output = document.getElementById("output");
  output.textContent = JSON.stringify(data, null, 2); // Pretty-print JSON
};

// Helper function to handle and display errors
const handleError = (error) => {
  const errorMessage = error.response ? error.response.data : error.message;
  displayOutput({ error: errorMessage });
};

// --- Methods for OfertaLaboral ---
const createJobOffer = async (jobOffer) => {
  try {
    const response = await axios.post(`${baseURL}/ofertas-laborales`, jobOffer);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

const getAllJobOffers = async () => {
  try {
    const response = await axios.get(`${baseURL}/ofertas-laborales`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

const getJobOfferById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/ofertas-laborales/${id}`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

const updateJobOffer = async (id, updatedData) => {
  try {
    const response = await axios.put(`${baseURL}/ofertas-laborales/${id}`, updatedData);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

const deleteJobOffer = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/ofertas-laborales/${id}`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// --- Methods for Usuarios ---
const createUser = async (user) => {
  try {
    const response = await axios.post(`${baseURL}/usuarios`, user);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/usuarios`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/usuarios/${id}`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.put(`${baseURL}/usuarios/${id}`, updatedData);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/usuarios/${id}`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// --- Event Listeners ---
const testJobOffer = {
  id: 654,
  title: "Software Engineer",
  company: "TechCorp",
  location: "Remote",
};
const updatedJobOffer = {
  title: "Senior Software Engineer",
};
const testUser = {
  cedula: 12345,
  nombre: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword",
};
const updatedUser = {
  nombre: "Johnathan Doe",
  email: "john.doe@example.com",
};

// Job Offer Event Listeners
document.getElementById("createJobOffer").addEventListener("click", () => createJobOffer(testJobOffer));
document.getElementById("getAllJobOffers").addEventListener("click", getAllJobOffers);
document.getElementById("getJobOffer").addEventListener("click", () => {
  const id = document.getElementById("jobOfferIdInput").value;
  getJobOfferById(id);
});
document.getElementById("updateJobOffer").addEventListener("click", () => {
  const id = document.getElementById("jobOfferIdInput").value;
  updateJobOffer(id, updatedJobOffer);
});
document.getElementById("deleteJobOffer").addEventListener("click", () => {
  const id = document.getElementById("jobOfferIdInput").value;
  deleteJobOffer(id);
});

// User Event Listeners
document.getElementById("createUser").addEventListener("click", () => createUser(testUser));
document.getElementById("getAllUsers").addEventListener("click", getAllUsers);
document.getElementById("getUser").addEventListener("click", () => {
  const id = document.getElementById("userIdInput").value;
  getUserById(id);
});
document.getElementById("updateUser").addEventListener("click", () => {
  const id = document.getElementById("userIdInput").value;
  updateUser(id, updatedUser);
});
document.getElementById("deleteUser").addEventListener("click", () => {
  const id = document.getElementById("userIdInput").value;
  deleteUser(id);
});
