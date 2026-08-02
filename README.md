# 🌿 Sistema de Gestión de Salidas Turísticas  
**Liceo Eduardo Charme – Especialidad de Turismo**

Bienvenido al sistema de gestión de salidas pedagógicas y turísticas del Liceo Eduardo Charme. Esta plataforma ha sido diseñada para facilitar la planificación, inscripción y seguimiento de las actividades turísticas realizadas por los estudiantes de la especialidad.

---

## 📌 ¿Qué es este sistema?

Es una herramienta digital que permite:

- **Planificar salidas turísticas** (rutas, participantes, transporte, etc.).
- **Inscribir a estudiantes** en salidas disponibles.
- **Consultar un calendario** con todas las actividades programadas.
- **Gestionar usuarios** (solo para administradores).
- **Visualizar fichas médicas** de los participantes (solo para guías y administradores).

---

## 👥 Roles y permisos

El sistema tiene tres tipos de usuarios, cada uno con funciones específicas:

| Rol | ¿Quiénes son? | ¿Qué pueden hacer? |
|-----|---------------|-------------------|
| **Estudiante** | Alumnos de la especialidad de Turismo (y otros que participen en salidas). | - Ver salidas futuras donde están inscritos.<br>- Inscribirse en salidas disponibles.<br>- Consultar el calendario personal.<br>- Ver detalles básicos de las salidas (sin RUT ni fichas médicas). |
| **Guía** | Estudiantes de Turismo que lideran salidas (pueden ser varios por salida). | - **Planificar nuevas salidas** (crear rutas, añadir participantes, definir transporte).<br>- Ver todas las salidas donde participan como guías o asistentes.<br>- Acceder a los RUT y fichas médicas de los participantes.<br>- Editar sus propias salidas (fechas, rutas, participantes, etc.).<br>- Consultar el calendario con sus salidas. |
| **Administrador** | Profesores jefes, funcionarios del liceo o estudiantes de Programación que mantienen el sistema. | - **Gestionar usuarios** (cambiar roles, editar datos, activar/desactivar cuentas).<br>- Ver **todas las salidas** del sistema (futuras y pasadas).<br>- Acceder a toda la información (RUT, fichas médicas, etc.).<br>- Supervisar el correcto funcionamiento del sistema. |

---

## 🚀 Primeros pasos

### 1. Acceder al sistema

- Abre tu navegador y ve a la dirección del sistema (ej: `https://tusitio.com`).
- Haz clic en **"Iniciar sesión"**.
- Ingresa tu **RUT** (con guión) y tu **contraseña**.
- Si es tu primera vez, regístrate con el botón **"Registrarse"**. Necesitarás:
  - RUT (con guión).
  - Nombre y apellido.
  - Edad.
  - Teléfono y correo electrónico.
  - Historial médico (opcional pero recomendado).
  - Contraseña (mínimo 6 caracteres).

> ⚠️ **Importante:** Si tu RUT está autorizado por el administrador, obtendrás el rol correspondiente (guía o admin). Si no, serás registrado como **estudiante**.

---

### 2. ¿Olvidaste tu contraseña?

Por ahora, contacta a un administrador para restablecerla. En futuras versiones se implementará la recuperación automática.

---

## 📋 Para estudiantes

### Ver salidas disponibles
- Al iniciar sesión, irás al **Lobby**.
- Verás las salidas futuras en las que estás **inscrito**.
- Si no hay salidas, aparecerá un mensaje indicándolo.

### Inscribirse en una salida
- Haz clic en **"Ver más"** en una tarjeta de salida.
- Si la salida es futura y aún no estás inscrito, verás un botón **"✅ Inscribirme"**.
- Haz clic en él para confirmar tu inscripción.

### Consultar el calendario
- En el menú superior, haz clic en **"📅 Calendario"**.
- Verás un calendario con los días que tienen eventos (salidas).
- Haz clic en un día con eventos para ver los detalles de las salidas programadas.

