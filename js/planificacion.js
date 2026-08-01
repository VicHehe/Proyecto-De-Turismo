// ============================================================
// planificacion.js - Gestión de salidas
// ============================================================

const Planificacion = {
    /**
     * Cargar todas las salidas desde salidas.json
     */
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

    /**
     * Guardar una nueva salida
     */
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

    /**
     * Actualizar una salida existente por su ID
     * @param {string} id - ID de la salida
     * @param {object} nuevosDatos - Datos a actualizar (se fusionan con los existentes)
     */
    async actualizarSalida(id, nuevosDatos) {
        try {
            const datos = await GitHub.leer('datos/salidas.json');
            if (!datos || !datos.salidas) return false;
            
            const salidas = datos.salidas;
            const index = salidas.findIndex(s => s.id === id);
            if (index === -1) return false;
            
            // Fusionar datos sin sobrescribir el ID
            salidas[index] = { ...salidas[index], ...nuevosDatos };
            
            const sha = await GitHub.sha('datos/salidas.json');
            return await GitHub.escribir('datos/salidas.json', { salidas }, sha);
        } catch (error) {
            console.error('Error al actualizar salida:', error);
            return false;
        }
    },

    /**
     * Eliminar una salida por su ID
     */
    async eliminarSalida(id) {
        try {
            const datos = await GitHub.leer('datos/salidas.json');
            if (!datos || !datos.salidas) return false;
            
            const salidas = datos.salidas.filter(s => s.id !== id);
            if (salidas.length === datos.salidas.length) return false;
            
            const sha = await GitHub.sha('datos/salidas.json');
            return await GitHub.escribir('datos/salidas.json', { salidas }, sha);
        } catch (error) {
            console.error('Error al eliminar salida:', error);
            return false;
        }
    }
};
