document.addEventListener("DOMContentLoaded", async () => {
  const loggedUserID = sessionStorage.getItem("userID");

  if (!loggedUserID) {
    console.error("Admin ID not found in sessionStorage.");
    return;
  }

  try {
    // Fetch admin information using the loggedUserID
    const admin = await getUserById(loggedUserID);

    if (!admin) {
      console.error("Admin not found.");
      return;
    }

    // Populate the profile with admin information
    document.getElementById("loggedName").textContent = admin.nombre || "Admin Name";
    document.getElementById("loggedEmail").textContent = admin.email || "No disponible";
    document.getElementById("loggedPhone").textContent = admin.telefono || "No disponible";
    document.getElementById("loggedPassword").textContent = "********";

    // Populate the modal inputs with admin information
    document.getElementById("nombre").value = admin.nombre || "";
    document.getElementById("email").value = admin.email || "";
    document.getElementById("telefono").value = admin.telefono || "";
    document.getElementById("contrasena").value = admin.contrasena || "";
  } catch (error) {
    console.error("Error fetching admin information:", error);
  }

  // Event listener for saving updated admin info
  document
    .querySelector("[data-bs-target='#changesSavedModal']")
    .addEventListener("click", async () => {
      try {
        // Collect updated information from input fields
        const updatedData = {
          nombre: document.getElementById("nombre").value.trim(),
          email: document.getElementById("email").value.trim(),
          telefono: document.getElementById("telefono").value.trim(),
          contrasena: document.getElementById("contrasena").value.trim(),
        };

        // Send updated information to the backend
        const response = await updateUser(loggedUserID, updatedData);

        // Update the profile display with new information
        document.getElementById("loggedName").textContent = updatedData.nombre || "Admin Name";
        document.getElementById("loggedEmail").textContent = updatedData.email || "No disponible";
        document.getElementById("loggedPhone").textContent =
          updatedData.telefono || "No disponible";
        document.getElementById("loggedPassword").textContent = "********";

        console.log("Admin updated successfully:", response);
      } catch (error) {
        console.error("Error updating admin information:", error);
        alert("There was an error updating the admin information. Please try again.");
      }
    });
});