### Ver detalles de una salida
- Desde el Lobby o el Calendario, haz clic en **"Ver más"** o en el día correspondiente.
- Podrás ver:
  - Título y fecha.
  - Descripción.
  - Ruta (actividades y horarios).
  - Guías asignados.
  - Número de participantes.
  - Información de transporte (si está disponible).

> 🔒 **Nota:** Los estudiantes **no** pueden ver los RUT ni las fichas médicas de otros participantes.

---

## 🧭 Para guías

### Planificar una salida
1. En el menú superior, haz clic en **"📋 Planificar Salida"**.
2. Completa las secciones en este orden:
   - **Lugares:** Busca y añade lugares turísticos a la ruta.
   - **Personas:** Añade participantes (estudiantes, asistentes, otros guías).
   - **Transporte:** Define conductor, horarios y descripción del vehículo.
   - **Plan de Ruta:** Ordena las actividades con sus horarios.
   - **Datos complementarios:** Título, fecha, duración, curso, precio y menú.
3. Haz clic en **"✅ Guardar Salida"**.
4. La salida aparecerá en el Lobby y en el Calendario.

### Editar una salida existente
- Ve al **Lobby** o al **Calendario**.
- Encuentra la salida que creaste (debes ser el guía principal).
- Haz clic en **"Ver más"**.
- Busca el botón **"✏️ Editar salida"** (si está disponible).
- Modifica los datos necesarios y guarda los cambios.

> ⚠️ **Importante:** Solo puedes editar salidas que tú mismo creaste. Si eres guía asistente, no podrás editarlas.

### Ver fichas médicas
- Desde los detalles de una salida, busca la tabla de participantes.
- Haz clic en **"Ver"** en la columna "Ficha Médica" de cada participante.
- Se mostrará la información médica registrada (alergias, condiciones, etc.).

---

## 🛠️ Para administradores

### Gestionar usuarios
1. En el menú superior, haz clic en **"👑 Panel de Administración"**.
2. Verás la lista de todos los usuarios registrados.
3. Para cada usuario, puedes:
   - **Cambiar su rol** (Admin, Guía, Estudiante).
   - **Cambiar su estado** (Activo, Kickeado, Baneado).
   - **Eliminar su cuenta** (permanente).
4. También puedes buscar usuarios por RUT.

> 🔒 **Nota:** El administrador principal (RUT: 22785939-3) no puede ser modificado ni eliminado.

### Supervisar salidas
- Desde el Lobby o el Calendario, los administradores ven **todas las salidas** (futuras y pasadas).
- Pueden ver todos los detalles, incluyendo RUT y fichas médicas.
- En futuras versiones, podrán editar o eliminar cualquier salida.

---

## 📅 Calendario personal

Todos los usuarios tienen acceso a un calendario que muestra las salidas según su rol:

- **Estudiantes:** Solo ven las salidas futuras en las que están inscritos.
- **Guías:** Ven las salidas futuras donde participan como guías o asistentes.
- **Administradores:** Ven todas las salidas futuras del sistema.

Para usarlo:
1. Haz clic en **"📅 Calendario"** en el menú superior.
2. Navega entre meses con los botones **◀** y **▶**.
3. Haz clic en un día con eventos para ver los detalles de las salidas.

---

## ❓ Preguntas frecuentes

### ¿Puedo inscribirme en una salida pasada?
No. Solo se pueden inscribir en salidas con fecha igual o posterior a hoy.

### ¿Por qué no veo una salida en el Lobby?
Puede ser porque:
- La salida ya pasó (solo se muestran futuras).
- No estás inscrito en ella (estudiantes).
- No eres guía ni participante en ella (guías).

### ¿Cómo sé si soy guía o estudiante?
Pregunta a un administrador o revisa tu rol en el badge que aparece en la esquina superior derecha del Lobby.

### ¿Puedo cambiar mi contraseña?
Por ahora, contacta a un administrador. En futuras versiones podrás hacerlo tú mismo.

### ¿Qué hago si no puedo iniciar sesión?
Verifica que tu RUT esté bien escrito (con guión). Si el problema persiste, contacta a un administrador.

---

## 🧑‍💻 Para desarrolladores (mantenimiento)

### Estructura del proyecto
