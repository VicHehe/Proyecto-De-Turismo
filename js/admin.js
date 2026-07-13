// ============ VERIFICAR SESIÓN ============
function verificarSesion() {
    const usuarioStr = sessionStorage.getItem('cc_sesion');
    if (!usuarioStr) {
        window.location.href = '../login.html';
        return null;
    }
    
    const usuario = JSON.parse(usuarioStr);
    if (usuario.rol !== 'admin') {
        alert('Acceso denegado. Solo administradores.');
        window.location.href = '../login.html';
        return null;
    }
    
    return usuario;
}

// ============ CARGAR USUARIOS (desde GitHub) ============
async function cargarUsuarios() {
    try {
        const datos = await GitHub.leer('datos/usuarios.json');
        if (!datos) {
            // Si no existe, crear datos iniciales
            const inicial = {
                usuarios: [
                    {
                        rut: "22785939-3",
                        nombre: "Victor Tilleria",
                        rol: "admin",
                        password: "Devictor.",
                        fechaRegistro: "2026-07-13T00:00:00.000Z"
                    }
                ],
                ruts_autorizados: [
                    {
                        rut: "22785939-3",
                        rol: "admin",
                        nombre: "VictorTilleria"
                    }
                ]
            };
            await GitHub.escribir('datos/usuarios.json', inicial);
            return inicial.usuarios;
        }
        return datos.usuarios || [];
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al cargar usuarios', 'error');
        return [];
    }
}

// ============ GUARDAR USUARIOS (en GitHub) ============
async function guardarUsuarios(usuarios) {
    try {
        // Obtener datos completos para preservar ruts_autorizados
        const datos = await GitHub.leer('datos/usuarios.json');
        if (!datos) return false;
        
        datos.usuarios = usuarios;
        const sha = await GitHub.sha('datos/usuarios.json');
        return await GitHub.escribir('datos/usuarios.json', datos, sha);
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al guardar cambios', 'error');
        return false;
    }
}

// ============ RENDERIZAR LISTA ============
function renderizarUsuarios(usuarios) {
    const lista = document.getElementById('listaUsuarios');
    
    if (!usuarios || usuarios.length === 0) {
        lista.innerHTML = '<li>No hay usuarios registrados</li>';
        document.getElementById('userCount').textContent = '0 usuarios';
        return;
    }
    
    document.getElementById('userCount').textContent = `${usuarios.length} usuarios`;
    
    lista.innerHTML = usuarios.map(usuario => `
        <li>
            <div class="user-info">
                <strong>${usuario.nombre}</strong>
                <span>${usuario.rut}</span>
                <span class="rol-badge">${usuario.rol}</span>
                <span>${usuario.fechaRegistro ? new Date(usuario.fechaRegistro).toLocaleDateString() : '—'}</span>
            </div>
            <div class="user-actions">
                ${usuario.rut !== '22785939-3' ? `
                    <button class="btn btn-small" onclick="cambiarRol('${usuario.rut}', 'admin')">Hacer Admin</button>
                    <button class="btn btn-small" onclick="cambiarRol('${usuario.rut}', 'estudiante')">Hacer Estudiante</button>
                    <button class="btn btn-small btn-danger" onclick="eliminarUsuario('${usuario.rut}')">Eliminar</button>
                ` : `
                    <span style="font-weight: bold;">🔒 Admin Principal</span>
                `}
            </div>
        </li>
    `).join('');
}

// ============ CAMBIAR ROL ============
async function cambiarRol(rut, nuevoRol) {
    if (!confirm(`¿Cambiar rol de ${rut} a "${nuevoRol}"?`)) return;
    
    const usuarios = await cargarUsuarios();
    const usuario = usuarios.find(u => u.rut === rut);
    
    if (!usuario) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return;
    }
    
    if (rut === '22785939-3' && nuevoRol !== 'admin') {
        mostrarMensaje('No se puede cambiar el rol del admin principal', 'error');
        return;
    }
    
    usuario.rol = nuevoRol;
    
    if (await guardarUsuarios(usuarios)) {
        mostrarMensaje(`Rol de ${usuario.nombre} cambiado a ${nuevoRol}`, 'exito');
        await actualizarLista();
    }
}

// ============ ELIMINAR USUARIO ============
async function eliminarUsuario(rut) {
    if (!confirm(`¿Eliminar al usuario ${rut}?`)) return;
    
    if (rut === '22785939-3') {
        mostrarMensaje('No se puede eliminar al admin principal', 'error');
        return;
    }
    
    const usuarios = await cargarUsuarios();
    const index = usuarios.findIndex(u => u.rut === rut);
    
    if (index === -1) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return;
    }
    
    usuarios.splice(index, 1);
    
    if (await guardarUsuarios(usuarios)) {
        mostrarMensaje('Usuario eliminado correctamente', 'exito');
        await actualizarLista();
    }
}

// ============ ACTUALIZAR LISTA ============
async function actualizarLista() {
    const usuarios = await cargarUsuarios();
    renderizarUsuarios(usuarios);
}

// ============ BUSCAR USUARIO ============
async function buscarUsuario() {
    const busqueda = document.getElementById('buscarUsuario').value.trim();
    if (!busqueda) {
        await actualizarLista();
        return;
    }
    
    const usuarios = await cargarUsuarios();
    const filtrados = usuarios.filter(u => 
        u.rut.includes(busqueda) || 
        (u.nombre && u.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    );
    
    renderizarUsuarios(filtrados);
}

// ============ MOSTRAR MENSAJE ============
function mostrarMensaje(texto, tipo = 'info') {
    const mensajeDiv = document.getElementById('dashboardMensaje');
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
        
        setTimeout(() => {
            mensajeDiv.classList.add('hidden');
        }, 3000);
    }
}

// ============ CERRAR SESIÓN ============
function cerrarSesion() {
    sessionStorage.removeItem('cc_sesion');
    window.location.href = '../login.html';
}

// ============ EVENTOS ============
document.addEventListener('DOMContentLoaded', function() {
    const usuario = verificarSesion();
    if (!usuario) return;
    
    actualizarLista();
    
    document.getElementById('btnCerrarSesion').addEventListener('click', cerrarSesion);
    document.getElementById('btnBuscar').addEventListener('click', buscarUsuario);
    document.getElementById('buscarUsuario').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarUsuario();
        }
    });
});

// ============ EXPORTAR PARA USO EN HTML ============
window.cambiarRol = cambiarRol;
window.eliminarUsuario = eliminarUsuario;
