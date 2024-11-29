document.addEventListener("DOMContentLoaded", async () => {
  const jobListingContainer = document.querySelector("#job-listings");

  try {
    // Fetch job offers
    const jobOffers = await getAllJobOffers();

    // Clear existing content
    jobListingContainer.innerHTML = "";

    // Check if there are job offers
    if (jobOffers.length === 0) {
      // Render "no job offers" message
      jobListingContainer.innerHTML = `
        <p class="text-center text-muted mt-4">No hay ofertas de trabajo disponibles.</p>
      `;
    } else {
      // Render each job offer
      jobOffers.forEach((job) => {
        const jobElement = document.createElement("div");
        jobElement.classList.add("job-listing", "mb-4");

        jobElement.innerHTML = `
          <div class="row">
            <div class="col-md-2 d-flex align-items-center">
              <img
                src="imagenes/IMGEJEMPLO.png"
                alt="${job.company || "Empresa"}"
                style="width: 150px; height: 150px; object-fit: cover"
              />
            </div>
            <div class="col-md-8" style="margin-left: 75px">
              <p class="fw-bold job-name">${job.titulo || "Nombre Puesto"}</p>
              <p class="m-0">${job.company || "Nombre Empresa"} (${
          job.tipo || "Tipo de Empleo"
        })</p>
              <p class="m-0">${job.ubicacion || "Ubicación"} (${job.modalidad || "Modalidad"})</p>
              <p class="">${job.area || "Área de Interés"} (${
          job.salario || "Pretensión Salarial"
        })</p>
              <button
                class="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#contactModal"
                data-id="${job._id}"
              >
                Solicitar
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-auto ms-auto text-muted">Hasta: ${
              job.fechaExpiracion
                ? new Date(job.fechaExpiracion).toLocaleDateString()
                : "DD/MM/YYYY"
            }</div>
          </div>
        `;

        jobListingContainer.appendChild(jobElement);
      });
    }
  } catch (error) {
    console.error("Error rendering job offers:", error);

    // Optionally, display an error message in the UI
    jobListingContainer.innerHTML = `
      <p class="text-center text-danger mt-4">Error cargando ofertas de trabajo. Por favor, inténtalo de nuevo más tarde.</p>
    `;
  }
});
