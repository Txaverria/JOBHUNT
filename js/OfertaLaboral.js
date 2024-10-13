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
