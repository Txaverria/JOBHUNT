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
