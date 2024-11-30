document.addEventListener("DOMContentLoaded", async () => {
  const jobListingsContainer = document.getElementById("job-listings-applied");
  const loggedCedula = sessionStorage.getItem("userCedula");

  if (!loggedCedula) {
    console.error("User ID not found in sessionStorage.");
    jobListingsContainer.innerHTML = `
      <p class="text-center text-muted">No se encontró un usuario en la sesión.</p>
    `;
    return;
  }

  try {
    // Fetch all job offers
    const jobOffers = await getAllJobOffers();

    // Filter job offers where loggedCedula is in solicitantes array
    const appliedJobOffers = jobOffers.filter((job) =>
      job.solicitantes?.some((applicant) => applicant.cedula === loggedCedula)
    );

    // Clear the container
    jobListingsContainer.innerHTML = "";

    // Check if there are any matching job offers
    if (appliedJobOffers.length === 0) {
      jobListingsContainer.innerHTML = `
        <p class="text-center text-muted">No tienes empleos solicitados.</p>
      `;
      return;
    }

    // Render each matching job offer
    appliedJobOffers.forEach((job) => {
      const jobElement = document.createElement("div");
      jobElement.classList.add("job-listing");

      jobElement.innerHTML = `
        <div class="row">
          <div class="col-md-2 d-flex align-items-center">
            <img src="imagenes/job-placeholder.png" alt="Job Picture" class="img-fluid" />
          </div>
          <div class="col-md-8">
            <p class="fw-bold job-name">${job.titulo || "Nombre Puesto"}</p>
            <p>
              ${job.company || "Nombre Empresa"} (${job.tipo || "Tiempo de Empleo"})
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
            job.fechaExpiracion ? new Date(job.fechaExpiracion).toLocaleDateString() : "DD/MM/YYYY"
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
});
