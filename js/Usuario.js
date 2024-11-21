// Clase base para todos los usuarios
class Usuario {
  constructor(id, nombre, correo, contrasena, fotoPerfil) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.fotoPerfil = fotoPerfil;
  }

  // Métodos comunes a todos los usuarios
  iniciarSesion() {
    // lógica para iniciar sesión
  }

  cerrarSesion() {
    // lógica para cerrar sesión
  }

  actualizarPerfil(nuevosDatos) {
    // Actualizar los datos comunes (nombre, correo, contraseña, fotoPerfil)
    this.nombre = nuevosDatos.nombre || this.nombre;
    this.correo = nuevosDatos.correo || this.correo;
    this.contrasena = nuevosDatos.contrasena || this.contrasena;
    this.fotoPerfil = nuevosDatos.fotoPerfil || this.fotoPerfil;
  }
}

// Subclase para Buscador de Empleo
class BuscadorDeEmpleo extends Usuario {
  constructor(id, nombre, apellido, correo, contrasena, fotoPerfil) {
    super(id, nombre, correo, contrasena, fotoPerfil);
    this.apellido = apellido;
  }

  actualizarPerfil(nuevosDatos) {
    super.actualizarPerfil(nuevosDatos);
    this.apellido = nuevosDatos.apellido || this.apellido;
  }
}

// Subclase para Empleador
class Empleador extends Usuario {
  constructor(id, nombreCompleto, nombreEmpresa, correo, contrasena, fotoPerfil) {
    super(id, nombreCompleto, correo, contrasena, fotoPerfil);
    this.nombreEmpresa = nombreEmpresa;
  }

  actualizarPerfil(nuevosDatos) {
    super.actualizarPerfil(nuevosDatos);
    this.nombreEmpresa = nuevosDatos.nombreEmpresa || this.nombreEmpresa;
  }
}

// Subclase para Administrador
class Administrador extends Usuario {
  constructor(id, nombre, apellido, correo, contrasena, fotoPerfil, codigoAdmin) {
    super(id, nombre, correo, contrasena, fotoPerfil);
    this.apellido = apellido;
    this.codigoAdmin = codigoAdmin || this.generarCodigoAdmin();
  }

  // Método para generar un código único de administrador
  generarCodigoAdmin() {
    return 'ADMIN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  actualizarPerfil(nuevosDatos) {
    super.actualizarPerfil(nuevosDatos);
    this.apellido = nuevosDatos.apellido || this.apellido;
    this.codigoAdmin = nuevosDatos.codigoAdmin || this.codigoAdmin;
  }
}

// Ejemplo de cómo usar las clases
const usuario1 = new BuscadorDeEmpleo(1, 'Juan', 'Pérez', 'juan@correo.com', 'contraseña123', 'fotoPerfil.jpg');
const empleador1 = new Empleador(2, 'Carlos García', 'Tech Corp', 'carlos@empresa.com', 'contrasena456', 'fotoEmpleador.jpg');
const admin1 = new Administrador(3, 'Ana', 'López', 'ana@admin.com', 'adminPass789', 'fotoAdmin.jpg');

// Actualizar el perfil de un usuario
usuario1.actualizarPerfil({ nombre: 'Juan', correo: 'nuevoCorreo@correo.com' });
empleador1.actualizarPerfil({ nombreEmpresa: 'New Tech Corp' });
admin1.actualizarPerfil({ apellido: 'Martínez' });

console.log(usuario1);
console.log(empleador1);
console.log(admin1);
