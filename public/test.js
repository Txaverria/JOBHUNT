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
document.getElementById("createJobOffer").addEventListener("click", () => {
  const jobOffer = {
      titulo: document.getElementById("jobTitulo").value,
      descripcion: document.getElementById("jobDescripcion").value,
      salario: parseFloat(document.getElementById("jobSalario").value),
      ubicacion: document.getElementById("jobUbicacion").value,
      tipo: document.getElementById("jobTipo").value,
      modalidad: document.getElementById("jobModalidad").value,
      fechaPublicacion: document.getElementById("jobFechaPublicacion").value,
      fechaExpiracion: document.getElementById("jobFechaExpiracion").value,
  };

  createJobOffer(jobOffer);
});

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
