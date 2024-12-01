document.getElementById("registerButton").addEventListener("click", async () => {
  // Collect input values
  const nombreCompleto = document.getElementById("nombreCompleto").value.trim();
  const nombreEmpresa = document.getElementById("nombreEmpresa").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate inputs
  if (!nombreCompleto || !nombreEmpresa || !email || !password) {
    Swal.fire({
      icon: "warning",
      title: "Datos incompletos",
      text: "Por favor, completa todos los campos.",
    });
    return;
  }

  // Create user object
  const newUser = {
    nombre: nombreCompleto,
    empresa: nombreEmpresa,
    email,
    password,
  };

  try {
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

    // Redirect to signin.html after 3 seconds
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
