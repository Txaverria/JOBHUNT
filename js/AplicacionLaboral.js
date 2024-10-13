class AplicacionLaboral {
  constructor(id, solicitante, ofertaLaboral, fechaAplicacion, estado) {
    this.id = id;
    this.solicitante = solicitante; // Objeto Solicitante
    this.ofertaLaboral = ofertaLaboral; // Objeto OfertaLaboral
    this.fechaAplicacion = fechaAplicacion;
    this.estado = estado; // 'pendiente', 'aceptado', 'rechazado'
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
}
