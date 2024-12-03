let loggedUserID;
let user;

const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("fileInput");
const inputCV = document.getElementById("inputCV");

// Trigger the file input click when the button is clicked
uploadButton.addEventListener("click", () => {
  fileInput.click();
});

// Handle file selection
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileName = file.name; // Get the file name
    inputCV.textContent = fileName; // Display the file name
    inputCV.style.display = "block"; // Make the div visible
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const jobListingContainer = document.querySelector("#job-listings");
  loggedUserID = sessionStorage.getItem("userID");

  user = await getUserById(loggedUserID);

  document.getElementById("inputEmail").value = user.email;
  document.getElementById("inputPhone").value = user.telefono;

  if (user.cv) {
    inputCV.style.display = "block";
    inputCV.textContent = user.cv;
  }

  let allJobOffers = [];

  // Fetch and display job offers
  const fetchAndRenderJobs = async () => {
    try {
      // Fetch all job offers
      allJobOffers = await getAllJobOffers();

      // Render job offers initially
      renderJobOffers(allJobOffers);
    } catch (error) {
      console.error("Error rendering job offers:", error);
      jobListingContainer.innerHTML = `
        <p class="text-center text-danger mt-4">Error cargando ofertas de trabajo. Por favor, inténtalo de nuevo más tarde.</p>
      `;
    }
  };

  // Function to render job offers
  const renderJobOffers = (jobOffers) => {
    // Clear the container
    jobListingContainer.innerHTML = "";

    // Check if there are job offers
    if (jobOffers.length === 0) {
      jobListingContainer.innerHTML = `
        <p class="text-center text-muted mt-4">No hay ofertas de trabajo disponibles.</p>
      `;
      return;
    }

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
            <p class="m-0">${job.company || "Nombre Empresa"} (${job.tipo || "Tipo de Empleo"})</p>
            <p class="m-0">${job.ubicacion || "Ubicación"} (${job.modalidad || "Modalidad"})</p>
            <p class="">${job.area || "Área de Interés"} (${
        job.salario || "Pretensión Salarial"
      })</p>
            <button
              class="btn btn-dark requestJob"
              data-id="${job._id}"
            >
              Solicitar
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-auto ms-auto text-muted">Hasta: ${
            job.fechaExpiracion
              ? new Date(job.fechaExpiracion).toLocaleDateString("es-ES", { timeZone: "UTC" })
              : "DD/MM/YYYY"
          }</div>
        </div>
      `;

      jobListingContainer.appendChild(jobElement);
    });
  };

  // Filter jobs based on the selected criteria
  const filterJobs = () => {
    const searchValue = document.querySelector("#filter-search").value.trim().toLowerCase();
    const locationValue = document.querySelector("#filter-location").value;
    const typeValue = document.querySelector("#filter-type").value;
    const modalityValue = document.querySelector("#filter-modalidad").value;
    const salaryValue = document.querySelector("#filter-salary").value;
    const areaValue = document.querySelector("#filter-area").value;

    console.log(salaryValue);

    const filteredJobs = allJobOffers.filter((job) => {
      // Apply search filter
      const matchesSearch = !searchValue || job.titulo?.toLowerCase().includes(searchValue);

      // Apply location filter
      const matchesLocation = locationValue === "Cualquiera" || job.ubicacion === locationValue;

      // Apply type filter
      const matchesType = typeValue === "Cualquiera" || job.tipo === typeValue;

      // Apply modality filter
      const matchesModality = modalityValue === "Cualquiera" || job.modalidad === modalityValue;

      // Apply salary filter
      const matchesSalary =
        salaryValue === "Cualquiera" ||
        (job.salario &&
          (() => {
            // Extract the numeric value from the salary string
            const numericSalary = parseInt(job.salario.replace(/[₡.,]/g, ""), 10);

            // Perform comparisons based on salaryValue
            return (
              (salaryValue === "minimo" && numericSalary <= 750000) ||
              (salaryValue === "medio" && numericSalary > 750000 && numericSalary <= 1500000) ||
              (salaryValue === "mayor" && numericSalary > 1500000)
            );
          })());

      // Apply area filter
      const matchesArea = areaValue === "Cualquiera" || job.area === areaValue;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesModality &&
        matchesSalary &&
        matchesArea
      );
    });

    renderJobOffers(filteredJobs);
  };

  const deleteFilters = () => {
    document.querySelector("#filter-search").value = "";
    document.querySelector("#filter-location").value = "Cualquiera";
    document.querySelector("#filter-type").value = "Cualquiera";
    document.querySelector("#filter-modalidad").value = "Cualquiera";
    document.querySelector("#filter-salary").value = "Cualquiera";
    document.querySelector("#filter-area").value = "Cualquiera";

    filterJobs();
  };

  // Attach event listeners to filters
  document.querySelector("#filter-search").addEventListener("input", filterJobs);
  document.querySelector("#filter-location").addEventListener("change", filterJobs);
  document.querySelector("#filter-type").addEventListener("change", filterJobs);
  document.querySelector("#filter-modalidad").addEventListener("change", filterJobs);
  document.querySelector("#filter-salary").addEventListener("change", filterJobs);
  document.querySelector("#filter-area").addEventListener("change", filterJobs);

  document.querySelector("#delete-filters").addEventListener("click", deleteFilters);

  // Fetch and render jobs on load
  await fetchAndRenderJobs();
});

document.getElementById("inputSalary").addEventListener("input", function (e) {
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

// Variables to store job ID and applicant data
let selectedJob = null;
let applicantData = {};

// Event listener for when "Solicitar" is clicked
// Event listener for when "Solicitar" is clicked
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("requestJob") && event.target.dataset.id) {
    try {
      // Fetch the selected job offer
      selectedJob = await getJobOfferById(event.target.dataset.id);

      // Check if the user has already applied for the job
      if (selectedJob.solicitantes) {
        const alreadyApplied = selectedJob.solicitantes.some(
          (applicant) => applicant.applicantId === loggedUserID
        );

        if (alreadyApplied) {
          // Show a SweetAlert if the user has already applied
          Swal.fire({
            icon: "warning",
            title: "Ya Aplicaste",
            text: "Ya has enviado tu solicitud para este puesto.",
            showConfirmButton: true,
          });
          return; // Exit the function without opening the modal
        }
      }

      // Populate modal placeholders with job and user data
      document.getElementById("userNamePlaceholder").innerText =
        user.nombre || "Nombre no disponible";
      document.getElementById("jobNamePlaceholder").innerText =
        selectedJob.titulo || "Puesto no disponible";

      // Show the contactModal
      const contactModal = new bootstrap.Modal(document.getElementById("contactModal"));
      contactModal.show();
    } catch (error) {
      console.error("Error fetching job offer:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al cargar los detalles del puesto.",
      });
    }
  }
});

// Event listener for when "Siguiente" is clicked in the contactModal
document.getElementById("review-job-application").addEventListener("click", async (event) => {
  // Prevent modal transition
  event.preventDefault();

  // Collect user input

  document.getElementById("inputPhone").addEventListener("input", function (e) {
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

  const inputEmail = document.getElementById("inputEmail").value.trim();
  const inputPhone = document.getElementById("inputPhone").value.trim();
  const inputSalary = document.getElementById("inputSalary").value.trim();
  const newCV = document.getElementById("inputCV").textContent.trim();

  // Validate input (check if any field is empty)
  if (!inputEmail || !inputPhone || !inputSalary) {
    Swal.fire({
      icon: "warning",
      title: "Atención",
      text: "Por favor completa todos los campos antes de continuar.",
      showConfirmButton: true,
    });
    return; // Stop execution if validation fails
  }

  // Save data for review
  applicantData = {
    applicantId: loggedUserID,
    email: inputEmail,
    phone: inputPhone,
    salaryExpectation: inputSalary,
    cv: newCV, // Placeholder for CV
  };

  // Populate the reviewModal with the applicant's data
  document.getElementById("reviewEmail").textContent = inputEmail;
  document.getElementById("reviewPhone").textContent = inputPhone;
  document.getElementById("reviewSalary").textContent = inputSalary;
  document.getElementById("cvPreview").textContent = newCV;

  // Hide the current modal (contactModal)
  const contactModal = bootstrap.Modal.getInstance(document.getElementById("contactModal"));
  contactModal.hide();

  // Show the review modal
  const reviewModal = new bootstrap.Modal(document.getElementById("reviewModal"));
  reviewModal.show();
});

// Event listener for when "Enviar Solicitud" is clicked in the reviewModal
document.getElementById("send-job-application").addEventListener("click", async () => {
  if (!selectedJob) {
    return;
  }

  try {
    // Ensure applicantData is populated
    if (!applicantData.email || !applicantData.phone || !applicantData.salaryExpectation) {
      throw new Error("Datos del solicitante incompletos.");
    }

    // Prepare data for updating the job offer
    const updatedData = {
      $push: {
        solicitantes: applicantData,
      },
    };

    // Update the job offer in the backend
    const response = await updateJobOffer(selectedJob._id, updatedData);

    console.log("Updated Job Offer:", response);
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    alert("Hubo un problema al enviar la solicitud. Por favor, inténtalo nuevamente.");
  }
});
