document.addEventListener("DOMContentLoaded", async () => {
  const jobListingsContainer = document.getElementById("job-listings-applied");
  const loggedUserID = sessionStorage.getItem("userID");

  const fileInput = document.getElementById("Curriculum");
  const fileNameDisplay = document.getElementById("fileNameDisplay");

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name; // Get the file name
      fileNameDisplay.textContent = fileName; // Display the file name
      fileNameDisplay.style.display = "block"; // Make the div visible
    }
  });

  document.getElementById("candidatePhone").addEventListener("input", function (e) {
    let input = e.target.value;

    // Remove all non-numeric characters except '+'
    input = input.replace(/[^\d+]/g, "");

    // Ensure the string starts with '+506'
    if (!input.startsWith("+506")) {
      input = "+506" + input.replace(/^\+506/, "");
    }

    // Extract the numbers after +506
    let numbers = input.slice(4).replace(/\D/g, "");

    // Format the numbers to include a dash after 4 digits
    if (numbers.length > 4) {
      numbers = numbers.slice(0, 4) + "-" + numbers.slice(4, 8);
    }

    // Rebuild the final formatted value
    e.target.value = "+506 " + numbers;
  });

  if (!loggedUserID) {
    console.error("User ID not found in sessionStorage.");
    jobListingsContainer.innerHTML = `
      <p class="text-center text-muted">No se encontró un usuario en la sesión.</p>
    `;
    return;
  }

  try {
    // Fetch all job offers
    const jobOffers = await getAllJobOffers();

    // Filter job offers where loggedUserID is in solicitantes array
    const appliedJobOffers = jobOffers.filter((job) =>
      job.solicitantes?.some((applicant) => applicant.applicantId === loggedUserID)
    );

    // Clear the container
    jobListingsContainer.innerHTML = "";

    // Check if there are any matching job offers
    if (appliedJobOffers.length === 0) {
      jobListingsContainer.innerHTML = `
        <p class="text-center text-muted">No tienes empleos solicitados.</p>
      `;
    }

    try {
      // Fetch user information using the loggedUserID
      const user = await getUserById(loggedUserID);
      console.log("hello");

      if (!user) {
        console.error("User not found.");
      } else {
        console.log(user);
      }

      // Populate the modal input fields with the user information
      document.getElementById("candidateName").value = user.nombre || "";
      document.getElementById("candidateEmail").value = user.email || "";
      document.getElementById("candidatePhone").value = user.telefono || "";

      if (user.cv) {
        fileNameDisplay.textContent = user.cv;
        fileNameDisplay.style.display = "block";
      }

      // Update the display spans with the user information
      document.getElementById("loggedName").textContent = user.nombre || "Nombre no disponible";
      document.getElementById("loggedEmail").textContent = user.email || "Correo no disponible";
      document.getElementById("loggedPhone").textContent =
        user.telefono || "Teléfono no disponible";
      document.getElementById("loggedCurriculum").textContent = user.cv || "No disponible";
    } catch (error) {
      console.error("Error fetching user information:", error);
    }

    // Render each matching job offer
    appliedJobOffers.forEach((job) => {
      const jobElement = document.createElement("div");
      jobElement.classList.add("job-listing");

      jobElement.innerHTML = `
        <div class="row">
          <div class="col-md-2 d-flex align-items-center">
            <img src="imagenes/IMGEJEMPLO.png" alt="Job Picture" class="img-fluid" />
          </div>
          <div class="col-md-8">
            <p class="fw-bold job-name">${job.titulo || "Nombre Puesto"}</p>
            <p>
              ${job.empresa || "Nombre Empresa"} (${job.tipo || "Tiempo de Empleo"})
              <br />
              ${job.ubicacion || "Ubicación"} (${job.modalidad || "Modalidad"})
              <br />
              ${job.area || "Área de Interés"} (${job.salario || "Pretención Salarial"})
            </p>
          </div>
          <div class="col-md-2 d-flex align-items-start justify-content-end"></div>
        </div>
        <div class="row">
          <div class="col-auto ms-auto">Hasta: ${
            job.fechaExpiracion
              ? new Date(job.fechaExpiracion).toLocaleDateString("es-ES", { timeZone: "UTC" })
              : "DD/MM/YYYY"
          }</div>
        </div>
      `;

      jobListingsContainer.appendChild(jobElement);
    });
  } catch (error) {
    console.error("Error fetching or rendering job offers:", error);
    jobListingsContainer.innerHTML = `
      <p class="text-center text-danger">Error cargando empleos solicitados. Por favor, inténtalo más tarde.</p>
    `;
  }

  // Event listener for saving updated user info
  document.getElementById("send-updated-user-info").addEventListener("click", async () => {
    try {
      // Collect updated information from input fields
      const updatedData = {
        nombre: document.getElementById("candidateName").value.trim(),
        email: document.getElementById("candidateEmail").value.trim(),
        telefono: document.getElementById("candidatePhone").value.trim(),
        cv: document.getElementById("fileNameDisplay").textContent.trim(),
      };

      contrasena = document.getElementById("candidatePassword").value.trim();

      if (contrasena) {
        updatedData.contrasena = contrasena;
      }

      // Send updated information to the backend
      const response = await updateUser(loggedUserID, updatedData);
      console.log("User updated successfully:", response);

      // Update the display spans with the new user information
      document.getElementById("loggedName").textContent =
        updatedData.nombre || "Nombre no disponible";
      document.getElementById("loggedEmail").textContent =
        updatedData.email || "Correo no disponible";
      document.getElementById("loggedPhone").textContent =
        updatedData.telefono || "Teléfono no disponible";
      document.getElementById("loggedCurriculum").textContent = updatedData.cv || "No disponible";
      document.getElementById("fileNameDisplay").textContent = updatedData.cv || "CV no disponible";
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("There was an error updating the user information. Please try again.");
    }
  });
});
