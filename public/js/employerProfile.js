let employer = null;

document.addEventListener("DOMContentLoaded", async () => {
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
      employerJobs.forEach((job) => {
        const jobElement = document.createElement("div");
        jobElement.classList.add("job-listing", "mb-4");

        jobElement.innerHTML = `
          <div class="row">
            <div class="col-md-2 d-flex align-items-center">
              <img
                src="imagenes/job-placeholder.png"
                alt="Job Picture"
                class="img-fluid"
                id="jobImage"
              />
            </div>
            <div class="col-md-8">
              <p class="fw-bold job-name">
                <span id="jobTitle">${job.titulo || "Nombre Puesto"}</span>
              </p>
              <p>
                <span id="companyName">${
                  job.empresa || "Nombre Empresa"
                }</span> (<span id="employmentType"
                  >${job.tipo || "Tipo de Empleo"}</span
                >)
                <br />
                <span id="jobLocation">${
                  job.ubicacion || "Ubicación"
                }</span> (<span id="jobModality">${job.modalidad || "Modalidad"}</span>)
                <br />
                <span id="jobArea">${job.area || "Área de Interés"}</span> (<span id="jobSalary"
                  >${job.salario || "Pretensión Salarial"}</span
                >)
              </p>
            </div>

            <div class="col-md-2 d-flex align-items-start justify-content-end">
              <button
                class="icon-button me-3"
                data-bs-toggle="modal"
                data-bs-target="#editJobListing"
                id="editJobButton"
                data-job-id="${job._id}"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
              <button
                class="icon-button delete-icon"
                data-bs-toggle="modal"
                data-bs-target="#deleteJobListing"
                id="deleteJobButton"
                data-job-id="${job._id}"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-auto ms-auto">Hasta: <span id="jobExpiration">${
              job.fechaExpiracion
                ? new Date(job.fechaExpiracion).toLocaleDateString()
                : "DD/MM/YYYY"
            }</span></div>
          </div>
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
        password: document.getElementById("companyPassword").value.trim(),
      };

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
        titulo: document.getElementById("newJobTitle").value.trim(),
        ubicacion: document.getElementById("newJobLocation").value,
        tipo: document.getElementById("newEmploymentType").value,
        modalidad: document.getElementById("newJobModality").value,
        area: document.getElementById("newJobArea").value,
        salario: parseFloat(document.getElementById("newSalary").value),
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
        salario: parseFloat(document.getElementById("salary").value),
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
});
