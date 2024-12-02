class Admin extends Usuario {
  constructor(id, nombre, email) {
    super(id, nombre, email, "admin");
  }

  gestionarUsuario(usuario) {
    // lógica para editar o eliminar un usuario
  }

  moderarOfertaTrabajo(ofertaTrabajo) {
    // lógica para moderar publicaciones
  }
}
