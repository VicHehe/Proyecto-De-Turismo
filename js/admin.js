// ============================================================
// admin.js - Panel de Administración (con mejoras)
// ============================================================

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

// ============ CARGAR USUARIOS ============
async function cargarUsuarios() {
    try {
        const datos = await GitHub.leer('datos/usuarios.json');
        if (!datos) {
            const inicial = {
                usuarios: [{
                    rut: "22785939-3",
                    nombre: "Victor",
                    apellido: "Tilleria",
                    edad: 17,
                    telefono: "+56 9 9011 3844",
                    gmail: "victortilleria116@gmail.com",
                    historial: "Ninguno",
                    password: "03062008",
                    rol: "admin",
                    estado: "activo",
                    fechaRegistro: "2026-07-13T00:00:00.000Z"
                }],
                ruts_autorizados: [{
                    rut: "22785939-3",
                    rol: "admin",
                    nombre: "Victor Tilleria"
                }]
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

// ============ GUARDAR USUARIOS ============
async function guardarUsuarios(usuarios) {
    try {
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

// ============ RENDERIZAR LISTA (TABLA) ============
function renderizarUsuarios(usuarios) {
    const tbody = document.getElementById('cuerpoTabla');
    const contador = document.getElementById('userCount');
    
    if (!usuarios || usuarios.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center">No hay usuarios registrados</td></tr>`;
        contador.textContent = '0 usuarios';
        return;
    }
    
    contador.textContent = `${usuarios.length} usuarios`;
    
    tbody.innerHTML = usuarios.map(usuario => {
        const estadoClass = usuario.estado === 'baneado' ? 'estado-baneado' : 
                           usuario.estado === 'kick' ? 'estado-kick' : 'estado-activo';
        const estadoEmoji = usuario.estado === 'baneado' ? '🚫' : 
                           usuario.estado === 'kick' ? '⏰' : '✅';
        const rolMostrado = usuario.rol === 'visitante' ? 'Estudiante' : 
                           usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1);
        const esAdminPrincipal = usuario.rut === '22785939-3';
        const telefonoMostrar = usuario.telefono || 'No especificado';
        
        return `
        <tr>
            <td><strong>${usuario.nombre} ${usuario.apellido}</strong></td>
            <td>${usuario.rut}</td>
            <td>${rolMostrado}</td>
            <td class="${estadoClass}">${estadoEmoji} ${usuario.estado || 'activo'}</td>
            <td>${usuario.gmail || '—'}</td>
            <td>${telefonoMostrar}</td>
            <td>
                <div class="acciones">
                    ${esAdminPrincipal ? `
                        <span class="admin-badge">🔒 Admin Principal</span>
                    ` : `
                        <select onchange="cambiarRol('${usuario.rut}', this.value)">
                            <option value="admin" ${usuario.rol === 'admin' ? 'selected' : ''}>Admin</option>
                            <option value="guia" ${usuario.rol === 'guia' ? 'selected' : ''}>Guía</option>
                            <option value="estudiante" ${(usuario.rol === 'estudiante' || usuario.rol === 'visitante') ? 'selected' : ''}>Estudiante</option>
                        </select>
                        <select onchange="cambiarEstado('${usuario.rut}', this.value)">
                            <option value="activo" ${usuario.estado === 'activo' ? 'selected' : ''}>✅ Activo</option>
                            <option value="kick" ${usuario.estado === 'kick' ? 'selected' : ''}>⏰ Kick</option>
                            <option value="baneado" ${usuario.estado === 'baneado' ? 'selected' : ''}>🚫 Ban</option>
                        </select>
                        <button class="btn-editar" onclick="abrirEditar('${usuario.rut}')">✏️</button>
                        <button class="btn-danger" onclick="eliminarUsuario('${usuario.rut}')">🗑️</button>
                    `}
                </div>
            </td>
        </tr>
    `}).join('');
}

// ============ ABRIR MODAL DE EDICIÓN ============
async function abrirEditar(rut) {
    const usuarios = await cargarUsuarios();
    const usuario = usuarios.find(u => u.rut === rut);
    if (!usuario) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return;
    }
    
    document.getElementById('editRut').value = usuario.rut;
    document.getElementById('editNombre').value = usuario.nombre || '';
    document.getElementById('editApellido').value = usuario.apellido || '';
    document.getElementById('editEdad').value = usuario.edad || '';
    document.getElementById('editTelefono').value = usuario.telefono ? usuario.telefono.replace(/\s/g, '') : '';
    document.getElementById('editGmail').value = usuario.gmail || '';
    document.getElementById('editHistorial').value = usuario.historial || '';
    
    document.getElementById('modalEditar').style.display = 'flex';
}
window.abrirEditar = abrirEditar;

// ============ CERRAR MODAL ============
function cerrarModal() {
    document.getElementById('modalEditar').style.display = 'none';
}
window.cerrarModal = cerrarModal;

// ============ GUARDAR EDICIÓN DE USUARIO ============
document.getElementById('formEditar').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const rut = document.getElementById('editRut').value;
    const nombre = document.getElementById('editNombre').value.trim();
    const apellido = document.getElementById('editApellido').value.trim();
    const edad = parseInt(document.getElementById('editEdad').value);
    let telefono = document.getElementById('editTelefono').value.trim();
    const gmail = document.getElementById('editGmail').value.trim();
    const historial = document.getElementById('editHistorial').value.trim();
    
    // Validaciones básicas
    if (!nombre || !apellido || !edad || !telefono || !gmail) {
        mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    if (isNaN(edad) || edad < 1 || edad > 120) {
        mostrarMensaje('Edad inválida (1-120)', 'error');
        return;
    }
    
    // Limpiar teléfono
    telefono = telefono.replace(/[\s\-\(\)\+]/g, '');
    if (!/^\d{9,15}$/.test(telefono)) {
        mostrarMensaje('Teléfono inválido (mínimo 9 dígitos)', 'error');
        return;
    }
    
    // Formatear teléfono a +56 9 XXXX XXXX
    let telefonoFormateado;
    if (telefono.length === 9) {
        telefonoFormateado = `+56 9 ${telefono.substring(0,4)} ${telefono.substring(4,8)}${telefono.substring(8)}`;
    } else if (telefono.length === 11 && telefono.startsWith('56')) {
        const sinCodigo = telefono.substring(2);
        telefonoFormateado = `+56 9 ${sinCodigo.substring(0,4)} ${sinCodigo.substring(4,8)}${sinCodigo.substring(8)}`;
    } else if (telefono.length === 10 && telefono.startsWith('9')) {
        telefonoFormateado = `+56 ${telefono.substring(0,4)} ${telefono.substring(4,8)}${telefono.substring(8)}`;
    } else {
        const chunks = telefono.match(/.{1,4}/g);
        telefonoFormateado = chunks.join(' ');
    }
    
    const usuarios = await cargarUsuarios();
    const index = usuarios.findIndex(u => u.rut === rut);
    if (index === -1) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return;
    }
    
    usuarios[index].nombre = nombre;
    usuarios[index].apellido = apellido;
    usuarios[index].edad = edad;
    usuarios[index].telefono = telefonoFormateado;
    usuarios[index].gmail = gmail;
    usuarios[index].historial = historial;
    
    if (await guardarUsuarios(usuarios)) {
        mostrarMensaje(`✅ Usuario ${nombre} ${apellido} actualizado correctamente`, 'exito');
        cerrarModal();
        await actualizarLista();
    } else {
        mostrarMensaje('❌ Error al guardar cambios', 'error');
    }
});

// ============ CAMBIAR ROL ============
async function cambiarRol(rut, nuevoRol) {
    if (!confirm(`¿Cambiar rol de ${rut} a "${nuevoRol}"?`)) return;
    
    const usuarios = await cargarUsuarios();
    const usuario = usuarios.find(u => u.rut === rut);
    if (!usuario) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return;
    }
    if (rut === '22785939-3') {
        mostrarMensaje('No se puede cambiar el rol del admin principal', 'error');
        return;
    }
    usuario.rol = nuevoRol;
    if (await guardarUsuarios(usuarios)) {
        mostrarMensaje(`Rol de ${usuario.nombre} cambiado a ${nuevoRol}`, 'exito');
        await actualizarLista();
    }
}
window.cambiarRol = cambiarRol;

// ============ CAMBIAR ESTADO ============
async function cambiarEstado(rut, nuevoEstado) {
    const mensajes = {
        'activo': '✅ Activar usuario',
        'kick': '⏰ Kicketear usuario (temporal)',
        'baneado': '🚫 Banear usuario (permanente)'
    };
    if (!confirm(`${mensajes[nuevoEstado]}?`)) return;
    
    const usuarios = await cargarUsuarios();
    const usuario = usuarios.find(u => u.rut === rut);
    if (!usuario) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return;
    }
    if (rut === '22785939-3') {
        mostrarMensaje('No se puede cambiar el estado del admin principal', 'error');
        return;
    }
    usuario.estado = nuevoEstado;
    if (await guardarUsuarios(usuarios)) {
        mostrarMensaje(`Estado de ${usuario.nombre} cambiado a ${nuevoEstado}`, 'exito');
        await actualizarLista();
    }
}
window.cambiarEstado = cambiarEstado;

