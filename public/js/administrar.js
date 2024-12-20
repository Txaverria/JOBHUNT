document.addEventListener("DOMContentLoaded", async () => {
  const jobListingsContainer = document.getElementById("job-listings-container");
  const applicantListingsContainer = document.getElementById("applicant-listings-container");
  const employerListingsContainer = document.getElementById("employer-listings-container");

  let deleteItemId = null;
  let deleteItemType = null;

  try {
    // Fetch all job offers and users
    const [allJobs, allUsers] = await Promise.all([getAllJobOffers(), getAllUsers()]);

    // Filter users into applicants and employers
    const applicants = allUsers.filter((user) => user.tipo === "usuario");
    const employers = allUsers.filter((user) => user.tipo === "empresa");

    // Render job offers
    allJobs.forEach((job, index) => {
      const jobElement = document.createElement("div");
      jobElement.classList.add("job-listing", "mb-4");
      const collapseId = `collapseSolicitantes${index}`; // Unique ID for each collapse

      jobElement.innerHTML = `
        <div class="row">
          <div class="col-md-2 d-flex align-items-center">
            <img
              src="imagenes/IMGEJEMPLO.png"
              alt="Job Picture"
              class="img-fluid rounded"
            />
          </div>
          <div class="col-md-8">
            <p class="fw-bold job-name">${job.titulo || "Nombre Puesto"}</p>
            <p>
              ${job.empresa || "Nombre Empresa"} (${job.tipo || "Tiempo de Empleo"})
              <br />
              ${job.ubicacion || "Ubicación"} (${job.modalidad || "Modalidad"})
              <br />
              ${job.area || "Área de Interés"} (${job.salario || "Pretensión Salarial"})
            </p>
          </div>
          <div class="col-md-2 d-flex align-items-start justify-content-end">
            <button
              class="icon-button delete-icon"
              data-bs-toggle="modal"
              data-bs-target="#deleteConfirmationModal"
              data-item-id="${job._id}"
              data-item-type="job"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-auto ms-auto">
            Hasta: ${
              job.fechaExpiracion
                ? new Date(job.fechaExpiracion).toLocaleDateString("es-ES", { timeZone: "UTC" })
                : "DD/MM/YYYY"
            }
          </div>
        </div>
        ${
          job.solicitantes && job.solicitantes.length > 0
            ? `
              <div class="row mt-3">
                <div class="col-12">
                  <button
                    class="btn btn-secondary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#${collapseId}"
                    aria-expanded="false"
                    aria-controls="${collapseId}"
                  >
                    Ver Solicitantes (${job.solicitantes.length})
                  </button>
                  <div class="collapse mt-2" id="${collapseId}">
                    <div class="">
                      <ul>
                        ${job.solicitantes
                          .map(
                            (applicant) => `
                              <li>
                                <p style="text-align: left; margin: 0">
                                  <strong>Email:</strong> ${applicant.email}<br />
                                  <strong>Teléfono:</strong> ${applicant.phone}<br />
                                  <strong>Pretensión Salarial:</strong> ${
                                    applicant.salaryExpectation
                                  }<br />
                                  <strong>Currículum:</strong> 
                                  <span style='text-decoration: underline;'>${
                                    applicant.cv ? applicant.cv : "No hay CV en el sistema."
                                  }</span>
                                </p>
                              </li>
                            `
                          )
                          .join("")}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            `
            : ""
        }
      `;
      jobListingsContainer.appendChild(jobElement);
    });

    // Render applicants
    applicants.forEach((applicant) => {
      const applicantElement = document.createElement("div");
      applicantElement.classList.add("job-listing", "mb-4");
      applicantElement.innerHTML = `
        <div class="row">
          <div class="col-md-2 d-flex align-items-center">
            <img
              src="imagenes/users/usuario.png"
              alt="Applicant Picture"
              class="img-fluid"
            />
          </div>
          <div class="col-md-8">
            <p class="fw-bold job-name">${applicant.nombre || "Nombre Solicitante"}</p>
            <p><strong>Datos de contacto</strong></p>
            <p>
              Correo electrónico: ${applicant.email || "No disponible"}
              <br />
              Teléfono: ${applicant.telefono || "No disponible"}
              <br />
              Currículum: <span style='text-decoration: underline;'>${applicant.cv}</span>
            </p>
          </div>
          <div class="col-md-2 d-flex align-items-start justify-content-end">
            <button
              class="icon-button delete-icon"
              data-bs-toggle="modal"
              data-bs-target="#deleteConfirmationModal"
              data-item-id="${applicant._id}"
              data-item-type="user"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      `;
      applicantListingsContainer.appendChild(applicantElement);
    });

    // Render employers
    employers.forEach((employer) => {
      const employerElement = document.createElement("div");
      employerElement.classList.add("job-listing", "mb-4");
      employerElement.innerHTML = `
        <div class="row">
          <div class="col-md-2 d-flex align-items-center">
            <img
              src="imagenes/users/empresa.png"
              alt="Employer Picture"
              class="img-fluid"
            />
          </div>
          <div class="col-md-8">
            <p class="fw-bold job-name">${employer.nombre || "Nombre Empresa"} (${
        employer.empresa
      })</p>
            <p>${employer.descripcion || "Descripción no disponible"}</p>
            <p>
              <strong>Información de contacto</strong>
              <br />
              Correo electrónico: ${employer.email || "No disponible"}
              <br />
              Teléfono: ${employer.telefono || "No disponible"}
            </p>
          </div>
          <div class="col-md-2 d-flex align-items-start justify-content-end">
            <button
              class="icon-button delete-icon"
              data-bs-toggle="modal"
              data-bs-target="#deleteConfirmationModal"
              data-item-id="${employer._id}"
              data-item-type="user"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      `;
      employerListingsContainer.appendChild(employerElement);
    });

    // Event listener for delete buttons
    document.addEventListener("click", (event) => {
      if (event.target.closest(".delete-icon")) {
        const button = event.target.closest(".delete-icon");
        deleteItemId = button.getAttribute("data-item-id");
        deleteItemType = button.getAttribute("data-item-type");

        // Update modal content based on item type
        const modalTitle = document.getElementById("deleteModalTitle");
        const modalMessage = document.getElementById("deleteModalMessage");
        if (deleteItemType === "job") {
          modalTitle.textContent = "Eliminar Puesto";
          modalMessage.textContent = "¿Seguro que quiere eliminar el puesto?";
        } else if (deleteItemType === "user") {
          modalTitle.textContent = "Eliminar Usuario";
          modalMessage.textContent = "¿Seguro que quiere eliminar este usuario?";
        }
      }
    });

    // Confirm delete action
    document.getElementById("confirmDeleteButton").addEventListener("click", async () => {
      try {
        if (deleteItemType === "job") {
          await deleteJobOffer(deleteItemId);
        } else if (deleteItemType === "user") {
          await deleteUser(deleteItemId);
        }

        // Close the confirmation modal
        const confirmationModal = bootstrap.Modal.getInstance(
          document.getElementById("deleteConfirmationModal")
        );
        confirmationModal.hide();

        // Show success modal
        const successModal = new bootstrap.Modal(document.getElementById("deleteSuccessModal"));
        successModal.show();

        // Remove the deleted item from the DOM
        document.querySelector(`[data-item-id="${deleteItemId}"]`).closest(".job-listing").remove();
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al eliminar el elemento. Por favor, inténtelo nuevamente.",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // Logout button functionality
  document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("userID");
    window.location.href = "landing.html";
  });
});
