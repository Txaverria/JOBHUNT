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
