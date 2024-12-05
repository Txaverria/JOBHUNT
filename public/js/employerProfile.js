let employer = null;

document.addEventListener("DOMContentLoaded", async () => {
  const telefonoField = document.getElementById("companyPhone");

  telefonoField.addEventListener("input", function (e) {
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

  const loggedUserID = sessionStorage.getItem("userID");

  let selectedJobID = null; // To store the ID of the job being edited

  if (!loggedUserID) {
    console.error("Employer ID not found in sessionStorage.");
    return;
  }

  try {
    // Fetch employer information
    employer = await getUserById(loggedUserID);

    if (!employer) {
      console.error("Employer not found.");
      return;
    }

    // Populate the profile with employer information
    document.getElementById(
      "loggedCompanyTitle"
    ).innerHTML = `${employer.nombre} <span style="color: #7c411b">(${employer.empresa})</span>`;
    document.getElementById("loggedDescription").textContent =
      employer.descripcion || "Descripción no disponible";
    document.getElementById("loggedEmail").textContent = employer.email || "No disponible";
    document.getElementById("loggedPhone").textContent = employer.telefono || "No disponible";

    document.getElementById("companyTitle").value = employer.empresa || "No disponible";
    document.getElementById("companyDescripcion").value = employer.descripcion || "No disponible";
    document.getElementById("companyAdminName").value = employer.nombre || "No disponible";
    document.getElementById("companyPhone").value = employer.telefono || "No disponible";
    document.getElementById("companyEmail").value = employer.email || "No disponible";

    const guardarNuevoPerfil = document.getElementById("guardarNuevoPerfil");

    // Fetch and render job listings
    const allJobListingsContainer = document.getElementById("all-job-listings");
    const allJobs = await getAllJobOffers();
    const employerJobs = allJobs.filter((job) => job.id_empresa === loggedUserID);

    if (employerJobs.length === 0) {
      allJobListingsContainer.innerHTML = `<p class="text-center text-muted mt-4">No tienes ofertas laborales publicadas.</p>`;
    } else {
      employerJobs.forEach((job, index) => {
        const collapseId = `collapseSolicitantes${index}`; // Unique ID for each collapse
        const jobElement = document.createElement("div");
        jobElement.classList.add("job-listing", "mb-4");

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
                                  <strong>Pretensión Salarial:</strong> ${applicant.salaryExpectation}<br />
                                  <strong>Currículum:</strong> 
                                  <span style='text-decoration: underline;'>${applicant.cv}</span>
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
        allJobListingsContainer.appendChild(jobElement);
      });
    }

    guardarNuevoPerfil.addEventListener("click", async (event) => {
      updateData = {
        empresa: document.getElementById("companyTitle").value.trim(),
        descripcion: document.getElementById("companyDescripcion").value.trim(),
        nombre: document.getElementById("companyAdminName").value.trim(),
        email: document.getElementById("companyEmail").value.trim(),
        telefono: document.getElementById("companyPhone").value.trim(),
      };

      if (document.getElementById("companyPassword").value.trim()) {
        updateData.contrasena = document.getElementById("companyPassword").value.trim();
      }

      try {
        await updateUser(loggedUserID, updateData);
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error updating job listing:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar la oferta de trabajo. Por favor, inténtelo nuevamente.",
        });
      }
    });

    // Event listener for edit button
    document.addEventListener("click", async (event) => {
      if (event.target.closest("#editJobButton")) {
        selectedJobID = event.target.closest("#editJobButton").dataset.jobId;

        const jobToEdit = await getJobOfferById(selectedJobID);

        // Populate input fields with job data
        document.getElementById("jobTitle").value = jobToEdit.titulo || "";
        document.getElementById("jobLocation").value = jobToEdit.ubicacion || "";
        document.getElementById("employmentType").value = jobToEdit.tipo || "";
        document.getElementById("jobModality").value = jobToEdit.modalidad || "";
        document.getElementById("jobArea").value = jobToEdit.area || "";
        document.getElementById("salary").value = jobToEdit.salario || "";
        document.getElementById("expiryDate").value = jobToEdit.fechaExpiracion
          ? new Date(jobToEdit.fechaExpiracion).toISOString().split("T")[0]
          : "";
      }
      if (event.target.closest("#deleteJobButton")) {
        selectedJobID = event.target.closest("#deleteJobButton").dataset.jobId;
      }
    });

    // Event listener for making a new listing
    document.getElementById("createNewListing").addEventListener("click", async () => {
      // Gather data from input fields
      const newJobData = {
        id_empresa: loggedUserID,
        empresa: employer.empresa,
        titulo: document.getElementById("newJobTitle").value.trim(),
        ubicacion: document.getElementById("newJobLocation").value,
        tipo: document.getElementById("newEmploymentType").value,
        modalidad: document.getElementById("newJobModality").value,
        area: document.getElementById("newJobArea").value,
        salario: String(document.getElementById("newSalary").value),
        fechaExpiracion: document.getElementById("newExpireDate").value
          ? new Date(document.getElementById("newExpireDate").value).toISOString()
          : null,
      };

      try {
        await createJobOffer(newJobData);
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error updating job listing:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar la oferta de trabajo. Por favor, inténtelo nuevamente.",
        });
      }
    });

    // Event listener for saving changes to job listing
    document.getElementById("editListingInfo").addEventListener("click", async () => {
      if (!selectedJobID) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se ha seleccionado una oferta de trabajo.",
        });
        return;
      }

      // Gather data from input fields
      const updatedData = {
        titulo: document.getElementById("jobTitle").value.trim(),
        ubicacion: document.getElementById("jobLocation").value,
        tipo: document.getElementById("employmentType").value,
        modalidad: document.getElementById("jobModality").value,
        area: document.getElementById("jobArea").value,
        salario: String(document.getElementById("salary").value),
        fechaExpiracion: document.getElementById("expiryDate").value
          ? new Date(document.getElementById("expiryDate").value).toISOString()
          : null,
      };

      try {
        await updateJobOffer(selectedJobID, updatedData);
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error updating job listing:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar la oferta de trabajo. Por favor, inténtelo nuevamente.",
        });
      }
    });

    // Event listener for deleting a job listing
    document.getElementById("confirmDeletion").addEventListener("click", async () => {
      if (!selectedJobID) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se ha seleccionado una oferta de trabajo.",
        });
        return;
      }

      try {
        await deleteJobOffer(selectedJobID);
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error updating job listing:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar la oferta de trabajo. Por favor, inténtelo nuevamente.",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching employer or job information:", error);
  }

  document.getElementById("newSalary").addEventListener("input", function (e) {
    let value = e.target.value;

    // Eliminar todo excepto números
    value = value.replace(/[^0-9]/g, "");

    // Insertar puntos cada tres dígitos
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Prepend the ₡ symbol
    if (value.length > 0) {
      value = "₡" + value;
    }

    e.target.value = value;
  });

  document.getElementById("salary").addEventListener("input", function (e) {
    let value = e.target.value;

    // Eliminar todo excepto números
    value = value.replace(/[^0-9]/g, "");

    // Insertar puntos cada tres dígitos
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Prepend the ₡ symbol
    if (value.length > 0) {
      value = "₡" + value;
    }

    e.target.value = value;
  });
});
