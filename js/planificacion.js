// js/planificacion.js
const Planificacion = {
    async cargarSalidas() {
        const datos = await GitHub.leer('datos/salidas.json');
        return datos ? datos.salidas : [];
    },

    async guardarSalida(salida) {
        const datos = await GitHub.leer('datos/salidas.json');
        const salidas = datos ? datos.salidas : [];
        salida.id = `salida_${Date.now()}`;
        salidas.push(salida);
        const sha = await GitHub.sha('datos/salidas.json');
        return await GitHub.escribir('datos/salidas.json', { salidas }, sha);
    }
};
