class Usuario {
  constructor(id, nombre, email, rol) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.rol = rol;
  }

  // Métodos comunes a todos los usuarios
  iniciarSesion() {
    // lógica para iniciar sesión
  }

  cerrarSesion() {
    // lógica para cerrar sesión
  }

  actualizarPerfil(nuevosDatos) {
    // lógica para actualizar datos del perfil
  }
}
