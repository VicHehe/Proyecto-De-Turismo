const Auth = {
    getSesion() {
        const s = sessionStorage.getItem('cc_sesion');
        return s ? JSON.parse(s) : null;
    },

    setSesion(usuario) {
        sessionStorage.setItem('cc_sesion', JSON.stringify(usuario));
    },

    cerrarSesion() {
        sessionStorage.removeItem('cc_sesion');
        window.location.href = 'login.html';
    },

    requiereLogin() {
        const s = this.getSesion();
        if (!s) window.location.href = 'login.html';
        return s;
    },

    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    },

    formatearRut(rut) {
        return rut.replace(/\./g, '').toUpperCase().trim();
    },

    async login(rut, password) {
        const rutFormateado = this.formatearRut(rut);
        const datos = await GitHub.leer('datos/usuarios.json');
        if (!datos) return { ok: false, error: 'Error al conectar con el servidor' };
        
        const usuario = datos.usuarios.find(u => u.rut === rutFormateado);
        if (!usuario) return { ok: false, error: 'RUT no registrado' };
        
        // Verificar estado
        if (usuario.estado === 'baneado') {
            return { ok: false, error: '❌ Usuario baneado permanentemente' };
        }
        if (usuario.estado === 'kick') {
            return { ok: false, error: '⏰ Usuario kickeado temporalmente' };
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
        
        return { ok: true, rol: usuario.rol };
    },

    async registro(rut, nombre, apellido, edad, telefono, gmail, historial, password) {
        const rutFormateado = this.formatearRut(rut);
        const datos = await GitHub.leer('datos/usuarios.json');
        if (!datos) return { ok: false, error: 'Error al conectar con el servidor' };
        
        const existe = datos.usuarios.find(u => u.rut === rutFormateado);
        if (existe) return { ok: false, error: 'Este RUT ya tiene una cuenta' };
        
        const autorizado = datos.ruts_autorizados.find(r => r.rut === rutFormateado);
        const rol = autorizado ? autorizado.rol : 'visitante';
        
        // ✅ GUARDAR SIEMPRE HASHEADO
        const passwordHash = await this.hashPassword(password);
        datos.usuarios.push({
            rut: rutFormateado,
            nombre: nombre,
            apellido: apellido,
            edad: parseInt(edad),
            telefono: telefono,
            gmail: gmail,
            historial: historial,
            password: passwordHash,  // Siempre hash
            rol: rol,
            estado: 'activo',
            fechaRegistro: new Date().toISOString()
        });
        
        const sha = await GitHub.sha('datos/usuarios.json');
        const ok = await GitHub.escribir('datos/usuarios.json', datos, sha);
        if (!ok) return { ok: false, error: 'Error al guardar en el servidor' };
        
        return { ok: true, rol: rol };
    }
};
