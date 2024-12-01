document.getElementById("loginButton").addEventListener("click", async () => {
  try {
    // Retrieve input values
    const email = document.getElementById("email").value.trim();
    const contrasena = document.getElementById("password").value.trim();

    // Validate inputs
    if (!email || !contrasena) {
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        text: "Por favor, ingresa tu correo electrónico y contraseña.",
      });
      return;
    }

    // Fetch all users
    const allUsers = await getAllUsers();

    // Check if the user exists and validate credentials
    const user = allUsers.find((u) => u.email === email && u.contrasena === contrasena);

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Credenciales incorrectas",
        text: "El correo electrónico o la contraseña son incorrectos.",
      });
      return;
    }

    // Save user ID to sessionStorage
    sessionStorage.setItem("userID", user._id);

    // Redirect based on user type
    let redirectPage = "usuarioNormalPerfil.html"; // Default for "usuario"
    if (user.tipo === "empresa") redirectPage = "empleador.html";
    else if (user.tipo === "admin") redirectPage = "administrar.html";

    Swal.fire({
      icon: "success",
      title: "Inicio de sesión exitoso",
      text: "Bienvenido/a, redirigiéndote a tu perfil...",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = redirectPage;
    }, 2000);
  } catch (error) {
    // Handle any unexpected errors
    Swal.fire({
      icon: "error",
      title: "Error en el sistema",
      text: error.message || "Hubo un problema al iniciar sesión.",
    });
    console.error("Error during login:", error);
  }
});
