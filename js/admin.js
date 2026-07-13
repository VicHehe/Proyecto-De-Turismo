// ============ CONVERTIR CONTRASEÑA A HASH ============
async function convertirPasswordAHash(rut) {
    if (!confirm(`¿Convertir la contraseña de ${rut} a hash? Esto mejora la seguridad.`)) return;
    
    const usuarios = await cargarUsuarios();
    const usuario = usuarios.find(u => u.rut === rut);
    
    if (!usuario) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return;
    }
    
    if (rut === '22785939-3') {
        mostrarMensaje('No se puede modificar la contraseña del admin principal', 'error');
        return;
    }
    
    // Verificar si ya es hash (tiene 64 caracteres hexadecimales)
    if (/^[0-9a-f]{64}$/.test(usuario.password)) {
        mostrarMensaje('⚠️ Esta contraseña ya está hasheada', 'error');
        return;
    }
    
    // Generar hash de la contraseña actual
    const hash = await Auth.hashPassword(usuario.password);
    usuario.password = hash;
    
    if (await guardarUsuarios(usuarios)) {
        mostrarMensaje(`✅ Contraseña de ${usuario.nombre} hasheada correctamente`, 'exito');
        await actualizarLista();
    }
}

// ============ CAMBIAR CONTRASEÑA MANUALMENTE ============
async function cambiarPassword(rut, nuevaPassword) {
    if (!confirm(`¿Cambiar contraseña de ${rut}?`)) return;
    
    if (nuevaPassword.length < 6) {
        mostrarMensaje('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    const usuarios = await cargarUsuarios();
    const usuario = usuarios.find(u => u.rut === rut);
    
    if (!usuario) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return;
    }
    
    if (rut === '22785939-3') {
        mostrarMensaje('No se puede cambiar la contraseña del admin principal', 'error');
        return;
    }
    
    const hash = await Auth.hashPassword(nuevaPassword);
    usuario.password = hash;
    
    if (await guardarUsuarios(usuarios)) {
        mostrarMensaje(`✅ Contraseña de ${usuario.nombre} cambiada`, 'exito');
        await actualizarLista();
    }
}
