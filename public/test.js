// Function to display API responses
const displayResponse = (data) => {
  const output = document.getElementById("output");
  output.textContent = JSON.stringify(data, null, 2); // Pretty-print JSON response
};

// --- Job Offer Event Listeners ---
document.getElementById("createJobOffer").addEventListener("click", async () => {
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

  try {
    const response = await createJobOffer(jobOffer);
    displayResponse(response);
    alert("Oferta laboral creada exitosamente.");
  } catch (error) {
    displayResponse(error);
    alert("Error al crear la oferta laboral.");
  }
});

document.getElementById("getAllJobOffers").addEventListener("click", async () => {
  try {
    const jobOffers = await getAllJobOffers();
    displayResponse(jobOffers);
  } catch (error) {
    displayResponse(error);
    alert("Error al obtener las ofertas laborales.");
  }
});

document.getElementById("getJobOffer").addEventListener("click", async () => {
  const id = document.getElementById("jobOfferIdInput").value;
  try {
    const jobOffer = await getJobOfferById(id);
    displayResponse(jobOffer);
  } catch (error) {
    displayResponse(error);
    alert("Error al obtener la oferta laboral.");
  }
});

document.getElementById("updateJobOffer").addEventListener("click", async () => {
  const id = document.getElementById("jobOfferIdInput").value;
  const updatedData = {
    titulo: document.getElementById("jobTitulo").value || undefined,
    descripcion: document.getElementById("jobDescripcion").value || undefined,
  };
  try {
    const response = await updateJobOffer(id, updatedData);
    displayResponse(response);
    alert("Oferta laboral actualizada exitosamente.");
  } catch (error) {
    displayResponse(error);
    alert("Error al actualizar la oferta laboral.");
  }
});

document.getElementById("deleteJobOffer").addEventListener("click", async () => {
  const id = document.getElementById("jobOfferIdInput").value;
  try {
    await deleteJobOffer(id);
    displayResponse({ message: "Oferta laboral eliminada exitosamente." });
    alert("Oferta laboral eliminada exitosamente.");
  } catch (error) {
    displayResponse(error);
    alert("Error al eliminar la oferta laboral.");
  }
});

// --- User Event Listeners ---
document.getElementById("createUser").addEventListener("click", async () => {
  const user = {
    cedula: parseInt(document.getElementById("userCedula")?.value || 0),
    nombre: "Default User", // Add fields dynamically if needed
    email: "user@example.com", // Placeholder for testing
    tipo: "usuario",
    contrasena: "123",
  };

  try {
    const response = await createUser(user);
    displayResponse(response);
    alert("Usuario creado exitosamente.");
  } catch (error) {
    displayResponse(error);
    alert("Error al crear el usuario.");
  }
});

document.getElementById("getAllUsers").addEventListener("click", async () => {
  try {
    const users = await getAllUsers();
    displayResponse(users);
  } catch (error) {
    displayResponse(error);
    alert("Error al obtener los usuarios.");
  }
});

document.getElementById("getUser").addEventListener("click", async () => {
  const id = document.getElementById("userIdInput").value;
  try {
    const user = await getUserById(id);
    displayResponse(user);
  } catch (error) {
    displayResponse(error);
    alert("Error al obtener el usuario.");
  }
});

document.getElementById("updateUser").addEventListener("click", async () => {
  const id = document.getElementById("userIdInput").value;
  const updatedData = {
    nombre: "Updated Name", // Replace with dynamic input fields as needed
  };
  try {
    const response = await updateUser(id, updatedData);
    displayResponse(response);
    alert("Usuario actualizado exitosamente.");
  } catch (error) {
    displayResponse(error);
    alert("Error al actualizar el usuario.");
  }
});

document.getElementById("deleteUser").addEventListener("click", async () => {
  const id = document.getElementById("userIdInput").value;
  try {
    await deleteUser(id);
    displayResponse({ message: "Usuario eliminado exitosamente." });
    alert("Usuario eliminado exitosamente.");
  } catch (error) {
    displayResponse(error);
    alert("Error al eliminar el usuario.");
  }
});
