const Planificacion = {
    async cargarSalidas() {
        try {
            const datos = await GitHub.leer('datos/salidas.json');
            if (!datos || !datos.salidas) return [];
            return datos.salidas;
        } catch (error) {
            console.error('Error al cargar salidas:', error);
            return [];
        }
    },

    async guardarSalida(salida) {
        try {
            const datos = await GitHub.leer('datos/salidas.json');
            const salidas = datos && datos.salidas ? datos.salidas : [];
            salida.id = `salida_${Date.now()}`;
            salidas.push(salida);
            const sha = await GitHub.sha('datos/salidas.json');
            const ok = await GitHub.escribir('datos/salidas.json', { salidas }, sha);
            return ok;
        } catch (error) {
            console.error('Error al guardar salida:', error);
            return false;
        }
    },

    // NUEVA FUNCIÓN PARA ACTUALIZAR SALIDA
    async actualizarSalida(id, nuevosDatos) {
        try {
            const datos = await GitHub.leer('datos/salidas.json');
            if (!datos || !datos.salidas) return false;
            const salidas = datos.salidas;
            const index = salidas.findIndex(s => s.id === id);
            if (index === -1) return false;
            salidas[index] = { ...salidas[index], ...nuevosDatos };
            const sha = await GitHub.sha('datos/salidas.json');
            return await GitHub.escribir('datos/salidas.json', { salidas }, sha);
        } catch (error) {
            console.error('Error al actualizar salida:', error);
            return false;
        }
    }
};
