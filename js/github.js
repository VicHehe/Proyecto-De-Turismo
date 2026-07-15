// ============================================================
// CONEXIÓN CON CLOUDFLARE WORKER - VERSIÓN MEJORADA
// ============================================================

const WORKER_URL = 'https://green-flower-8734.victortilleria116.workers.dev';

const GitHub = {
    /**
     * Leer un archivo del repositorio
     * @param {string} path - Ruta del archivo (ej: datos/usuarios.json)
     * @returns {Promise<object|null>} - Contenido del archivo o null si hay error
     */
    async leer(path) {
        try {
            const res = await fetch(`${WORKER_URL}?path=${encodeURIComponent(path)}`);
            
            if (!res.ok) {
                if (res.status === 404) {
                    console.warn(`Archivo no encontrado: ${path}`);
                    return null;
                }
                console.error(`Error al leer ${path}:`, res.status);
                return null;
            }
            
            const data = await res.json();
            
            if (data.content) {
                // Decodificar Base64 a texto UTF-8 correctamente
                const base64 = data.content.replace(/\n/g, '').replace(/\r/g, '');
                // Paso 1: Decodificar Base64 a string binaria
                const binaryString = atob(base64);
                // Paso 2: Convertir a Uint8Array
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                // Paso 3: Decodificar como UTF-8
                const decoder = new TextDecoder('utf-8');
                const decoded = decoder.decode(bytes);
                // Paso 4: Parsear JSON
                return JSON.parse(decoded);
            }
            
            return null;
        } catch (error) {
            console.error(`Error en leer(${path}):`, error);
            return null;
        }
    },

    /**
     * Escribir un archivo en el repositorio
     * @param {string} path - Ruta del archivo
     * @param {object} contenido - Contenido a guardar (se convierte a JSON)
     * @param {string|null} sha - SHA del archivo (para actualizar)
     * @returns {Promise<boolean>} - true si se guardó correctamente
     */
    async escribir(path, contenido, sha = null) {
        try {
            // Convertir contenido a JSON y luego a base64 (UTF-8)
            const jsonString = JSON.stringify(contenido, null, 2);
            const encoder = new TextEncoder();
            const data = encoder.encode(jsonString);
            // Convertir a cadena Base64
            let binary = '';
            for (let i = 0; i < data.length; i++) {
                binary += String.fromCharCode(data[i]);
            }
            const base64 = btoa(binary);
            
            const body = {
                message: `Actualización de ${path} desde sistema de turismo`,
                content: base64,
            };
            
            if (sha) {
                body.sha = sha;
            }
            
            const res = await fetch(`${WORKER_URL}?path=${encodeURIComponent(path)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            
            if (!res.ok) {
                const errorText = await res.text();
                console.error('Error al guardar:', errorText);
                return false;
            }
            
            return true;
        } catch (error) {
            console.error(`Error en escribir(${path}):`, error);
            return false;
        }
    },

    /**
     * Obtener el SHA de un archivo (útil para actualizaciones)
     * @param {string} path - Ruta del archivo
     * @returns {Promise<string|null>} - SHA del archivo o null
     */
    async sha(path) {
        try {
            const res = await fetch(`${WORKER_URL}?path=${encodeURIComponent(path)}`);
            
            if (!res.ok) {
                return null;
            }
            
            const data = await res.json();
            return data.sha || null;
        } catch (error) {
            console.error(`Error en sha(${path}):`, error);
            return null;
        }
    },

    /**
     * Eliminar un archivo del repositorio
     * @param {string} path - Ruta del archivo
     * @param {string} sha - SHA del archivo
     * @param {string} message - Mensaje del commit
     * @returns {Promise<boolean>} - true si se eliminó correctamente
     */
    async eliminar(path, sha, message = 'Eliminado desde sistema de turismo') {
        try {
            const res = await fetch(`${WORKER_URL}?path=${encodeURIComponent(path)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sha, message })
            });
            
            return res.ok;
        } catch (error) {
            console.error(`Error en eliminar(${path}):`, error);
            return false;
        }
    }
};
