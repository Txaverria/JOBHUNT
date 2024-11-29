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
// Method to create a new job offer
const createJobOffer = async (jobOffer) => {
  try {
    const response = await axios.post(`${baseURL}/ofertas-laborales`, jobOffer);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// Method to get all job offers
const getAllJobOffers = async () => {
  try {
    const response = await axios.get(`${baseURL}/ofertas-laborales`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// Method to get a single job offer by ID
const getJobOfferById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/ofertas-laborales/${id}`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// Method to update a job offer by ID
const updateJobOffer = async (id, updatedData) => {
  try {
    const response = await axios.put(`${baseURL}/ofertas-laborales/${id}`, updatedData);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// Method to delete a job offer by ID
const deleteJobOffer = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/ofertas-laborales/${id}`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// --- Methods for Usuarios ---
// Method to create a new user
const createUser = async (user) => {
  try {
    const response = await axios.post(`${baseURL}/usuarios`, user);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// Method to get all users
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/usuarios`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// Method to get a single user by ID
const getUserById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/usuarios/${id}`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// Method to update a user by ID
const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.put(`${baseURL}/usuarios/${id}`, updatedData);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// Method to delete a user by ID
const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/usuarios/${id}`);
    displayOutput(response.data);
  } catch (error) {
    handleError(error);
  }
};

// Predefined test data for job offers
const testJobOffer = {
  id: 654,
  title: "Software Engineer",
  company: "TechCorp",
  location: "Remote",
};
const updatedJobOffer = {
  id: 654,
  title: "Senior Software Engineer",
};

// Predefined test data for users
const testUser = {
  nombre: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword",
};
const updatedUser = {
  nombre: "Johnathan Doe",
  email: "john.doe@example.com",
};

const testJobOfferID = 654; // Replace with an actual Job Offer ID
const testUserID = "USER_ID_HERE"; // Replace with an actual User ID

// Attach event listeners for Job Offers
document.getElementById("createJobOffer").addEventListener("click", () => createJobOffer(testJobOffer));
document.getElementById("getAllJobOffers").addEventListener("click", getAllJobOffers);
document.getElementById("getJobOffer").addEventListener("click", () => getJobOfferById(testJobOfferID));
document.getElementById("updateJobOffer").addEventListener("click", () => updateJobOffer(testJobOfferID, updatedJobOffer));
document.getElementById("deleteJobOffer").addEventListener("click", () => deleteJobOffer(testJobOfferID));

// Attach event listeners for Users
document.getElementById("createUser").addEventListener("click", () => createUser(testUser));
document.getElementById("getAllUsers").addEventListener("click", getAllUsers);
document.getElementById("getUser").addEventListener("click", () => getUserById(testUserID));
document.getElementById("updateUser").addEventListener("click", () => updateUser(testUserID, updatedUser));
document.getElementById("deleteUser").addEventListener("click", () => deleteUser(testUserID));
