// ============ BASE DE DATOS SIMULADA ============
// En producción, esto se leería de db.json con fetch()
let db = {
    usuarios: []
};

// Cargar datos desde db.json
async function cargarDB() {
    try {
        const response = await fetch('../data/db.json');
        if (!response.ok) throw new Error('Error al cargar la base de datos');
        db = await response.json();
        return db;
    } catch (error) {
        console.error('Error cargando DB:', error);
        // Datos de respaldo si falla la carga
        db = {
            usuarios: [
                {
                    rut: "12345678-9",
                    nombre: "Admin",
                    apellido: "Sistema",
                    edad: 30,
                    telefono: "912345678",
                    gmail: "admin@turismo.cl",
                    historial: "Ninguno",
                    password: "admin123",
                    rol: "admin"
                }
            ]
        };
        return db;
    }
}

// Guardar datos en db.json
async function guardarDB() {
    try {
        const response = await fetch('../data/db.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(db)
        });
        if (!response.ok) throw new Error('Error al guardar la base de datos');
        return true;
    } catch (error) {
        console.error('Error guardando DB:', error);
        mostrarMensaje('Error al guardar los datos', 'error');
        return false;
    }
}

// ============ FUNCIONES DE LOGIN ============
async function iniciarSesion(rut, password) {
    await cargarDB();
    
    const usuario = db.usuarios.find(u => u.rut === rut);
    
    if (!usuario) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return null;
    }
    
    if (usuario.password !== password) {
        mostrarMensaje('Contraseña incorrecta', 'error');
        return null;
    }
    
    // Guardar sesión
    sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));
    
    // Redirigir según rol
    if (usuario.rol === 'admin') {
        window.location.href = 'pages/dashboard.html';
    } else {
        // Redirigir al index (lo hará Sebastián)
        window.location.href = '../index.html';
    }
    
    return usuario;
}

// ============ FUNCIONES DE REGISTRO ============
async function registrarUsuario(datos) {
    await cargarDB();
    
    // Validar que todos los campos estén llenos
    for (let key in datos) {
        if (!datos[key] || datos[key].trim() === '') {
            mostrarMensaje('Todos los campos son obligatorios', 'error');
            return false;
        }
    }
    
    // Validar que el RUT no exista
    if (db.usuarios.find(u => u.rut === datos.rut)) {
        mostrarMensaje('Este RUT ya está registrado', 'error');
        return false;
    }
    
    // Crear nuevo usuario (siempre como estudiante)
    const nuevoUsuario = {
        rut: datos.rut,
        nombre: datos.nombre,
        apellido: datos.apellido,
        edad: parseInt(datos.edad),
        telefono: datos.telefono,
        gmail: datos.gmail,
        historial: datos.historial,
        password: datos.password,
        rol: 'estudiante'  // Siempre estudiante, solo admins manuales
    };
    
    db.usuarios.push(nuevoUsuario);
    
    if (await guardarDB()) {
        mostrarMensaje('Registro exitoso. Ahora puedes iniciar sesión.', 'exito');
        return true;
    }
    return false;
}

// ============ FUNCIONES DE ADMIN ============
async function obtenerTodosUsuarios() {
    await cargarDB();
    return db.usuarios;
}

async function cambiarRolUsuario(rut, nuevoRol) {
    await cargarDB();
    
    const usuario = db.usuarios.find(u => u.rut === rut);
    if (!usuario) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return false;
    }
    
    // No permitir cambiar el rol del admin principal
    if (usuario.rut === '12345678-9' && nuevoRol !== 'admin') {
        mostrarMensaje('No se puede cambiar el rol del administrador principal', 'error');
        return false;
    }
    
    usuario.rol = nuevoRol;
    
    if (await guardarDB()) {
        mostrarMensaje(`Rol cambiado a ${nuevoRol}`, 'exito');
        return true;
    }
    return false;
}

async function eliminarUsuario(rut) {
    await cargarDB();
    
    // No permitir eliminar al admin principal
    if (rut === '12345678-9') {
        mostrarMensaje('No se puede eliminar al administrador principal', 'error');
        return false;
    }
    
    const index = db.usuarios.findIndex(u => u.rut === rut);
    if (index === -1) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return false;
    }
    
    db.usuarios.splice(index, 1);
    
    if (await guardarDB()) {
        mostrarMensaje('Usuario eliminado', 'exito');
        return true;
    }
    return false;
}

// ============ FUNCIONES DE UTILIDAD ============
function mostrarMensaje(texto, tipo = 'info') {
    const mensajeDiv = document.getElementById('loginMensaje') || document.getElementById('registroMensaje');
    if (mensajeDiv) {
        mensajeDiv.textContent = texto;
        mensajeDiv.className = 'mensaje';
        if (tipo === 'error') {
            mensajeDiv.style.borderColor = '#000';
            mensajeDiv.style.background = '#ffebeb';
        } else if (tipo === 'exito') {
            mensajeDiv.style.borderColor = '#000';
            mensajeDiv.style.background = '#ebffeb';
        }
        mensajeDiv.classList.remove('hidden');
    }
}

function limpiarMensajes() {
    document.querySelectorAll('.mensaje').forEach(el => {
        el.classList.add('hidden');
    });
}

// ============ EVENTOS ============
document.addEventListener('DOMContentLoaded', function() {
    // Login
    document.getElementById('btnLogin').addEventListener('click', async function() {
        const rut = document.getElementById('loginRut').value.trim();
        const password = document.getElementById('loginPass').value.trim();
        
        if (!rut || !password) {
            mostrarMensaje('Por favor completa todos los campos', 'error');
            return;
        }
        
        await iniciarSesion(rut, password);
    });
    
    // Mostrar registro
    document.getElementById('btnMostrarRegistro').addEventListener('click', function() {
        document.getElementById('vistaLogin').classList.add('hidden');
        document.getElementById('vistaRegistro').classList.remove('hidden');
        limpiarMensajes();
    });
    
    // Volver al login
    document.getElementById('btnVolverLogin').addEventListener('click', function() {
        document.getElementById('vistaRegistro').classList.add('hidden');
        document.getElementById('vistaLogin').classList.remove('hidden');
        limpiarMensajes();
    });
    
    // Registrar
    document.getElementById('btnRegistrar').addEventListener('click', async function() {
        const datos = {
            nombre: document.getElementById('regNombre').value.trim(),
            apellido: document.getElementById('regApellido').value.trim(),
            edad: document.getElementById('regEdad').value.trim(),
            rut: document.getElementById('regRut').value.trim(),
            telefono: document.getElementById('regTelefono').value.trim(),
            gmail: document.getElementById('regGmail').value.trim(),
            historial: document.getElementById('regHistorial').value.trim(),
            password: document.getElementById('regPassword').value.trim()
        };
        
        if (await registrarUsuario(datos)) {
            // Limpiar formulario
            document.querySelectorAll('#vistaRegistro input').forEach(input => input.value = '');
            // Volver al login después de 2 segundos
            setTimeout(() => {
                document.getElementById('btnVolverLogin').click();
            }, 2000);
        }
    });
    
    // Enter en login
    document.getElementById('loginPass').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('btnLogin').click();
        }
    });
    
    // Enter en registro
    document.getElementById('regPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('btnRegistrar').click();
        }
    });
});
