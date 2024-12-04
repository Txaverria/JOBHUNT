class Usuario {
  constructor(nombre, email, tipo, telefono, contrasena) {
    this.nombre = nombre;
    this.email = email;
    this.tipo = tipo;
    this.telefono = telefono;
    this.contrasena = contrasena;
  }

  iniciarSesion() {
    console.log(`${this.nombre} ha iniciado sesión.`);
  }

  cerrarSesion() {
    console.log(`${this.nombre} ha cerrado sesión.`);
  }
}

class Admin extends Usuario {
  constructor(nombre, email, telefono, contrasena) {
    super(nombre, email, "admin", telefono, contrasena);
  }

  gestionarUsuarios() {
    console.log("Gestionando usuarios...");
  }
}

class Empresa extends Usuario {
  constructor(nombre, email, telefono, contrasena, empresa, descripcion) {
    super(nombre, email, "empresa", telefono, contrasena);
    this.empresa = empresa;
    this.descripcion = descripcion;
  }

  publicarOferta(oferta) {
    this.ofertasDeTrabajo.push(oferta);
    console.log("Oferta publicada:", oferta);
  }
}

class Solicitante extends Usuario {
  constructor(nombre, email, telefono, contrasena, cv) {
    super(nombre, email, "usuario", telefono, contrasena);
    this.cv = cv;
  }

  postularTrabajo(oferta) {
    this.aplicaciones.push(oferta);
    console.log(`${this.nombre} se postuló al trabajo: ${oferta.titulo}`);
  }
}

class OfertaLaboral {
  constructor(
    id,
    titulo,
    ubicacion,
    tipo,
    modalidad,
    area,
    salario,
    fechaExpiracion,
    id_empresa,
    empresa,
    solicitantes = []
  ) {
    this.titulo = titulo;
    this.ubicacion = ubicacion;
    this.tipo = tipo;
    this.modalidad = modalidad;
    this.area = area;
    this.salario = salario;
    this.fechaExpiracion = new Date(fechaExpiracion);
    this.empresa = empresa;
    this.solicitantes = solicitantes;
  }

  agregarSolicitante(solicitante) {
    this.solicitantes.push(solicitante);
    console.log("Solicitante agregado:", solicitante);
  }
}