// ============ ELIMINAR USUARIO ============
async function eliminarUsuario(rut) {
    if (!confirm(`¿Eliminar al usuario ${rut}? Esta acción es permanente.`)) return;
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
window.eliminarUsuario = eliminarUsuario;

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
        (u.nombre && u.nombre.toLowerCase().includes(busqueda.toLowerCase())) ||
        (u.apellido && u.apellido.toLowerCase().includes(busqueda.toLowerCase()))
    );
    renderizarUsuarios(filtrados);
}
window.buscarUsuario = buscarUsuario;

// ============ EXPORTAR A EXCEL ============
async function exportarExcel() {
    try {
        const usuarios = await cargarUsuarios();
        if (!usuarios || usuarios.length === 0) {
            mostrarMensaje('No hay usuarios para exportar', 'error');
            return;
        }
        
        // Crear CSV
        let csv = 'RUT,Nombre,Apellido,Edad,Teléfono,Gmail,Historial Médico,Rol,Estado,Fecha Registro\n';
        usuarios.forEach(u => {
            const fila = [
                u.rut || '',
                u.nombre || '',
                u.apellido || '',
                u.edad || '',
                u.telefono || '',
                u.gmail || '',
                (u.historial || '').replace(/,/g, ';'), // Reemplazar comas para no romper CSV
                u.rol || '',
                u.estado || '',
                u.fechaRegistro || ''
            ];
            csv += fila.join(',') + '\n';
        });
        
        // Crear Blob y descargar
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `usuarios_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
        
        mostrarMensaje('✅ Exportación completada', 'exito');
    } catch (error) {
        console.error('Error al exportar:', error);
        mostrarMensaje('❌ Error al exportar', 'error');
    }
}
window.exportarExcel = exportarExcel;

// ============ MOSTRAR MENSAJE ============
function mostrarMensaje(texto, tipo = 'info') {
    const mensajeDiv = document.getElementById('dashboardMensaje');
    if (mensajeDiv) {
        mensajeDiv.textContent = texto;
        mensajeDiv.className = `mensaje mensaje-${tipo}`;
        mensajeDiv.classList.remove('hidden');
        setTimeout(() => {
            mensajeDiv.classList.add('hidden');
        }, 4000);
    }
}
window.mostrarMensaje = mostrarMensaje;

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
    document.getElementById('btnExportarExcel').addEventListener('click', exportarExcel);
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModal);
    
    // Cerrar modal al hacer clic fuera
    document.getElementById('modalEditar').addEventListener('click', function(e) {
        if (e.target === this) cerrarModal();
    });
    
    document.getElementById('buscarUsuario').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscarUsuario();
        }
    });
});

// ============ EXPORTAR FUNCIONES PARA USO EN HTML ============
window.actualizarLista = actualizarLista;
window.cambiarRol = cambiarRol;
window.cambiarEstado = cambiarEstado;
window.eliminarUsuario = eliminarUsuario;
window.abrirEditar = abrirEditar;
window.cerrarModal = cerrarModal;
window.buscarUsuario = buscarUsuario;
window.exportarExcel = exportarExcel;
