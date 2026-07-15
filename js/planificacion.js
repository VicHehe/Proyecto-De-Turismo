// js/planificacion.js
const Planificacion = {
    /**
     * Carga todas las salidas guardadas
     * @returns {Promise<Array>} Lista de salidas
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
     * Guarda una nueva salida
     * @param {Object} salida - Datos de la salida (sin id)
     * @returns {Promise<boolean>} true si se guardó correctamente
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
    }
};
