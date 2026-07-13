async login(rut, password) {
    const rutFormateado = this.formatearRut(rut);
    const datos = await GitHub.leer('datos/usuarios.json');
    if (!datos) return { ok: false, error: 'Error al conectar con el servidor' };
    
    const usuario = datos.usuarios.find(u => u.rut === rutFormateado);
    if (!usuario) return { ok: false, error: 'RUT no registrado' };
    
    // Verificar estado
    if (usuario.estado === 'baneado') {
        return { ok: false, error: '❌ Usuario baneado' };
    }
    if (usuario.estado === 'kick') {
        return { ok: false, error: '⏰ Usuario kickeado' };
    }
    
    // ✅ COMPARACIÓN DUAL: texto plano O hash
    const passwordHash = await this.hashPassword(password);
    const esValida = (usuario.password === password) || (usuario.password === passwordHash);
    
    if (!esValida) {
        return { ok: false, error: 'Contraseña incorrecta' };
    }
    
    this.setSesion({
        rut: usuario.rut,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
        estado: usuario.estado || 'activo'
    });
    
    // ✅ REDIRECCIÓN CORREGIDA
    if (usuario.rol === 'admin') {
        window.location.href = 'pages/dashboard.html';  // Cambiado
    } else {
        window.location.href = 'index.html';
    }
    
    return { ok: true, rol: usuario.rol };
}
