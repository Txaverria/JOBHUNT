document.getElementById("registerButton").addEventListener("click", async () => {
  try {
    // Fetch all users to check for existing emails
    const allUsers = await getAllUsers();
    const existingEmails = allUsers.map((user) => user.email);

    // Collect input values based on the form type
    const isEmployerForm = document.getElementById("nombreCompleto") !== null;

    let newUser;
    let email;

    if (isEmployerForm) {
      // Employer form inputs
      const nombreCompleto = document.getElementById("nombreCompleto").value.trim();
      const nombreEmpresa = document.getElementById("nombreEmpresa").value.trim();
      email = document.getElementById("email").value.trim();
      const contrasena = document.getElementById("password").value.trim();

      // Validate inputs
      if (!nombreCompleto || !nombreEmpresa || !email || !contrasena) {
        Swal.fire({
          icon: "warning",
          title: "Datos incompletos",
          text: "Por favor, completa todos los campos.",
        });
        return;
      }

      // Construct user object for employer
      newUser = {
        nombre: nombreCompleto,
        empresa: nombreEmpresa,
        email,
        contrasena,
        tipo: "empresa",
      };
    } else {
      // User form inputs
      const nombre = document.getElementById("nombre").value.trim();
      const apellidos = document.getElementById("apellidos").value.trim();
      email = document.getElementById("email").value.trim();
      const contrasena = document.getElementById("password").value.trim();
      const telefono = document.getElementById("telefono").value.trim();

      // Validate inputs
      if (!nombre || !apellidos || !email || !contrasena) {
        Swal.fire({
          icon: "warning",
          title: "Datos incompletos",
          text: "Por favor, completa todos los campos.",
        });
        return;
      }

      // Construct user object for individual user
      newUser = {
        nombre: `${nombre} ${apellidos}`,
        email,
        contrasena,
        telefono,
        tipo: "usuario",
      };
    }

    // Check if email already exists
    if (existingEmails.includes(email)) {
      Swal.fire({
        icon: "error",
        title: "Correo ya registrado",
        html: "<p class='text-center'>El correo electrónico ya está en uso. <br> Por favor utiliza otro.</p>",
      });
      return;
    }

    // Attempt to create the user
    await createUser(newUser);

    // Show success message
    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "El usuario fue registrado exitosamente.",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    // Redirect to login.html after 2 seconds
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } catch (error) {
    // Show error message
    Swal.fire({
      icon: "error",
      title: "Error en el registro",
      text: error.message || "Hubo un problema al registrar el usuario.",
    });
  }
});
