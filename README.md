# 🌿 Sistema de Gestión de Salidas Turísticas  
**Liceo Eduardo Charme – Especialidad de Turismo**

![Logo de la especialidad](Icon.png)

Bienvenido al sistema de gestión de salidas pedagógicas y turísticas del Liceo Eduardo Charme. Esta plataforma ha sido diseñada para facilitar la planificación, seguimiento y visualización de las actividades turísticas realizadas por los estudiantes de la especialidad.

**Acceso en línea:** [https://vichehe.github.io/Proyecto-De-Turismo/index.html](https://vichehe.github.io/Proyecto-De-Turismo/index.html)

---

## 📌 ¿Qué es este sistema?

Es una herramienta web completa que permite:

- **Planificar salidas turísticas** (rutas, participantes, transporte, etc.).
- **Gestionar participantes** en las salidas (solo guías y administradores pueden agregar o quitar participantes).
- **Consultar un calendario** con todas las actividades programadas según tu rol.
- **Gestionar usuarios** (solo para administradores).
- **Visualizar fichas médicas** de los participantes (solo para guías y administradores).
- **Compartir fotos y experiencias** a través de una galería de viajes con calificación por "piñas".
- **Editar tu propia cuenta** (nombre, teléfono, contraseña, etc.).

---

## 👥 Roles y permisos

El sistema tiene cuatro tipos de usuarios (roles), cada uno con funciones específicas. Los roles se asignan al momento del registro (si el RUT está en la lista de autorizados) o posteriormente por un administrador.

| Rol | ¿Quiénes son? | ¿Qué pueden hacer? |
|-----|---------------|-------------------|
| **Visitante / Estudiante** | Alumnos de la especialidad (y otros que participen en salidas). Por defecto, al registrarse se asigna el rol `visitante`. El administrador puede cambiarlo a `estudiante` si se desea, pero ambos tienen los mismos permisos. | - Ver salidas futuras **donde están inscritos** como participantes.<br>- Consultar el calendario personal con esas salidas.<br>- Ver detalles básicos de las salidas (sin RUT ni fichas médicas de otros).<br>**No pueden inscribirse por sí mismos**; deben ser agregados por un guía o administrador. |
| **Guía / Asistente** | Estudiantes o profesionales que lideran o asisten en salidas. Pueden ser varios por salida. | - **Planificar nuevas salidas** (crear rutas, añadir participantes, definir transporte).<br>- Ver todas las salidas donde participan como guías o asistentes.<br>- Acceder a los RUT y fichas médicas de los participantes.<br>- **Editar** cualquier salida en la que sean guías o asistentes (no solo las que ellos crearon).<br>- Consultar el calendario con sus salidas.<br>- Subir fotos a la galería y eliminar las propias. |
| **Administrador** | Profesores, funcionarios o encargados de la plataforma. | - **Gestionar usuarios** (cambiar roles, editar datos personales, activar/desactivar cuentas, eliminar).<br>- Ver **todas las salidas** (futuras y pasadas).<br>- Acceder a toda la información (RUT, fichas médicas, etc.).<br>- Editar y eliminar **cualquier salida** directamente.<br>- Supervisar y moderar la galería (puede eliminar cualquier publicación). |

---

## 🚀 Primeros pasos

### 1. Acceder al sistema

- Abre tu navegador y ve a: [https://vichehe.github.io/Proyecto-De-Turismo/index.html](https://vichehe.github.io/Proyecto-De-Turismo/index.html)
- Haz clic en **"Iniciar sesión"**.
- Ingresa tu **RUT** (con guión) y tu **contraseña**.
- Si es tu primera vez, regístrate con el botón **"Registrarse"**. Necesitarás:
  - RUT (con guión, ej: `12345678-9`).
  - Nombre y apellido.
  - Edad.
  - Teléfono y correo electrónico.
  - Historial médico (opcional pero recomendado).
  - Contraseña (mínimo 6 caracteres).

> ⚠️ **Importante:** Si tu RUT está en la lista de autorizados (definida por el administrador), obtendrás automáticamente el rol correspondiente (admin o guía). En caso contrario, se te asignará el rol `visitante`. El administrador podrá cambiarlo después si es necesario.

---

### 2. ¿Olvidaste tu contraseña?

Por ahora, contacta a un administrador para restablecerla. En futuras versiones se implementará la recuperación automática.

---

## 📋 Para estudiantes / visitantes

### Ver salidas donde estás inscrito
- Al iniciar sesión, irás al **Lobby**.
- Verás las salidas futuras en las que estás **inscrito como participante**.
- Si no hay salidas, aparecerá un mensaje indicándolo.

### ¿Cómo me inscribo en una salida?
- **Los estudiantes no pueden inscribirse por sí mismos.** Debes pedir a un guía o al administrador que te agregue como participante en la salida deseada. Ellos lo harán desde el panel de planificación o edición.

### Consultar el calendario
- En el menú superior, haz clic en **"📅 Calendario"**.
- Verás un calendario con los días que tienen eventos (salidas donde estás inscrito).
- Haz clic en un día con eventos para ver los detalles de las salidas.

### Ver detalles de una salida
- Desde el Lobby, haz clic en **"Ver más"** en una tarjeta de salida.
- Serás redirigido a la vista detallada donde podrás ver:
  - Título y fecha.
  - Descripción.
  - Ruta (actividades y horarios).
  - Guías asignados.
  - Número de participantes.
  - Información de transporte (si está disponible).

> 🔒 **Nota:** Los estudiantes **no** pueden ver los RUT ni las fichas médicas de otros participantes.

---

## 🧭 Para guías y asistentes

### Planificar una salida
1. En el menú superior, haz clic en **"📋 Planificar Salida"**.
2. Completa las secciones en este orden:
   - **Lugares:** Busca y añade lugares turísticos a la ruta.
   - **Personas:** Añade participantes (estudiantes, asistentes, otros guías).
   - **Transporte:** Define conductor, horarios y descripción del vehículo.
   - **Plan de Ruta:** Ordena las actividades con sus horarios.
   - **Datos complementarios:** Título, fecha, duración, curso, precio y menú.
3. Haz clic en **"✅ Guardar Salida"**.
4. La salida aparecerá en el Lobby y en el Calendario de los participantes.

### Editar una salida existente
- Ve al **Lobby** o al **Calendario**.
- Encuentra la salida que deseas editar (debes ser guía o asistente en ella).
- Haz clic en **"Ver más"** para ir a la vista detallada.
- Busca el botón **"✏️ Editar"** (aparece si tienes permisos).
- Modifica los datos necesarios y guarda los cambios.

> ⚠️ **Importante:** Puedes editar **cualquier salida en la que participes como guía o asistente**, no solo las que creaste.

### Ver fichas médicas
- Desde la vista detallada de una salida, desplázate hasta la tabla de **Participantes**.
- Si tienes permisos (guía o admin), verás una columna **"Historial Médico"** con la información de cada participante.
- No es necesario hacer clic en ningún botón adicional; la información se muestra directamente.

---

## 🛠️ Para administradores

### Gestionar usuarios
1. En el menú superior, haz clic en **"👑 Panel de Administración"**.
2. Verás la lista de todos los usuarios registrados.
3. Para cada usuario, puedes:
   - **Cambiar su rol** (Admin, Guía, Estudiante).
   - **Cambiar su estado** (Activo, Kickeado, Baneado).
   - **Eliminar su cuenta** (permanente).
4. También puedes buscar usuarios por RUT, nombre o apellido.
5. Exportar la lista a CSV (Excel) con el botón **"📊 Exportar a Excel"**.

> 🔒 **Nota:** El administrador principal (RUT: `22785939-3`) no puede ser modificado ni eliminado.

### Supervisar y editar salidas
- Desde el Lobby o el Calendario, los administradores ven **todas las salidas** (futuras y pasadas) en la sección "Mis Salidas".
- Pueden ver todos los detalles, incluyendo RUT y fichas médicas.
- Pueden **editar** o **eliminar** cualquier salida directamente desde la vista detallada.

---

## 📅 Calendario personal

Todos los usuarios tienen acceso a un calendario que muestra las salidas según su rol:

- **Visitantes/Estudiantes:** Solo ven las salidas futuras en las que están inscritos como participantes.
- **Guías/Asistentes:** Ven las salidas futuras donde participan como guías o asistentes.
- **Administradores:** Ven todas las salidas futuras del sistema.

Para usarlo:
1. Haz clic en **"📅 Calendario"** en el menú superior.
2. Navega entre meses con los botones **◀** y **▶**.
3. Haz clic en un día con eventos para ver los detalles de las salidas.

---

## 📸 Galería de viajes

Comparte tus experiencias turísticas con la comunidad.

- **Subir fotos:** Los guías, asistentes y administradores pueden publicar imágenes (máximo 4 por publicación) con una descripción y una calificación de 1 a 5 "piñas".
- **Ver publicaciones:** Todos los usuarios pueden ver las fotos recientes con paginación (3 publicaciones por página).
- **Eliminar:** Los administradores pueden eliminar cualquier publicación; los guías/asistentes solo las propias.

La galería está disponible desde el menú principal con el botón **"📸 Galería"**.

---

## ✏️ Modificar tu cuenta

Cualquier usuario puede actualizar sus datos personales:
- Nombre y apellido.
- Edad.
- Teléfono.
- Correo electrónico.
- Historial médico.
- Contraseña (opcional, solo si se desea cambiar).

Haz clic en tu nombre en la esquina superior derecha (badge) para acceder a la edición.

---

## ❓ Preguntas frecuentes

### ¿Cómo me inscribo en una salida?
Los estudiantes **no pueden inscribirse por sí mismos**. Debes contactar a un guía o al administrador para que te agregue como participante. Ellos pueden hacerlo al planificar o editar una salida.

### ¿Por qué no veo una salida en el Lobby?
Puede ser porque:
- La salida ya pasó (solo se muestran futuras).
- No estás inscrito en ella (si eres estudiante/visitante).
- No eres guía ni participante en ella (si eres guía).

### ¿Cómo sé si soy guía o estudiante?
Revisa tu rol en el badge que aparece en la esquina superior derecha del Lobby. Si no estás seguro, consulta a un administrador.

### ¿Puedo cambiar mi contraseña?
Sí, desde la sección **"Modificar mi cuenta"** (haz clic en tu nombre en el badge superior). Deja el campo de contraseña en blanco si no deseas cambiarla.

### ¿Qué hago si no puedo iniciar sesión?
Verifica que tu RUT esté bien escrito (con guión). Si el problema persiste, contacta a un administrador.

### ¿Cómo se almacenan los datos?
Todos los datos (usuarios, salidas, publicaciones de la galería, imágenes) se guardan en un repositorio de GitHub mediante un Worker de Cloudflare. Las contraseñas se almacenan con hash SHA-256 (aunque por compatibilidad también se aceptan en texto plano hasta que todas las cuentas sean migradas).

---

## 🧑‍💻 Para desarrolladores (mantenimiento)

### Estructura del proyecto
- **Frontend:** HTML, CSS y JavaScript vanilla.
- **Backend:** GitHub como base de datos (archivos JSON) + Cloudflare Worker como proxy.
- **Autenticación:** Basada en sesión con `sessionStorage` y hash de contraseñas.
- **Galería:** Subida de imágenes redimensionadas a 350px (calidad 0.3) y almacenadas en el repositorio.

### Archivos principales
- `index.html` – Lobby principal.
- `login.html` – Autenticación y registro.
- `Planificar_Salida_Pedagogica.html` – Creación de salidas.
- `mis_salidas.html` – Lista y detalles de salidas del usuario (con edición/eliminación).
- `calendario_interactivo_personal.html` – Calendario personal.
- `galeria.html` – Galería de viajes.
- `modificar_cuenta.html` – Edición de perfil.
- `pages/dashboard.html` – Panel de administración.
- `js/` – Lógica de frontend (auth, github, planificacion, admin, etc.).
- `css/` – Hojas de estilo específicas para cada página.

### API del Worker
El Worker expone endpoints para leer/escribir/eliminar archivos en el repositorio. Se usa en `github.js` para todas las operaciones de persistencia.

---

## 📄 Licencia

Este proyecto es de uso interno del Liceo Eduardo Charme. Queda prohibida su reproducción o distribución sin autorización expresa.

---

**¡Gracias por usar el Sistema de Gestión de Salidas Turísticas!**  
_Desarrollado con ❤️ por la Especialidad de Programación._
