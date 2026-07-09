// ============ VERIFICAR SESIÓN ============
function verificarSesion() {
    const usuarioStr = sessionStorage.getItem('usuarioActual');
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

// ============ CARGAR USUARIOS ============
async function cargarUsuarios() {
    try {
        const response = await fetch('../data/db.json');
        if (!response.ok) throw new Error('Error al cargar usuarios');
        const db = await response.json();
        return db.usuarios || [];
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al cargar usuarios', 'error');
        return [];
    }
}

// ============ GUARDAR USUARIOS ============
async function guardarUsuarios(usuarios) {
    try {
        const db = { usuarios: usuarios };
        const response = await fetch('../data/db.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(db)
        });
        if (!response.ok) throw new Error('Error al guardar');
        return true;
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
                <strong>${usuario.nombre} ${usuario.apellido}</strong>
                <span>${usuario.rut}</span>
                <span class="rol-badge">${usuario.rol}</span>
                <span>${usuario.gmail}</span>
                <span>${usuario.telefono}</span>
            </div>
            <div class="user-actions">
                ${usuario.rut !== '12345678-9' ? `
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
    
    if (rut === '12345678-9' && nuevoRol !== 'admin') {
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
    
    if (rut === '12345678-9') {
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
        u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.apellido.toLowerCase().includes(busqueda.toLowerCase())
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
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            mensajeDiv.classList.add('hidden');
        }, 3000);
    }
}

// ============ CERRAR SESIÓN ============
function cerrarSesion() {
    sessionStorage.removeItem('usuarioActual');
    window.location.href = '../login.html';
}

// ============ EVENTOS ============
document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión
    const usuario = verificarSesion();
    if (!usuario) return;
    
    // Cargar usuarios
    actualizarLista();
    
    // Eventos
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
