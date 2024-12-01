document.addEventListener("DOMContentLoaded", async () => {
  const loggedUserID = sessionStorage.getItem("userID");

  if (!loggedUserID) {
    console.error("Employer ID not found in sessionStorage.");
    return;
  }

  try {
    // Fetch employer information using the loggedUserID
    const employer = await getUserById(loggedUserID);

    if (!employer) {
      console.error("Employer not found.");
      return;
    }

    // Populate the profile with employer information
    document.getElementById("loggedCompanyTitle").textContent = employer.nombre || "Company Name";
    document.getElementById("loggedDescription").textContent =
      employer.descripcion || "Descripción no disponible";
    document.getElementById("loggedEmail").textContent = employer.email || "No disponible";
    document.getElementById("loggedPhone").textContent = employer.telefono || "No disponible";

    // Populate the modal inputs with employer information
    document.getElementById("companyTitle").value = employer.nombre || "";
    document.getElementById("companyDescripcion").value = employer.descripcion || "";
    document.getElementById("companyEmail").value = employer.email || "";
    document.getElementById("companyPhone").value = employer.telefono || "";
  } catch (error) {
    console.error("Error fetching employer information:", error);
  }

  // Event listener for saving updated employer info
  document.querySelector("#guardarNuevoPerfil").addEventListener("click", async () => {
    try {
      // Collect updated information from input fields
      const updatedData = {
        nombre: document.getElementById("companyTitle").value.trim(),
        descripcion: document.getElementById("companyDescripcion").value.trim(),
        email: document.getElementById("companyEmail").value.trim(),
        telefono: document.getElementById("companyPhone").value.trim(),
      };

      // Send updated information to the backend
      const response = await updateUser(loggedUserID, updatedData);

      // Update the profile display with new information
      document.getElementById("loggedCompanyTitle").textContent =
        updatedData.nombre || "Company Name";
      document.getElementById("loggedDescription").textContent =
        updatedData.descripcion || "Descripción no disponible";
      document.getElementById("loggedEmail").textContent = updatedData.email || "No disponible";
      document.getElementById("loggedPhone").textContent = updatedData.telefono || "No disponible";

      console.log("Employer updated successfully:", response);
    } catch (error) {
      console.error("Error updating employer information:", error);
      alert("There was an error updating the employer information. Please try again.");
    }
  });

  // Logout button functionality
  document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("userID");
    window.location.href = "landing.html";
  });
});
