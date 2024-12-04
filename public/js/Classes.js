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

class Empleador extends Usuario {
  constructor(id, nombre, email, nombreEmpresa) {
    super(id, nombre, email, "empleador");
    this.nombreEmpresa = nombreEmpresa;
    this.ofertasDeTrabajo = []; // la lista de sus trabajos publicados
  }

  publicarOferta(ofertaTrabajo) {
    this.ofertasDeTrabajo.push(ofertaTrabajo);
  }

  revisarSolicitantes(ofertaTrabajo) {
    return this.ofertasDeTrabajo;
  }
}

class Solicitante extends Usuario {
  constructor(id, nombre, email, curriculum) {
    super(id, nombre, email, "solicitante");
    this.curriculum = curriculum; // info del CV
    this.aplicaciones = []; // lista de aplicaciones a trabajos
  }

  subirCurriculum(nuevoCurriculum) {
    this.curriculum = nuevoCurriculum;
  }

  postularTrabajo(ofertaTrabajo) {
    this.aplicaciones.push(ofertaTrabajo);
  }
}

class OfertaLaboral {
  constructor(
    id,
    titulo,
    descripcion,
    salario,
    ubicacion,
    tipo,
    modalidad,
    fechaPublicacion,
    fechaExpiracion
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.salario = salario;
    this.ubicacion = ubicacion;
    this.tipo = tipo; // 'tiempo completo', 'medio tiempo', etc.
    this.modalidad = modalidad; // 'híbrido', 'presencial'
    this.fechaPublicacion = fechaPublicacion;
    this.fechaExpiracion = fechaExpiracion;
    this.solicitantes = []; // Las personas aplicando al trabajo/oferta
  }

  agregarSolicitante(solicitante) {
    this.solicitantes.push(solicitante);
  }

  renovarTrabajo(nuevaFechaExpiracion) {
    this.fechaExpiracion = nuevaFechaExpiracion;
  }
}