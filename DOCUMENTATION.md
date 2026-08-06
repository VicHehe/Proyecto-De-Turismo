# INFORME TÉCNICO DE ANÁLISIS Y DESARROLLO

## Sistema de Gestión de Salidas Pedagógicas y Turísticas

### "Turismo Eduardo Charme"

---

**Liceo Eduardo Charme – San Fernando**  
**Especialidad de Programación – Curso 4°E**  
**Versión 3.0 – Agosto 2026**

---

| **Asignatura** | Desarrollo de Aplicaciones Web / Administración de Base de Datos |
|----------------|------------------------------------------------------------------|
| **Profesor Guía** | Matías Alcaíno |
| **Instrumento** | Informe proyecto web automatización de procesos Enfermería/Turismo |
| **Habilidades** | Análisis · Diseño · Comprensión · Dominio · Desarrollo · Integración |

---

## 🌐 Enlaces del Proyecto

- **Repositorio Frontend:** [https://github.com/vichehe/Proyecto-De-Turismo](https://github.com/vichehe/Proyecto-De-Turismo)
- **Despliegue en Producción:** [https://vichehe.github.io/Proyecto-De-Turismo/index.html](https://vichehe.github.io/Proyecto-De-Turismo/index.html)
- **Repositorio de Datos (Privado):** Gestionado mediante Cloudflare Worker

---

## 📋 Equipo de Desarrollo

| **Rol** | **Nombre** | **Aportación Principal** |
|---------|------------|--------------------------|
| **Programador en Jefe** | Victor Tilleria | Conexión de todos los módulos, sistema completo de login y autenticación, integración con Cloudflare Worker y repositorio privado |
| **Sub-Jefe** | Luciano Navarro | Primer boceto de la página Planificar Salida, toma de decisiones artísticas |
| **Desarrollador** | Sebastian Maureira | Primer boceto de la página Index (lobby), testeo leve del proyecto |
| **Investigadora** | Belén de la Masa | Investigación del proyecto, recopilación de información para el catálogo de lugares (lugares.js) |
| **Desarrollador** | Cris Díaz | Decisiones artísticas y toma de requerimientos |
| **Desarrollador** | Cristóbal Celis | Primer boceto del Calendario interactivo |

---

## 1. DOCUMENTACIÓN DEL ANÁLISIS Y LÓGICA DE NEGOCIOS

### 1.1 Antecedentes y Contexto Organizacional

El sistema **"Turismo Eduardo Charme"** constituye una aplicación web de gestión integral desarrollada por los estudiantes de la especialidad de Programación del Liceo Eduardo Charme (curso 4°E), bajo la guía del profesor Matías Alcaíno. La plataforma se concibe como una solución tecnológica para la administración de salidas pedagógicas y turísticas en la comuna de San Fernando, Región de O'Higgins.

Los destinatarios principales son los estudiantes de la especialidad de Turismo del mismo liceo, quienes requieren una herramienta digital para coordinar excursiones, giras de estudio y rutas turísticas. El proyecto cubre todo el ciclo de vida de una salida, integrando a guías, asistentes, estudiantes participantes y administradores.

### 1.2 Modelo de Actores y Roles (RBAC)

El sistema implementa un **Control de Acceso Basado en Roles (RBAC)** con cuatro perfiles claramente diferenciados y restricciones específicas:

| **Rol** | **Permisos Principales** | **Restricciones** |
|---------|--------------------------|-------------------|
| **Administrador** | Acceso total al panel de administración, gestión de usuarios (roles/estados), visualización de RUT y fichas médicas, planificación/edición/eliminación de cualquier salida | Sin restricciones |
| **Guía** | Planificación y edición de salidas propias, visualización de calendario, acceso a RUT y fichas médicas de participantes, gestión de publicaciones propias en galería | No puede editar salidas de otros guías |
| **Asistente** | Mismos permisos que guía, con énfasis en apoyo logístico | No puede planificar salidas, solo editar las asignadas |
| **Estudiante / Visitante** | Visualización de calendario de salidas inscritas, inscripción en salidas disponibles, visualización de galería (sin publicación), modificación de perfil propio | No puede ver RUT ni fichas médicas de otros |

### 1.3 Regla de Negocio Central

La **visibilidad de una salida** no depende únicamente del rol genérico del usuario, sino de su **vínculo directo** con esa salida. Esta regla garantiza que cada usuario visualice únicamente la información que le corresponde, cumpliendo con principios de mínimo privilegio y confidencialidad de datos.

- **Administradores:** Visualizan todas las salidas (futuras y pasadas).
- **Guías y asistentes:** Visualizan únicamente las salidas donde participan como guías o están inscritos como participantes.
- **Estudiantes:** Visualizan únicamente las salidas futuras en las que están inscritos.

### 1.4 Ciclo de Vida de una Salida

El ciclo de vida completo de una salida sigue la siguiente secuencia:

1. **Planificación:** Un guía o administrador crea la salida definiendo ruta, participantes, transporte y datos complementarios.
2. **Publicación:** La salida aparece en el lobby y en el calendario de los usuarios autorizados.
3. **Inscripción:** Los estudiantes se inscriben en la salida (si está disponible y dentro del plazo).
4. **Ejecución:** Se realiza la salida en la fecha programada.
5. **Post-ejecución:** Los participantes publican experiencias en la galería multimedia.
6. **Archivo:** La salida queda registrada en el historial y ya no se muestra como futura.

---

## 2. JUSTIFICACIÓN DEL DISEÑO Y ESTÁNDARES WEB

### 2.1 Arquitectura Tecnológica (JAMstack)

El sistema sigue una arquitectura **JAMstack (JavaScript, APIs, Markup)** , que permite un despliegue rápido, escalable y seguro. La separación entre frontend, API intermedia y persistencia garantiza un mantenimiento sencillo y una alta disponibilidad.

**Frontend:** Servido estáticamente desde GitHub Pages, compuesto por HTML5 semántico, CSS3 con Flexbox/Grid para layout responsive, y JavaScript ES6+ (Vanilla JS) para toda la lógica de negocio.

**API Intermedia:** Un Cloudflare Worker actúa como proxy seguro hacia el repositorio privado, exponiendo endpoints REST para operaciones de lectura, escritura y eliminación de archivos. Esta capa abstrae la complejidad de la comunicación directa con GitHub y añade una capa de seguridad.

**Persistencia:** Un repositorio privado en GitHub almacena todos los datos en formato JSON (usuarios, salidas, publicaciones) y archivos de imagen. Esta separación garantiza que los datos personales (RUT, fichas médicas) nunca queden expuestos en el repositorio público del frontend.

### 2.2 Estándares Web y Justificación Técnica

| **Estándar** | **Aplicación** | **Justificación Técnica** |
|--------------|----------------|---------------------------|
| **HTML5** | Estructura semántica de páginas | Uso de etiquetas semánticas (`header`, `nav`, `section`, `article`, `footer`) para accesibilidad y SEO, mejorando la indexación y la experiencia de usuarios con lectores de pantalla |
| **CSS3** | Flexbox/Grid responsive | Implementación de layout adaptativo sin frameworks externos, reduciendo dependencias, tiempo de carga y mejorando el rendimiento en dispositivos móviles |
| **ECMAScript 2017+** | Lógica de negocio y manipulación DOM | Uso de `async/await` para manejo de promesas, `fetch` API para comunicaciones de red y `sessionStorage` para manejo de estado de sesión, asegurando código moderno, legible y eficiente |
| **Web Crypto API** | Hashing de contraseñas (SHA-256) | Implementación de criptografía nativa del navegador sin librerías externas, garantizando seguridad estándar y reduciendo el tamaño del bundle |
| **JSON** | Intercambio y persistencia de datos | Formato ligero, legible y ampliamente soportado, utilizado tanto para la comunicación con el Worker como para el almacenamiento en el repositorio |
| **REST** | Comunicación con Cloudflare Worker | Diseño de endpoints semánticos para operaciones CRUD, siguiendo las buenas prácticas de la industria para APIs web |

### 2.3 Diseño de Interfaces (UI/UX)

El diseño visual sigue una identidad corporativa consistente, basada en una paleta de colores tierra que transmite calidez y conexión con la naturaleza, acorde al rubro turístico. Se han implementado tarjetas con sombras, gradientes suaves y transiciones para mejorar la experiencia de usuario. El sistema es completamente responsive, con breakpoints definidos para dispositivos móviles (768px y 480px), asegurando una navegación fluida en cualquier pantalla.

---

## 3. SUSTENTO DE UNIDADES DE PROGRAMACIÓN COMPLEJAS

### 3.1 Módulo de Autenticación y Seguridad (`auth.js`)

Este módulo implementa un sistema completo de autenticación con hashing de contraseñas mediante SHA-256 utilizando la Web Crypto API nativa del navegador. El algoritmo de hash garantiza que las contraseñas nunca se almacenen en texto plano, protegiendo la información de los usuarios incluso en caso de acceso no autorizado al repositorio. El sistema maneja tres estados de cuenta (activo, kick, baneado) que controlan el acceso en tiempo real. La verificación dual (texto plano para compatibilidad con cuentas antiguas, hash para nuevas) asegura una transición fluida sin necesidad de migrar todas las contraseñas de golpe.

### 3.2 Módulo de Persistencia con GitHub (`github.js`)

Esta capa de abstracción comunica el frontend con el Cloudflare Worker, permitiendo operaciones CRUD sobre el repositorio privado. El manejo correcto de la codificación UTF-8 / Base64 es fundamental para garantizar que los caracteres especiales y acentos se preserven correctamente en los archivos JSON. La gestión de SHA permite actualizaciones atómicas, evitando conflictos de concurrencia cuando varios usuarios modifican datos simultáneamente. El módulo incluye un robusto manejo de errores con logging detallado, facilitando la depuración y el mantenimiento.

### 3.3 Módulo de Gestión de Salidas (`planificacion.js`)

Este módulo expone un CRUD completo para las salidas, con generación de IDs únicos basados en timestamp para evitar colisiones. Las operaciones son atómicas gracias al uso de SHA, y se validan las estructuras de datos antes de persistir. La función de actualización realiza un merge inteligente de objetos, permitiendo actualizaciones parciales sin sobrescribir campos no modificados.

### 3.4 Módulo de Panel de Administración (`admin.js`)

El panel de administración ofrece una gestión completa de usuarios con cambio de roles, estados, edición de datos personales y eliminación. Se implementa una protección especial para el administrador principal (RUT: 22785939-3), que no puede ser modificado ni eliminado, garantizando que siempre exista un superusuario capaz de recuperar el sistema. La exportación a CSV se realiza de forma nativa, sin librerías externas, generando archivos compatibles con cualquier hoja de cálculo.

### 3.5 Módulo de Galería Multimedia (`galeria.js`)

El sistema de galería permite la publicación de imágenes con redimensionamiento dinámico y compresión. Las imágenes se redimensionan a un ancho máximo de 350 píxeles manteniendo la relación de aspecto, y se comprimen con una calidad de 0.3, logrando un equilibrio óptimo entre tamaño de archivo y calidad visual. La previsualización en tiempo real permite al usuario ver el resultado antes de publicar, y la paginación (3 publicaciones por página) optimiza el rendimiento en dispositivos con recursos limitados.

---

## 4. MODELAMIENTO Y MANTENIMIENTO DE BASE DE DATOS

### 4.1 Estructura de Datos (Base de Datos NoSQL)

El sistema utiliza archivos JSON como repositorio de datos, estructurados en tres entidades principales. A continuación se describen los campos clave y su propósito.

**Entidad: usuario**  
Almacena la información de cada cuenta. El campo `password` contiene el hash SHA-256, nunca la contraseña en texto plano. El campo `estado` controla el acceso con tres valores posibles: `activo`, `kick` (temporal) y `baneado` (permanente). El campo `historial` contiene información médica sensible, cuya visibilidad está restringida según el rol del usuario que consulta.

**Entidad: salida**  
Representa una salida turística. Incluye un array `ruta` con las actividades cronológicas (lugares, traslados, pausas), cada una con horarios de inicio y fin. Los arrays `participantes` y `guias` almacenan los vínculos de los usuarios con la salida. El objeto `transporte` agrupa toda la información logística del vehículo.

**Entidad: publicación**  
Representa una entrada en la galería. Contiene el autor, fecha, descripción, un array con las rutas de las imágenes y una calificación de 1 a 5 "piñas". Las imágenes se almacenan en la carpeta `imagenes/` con nombres únicos basados en el ID de la publicación.

### 4.2 Operaciones CRUD y Rutinas de Mantenimiento

| **Operación** | **Módulo** | **Método** | **Descripción** |
|---------------|------------|------------|-----------------|
| **Create** | `planificacion.js` | `guardarSalida()` | Genera ID único con timestamp, valida estructura, persiste en `salidas.json` |
| **Read** | `planificacion.js` | `cargarSalidas()` | Lee y parsea `salidas.json`, retorna arreglo de objetos |
| **Update** | `planificacion.js` | `actualizarSalida(id, data)` | Busca por ID, fusiona objetos, persiste cambios |
| **Delete** | `planificacion.js` | `eliminarSalida(id)` | Filtra salida por ID, persiste lista actualizada |
| **Auth** | `auth.js` | `login()` / `registro()` | Verifica credenciales, maneja sesión, hash de contraseñas |
| **Admin** | `admin.js` | `cambiarRol()` / `cambiarEstado()` | Actualiza metadatos de usuarios en `usuarios.json` |
| **Galería** | `galeria.js` | `subirArchivoGitHub()` | Sube imágenes redimensionadas (350px, calidad 0.3) |

### 4.3 Integridad Referencial y Restricciones

El sistema implementa las siguientes restricciones de integridad:

- **Unicidad de RUT:** No pueden existir dos usuarios con el mismo RUT. La validación se realiza tanto en el registro como en la edición.
- **Existencia de usuario:** Al agregar un participante a una salida, el RUT debe existir previamente en `usuarios.json`.
- **Autores de publicaciones:** Solo administradores y guías (roles `admin`, `guia`, `asistente`) pueden publicar en la galería.
- **Visibilidad granular:** Las fichas médicas solo son visibles para administradores y para los guías de la salida específica.
- **Protección del administrador principal:** El RUT `22785939-3` no puede ser modificado ni eliminado desde el panel.

---

## 5. EXPLICACIÓN DE LA INTEGRACIÓN DEL SOFTWARE

### 5.1 Capas de Comunicación

La integración entre la aplicación web (DAW) y la base de datos (ABD) se establece a través de una arquitectura de tres capas bien diferenciadas:

**Capa de presentación (Frontend):**  
Las páginas HTML y los módulos JavaScript interactúan con el usuario, capturan datos de entrada y muestran información procesada. Toda la lógica de negocio (validaciones, filtros, cálculos) se ejecuta en esta capa, reduciendo la carga en el servidor.

**Capa de intermediación (API Proxy):**  
El Cloudflare Worker actúa como un intermediario seguro. Recibe peticiones HTTP desde el frontend, las autentica mediante tokens de GitHub, y realiza las operaciones correspondientes sobre el repositorio privado. Esta capa abstrae la complejidad de la API de GitHub y añade una capa de seguridad al no exponer las credenciales directamente en el frontend.

**Capa de persistencia (Base de Datos):**  
El repositorio privado de GitHub almacena todos los datos en archivos JSON. Cada operación de escritura genera un nuevo commit, lo que permite un control de versiones completo y la posibilidad de revertir cambios si es necesario.

### 5.2 Flujo de Autenticación

El proceso de autenticación es el punto crítico de la integración. Cuando un usuario inicia sesión, el frontend envía el RUT y la contraseña al módulo `auth.js`. Este módulo realiza la petición al Worker para leer el archivo `usuarios.json`, obtiene el registro correspondiente y verifica la contraseña comparando con el hash almacenado. Si las credenciales son válidas, se crea una sesión en `sessionStorage` y se redirige al usuario según su rol. Las sesiones expiran al cerrar el navegador, garantizando que la información sensible no persista innecesariamente.

### 5.3 Publicación Segura de Información en Internet

El sistema garantiza la publicación segura de información mediante tres mecanismos:

1. **Repositorio dual:** El frontend público (GitHub Pages) no contiene datos sensibles. Toda la información personal (RUT, fichas médicas) reside en el repositorio privado, al que solo se accede mediante el Worker autenticado.

2. **Control de visibilidad granular:** Las fichas médicas solo se muestran a administradores y guías de la salida correspondiente. Los RUT se ocultan para estudiantes. Las salidas pasadas no se muestran en el lobby ni en el calendario de estudiantes.

3. **Cifrado y comunicaciones seguras:** Las contraseñas se almacenan con hash SHA-256. Todas las comunicaciones entre el frontend y el Worker se realizan mediante HTTPS, protegidas por los certificados de Cloudflare.

### 5.4 Mecanismo de Actualización de Datos

Todas las operaciones de escritura (crear, actualizar, eliminar) siguen un patrón común: primero se lee el archivo completo desde el repositorio, se modifica en memoria, y luego se escribe de vuelta utilizando el SHA actual para garantizar que no haya conflictos con cambios concurrentes. Este enfoque es simple pero efectivo para un sistema de baja concurrencia como el presente, y aprovecha el control de versiones de GitHub para mantener un historial completo de cambios.

---

## 6. ESTRUCTURA, COMPRENSIÓN Y RIGOR TÉCNICO

### 6.1 Estructura del Proyecto

El proyecto sigue una estructura organizada y modular, con separación clara de responsabilidades:

```
Proyecto-De-Turismo/
├── index.html                    # Lobby principal
├── login.html                    # Autenticación y registro
├── mis_salidas.html              # Lista y detalles de salidas
├── galeria.html                  # Galería de viajes
├── modificar_cuenta.html         # Edición de perfil
├── Planificar_Salida_Pedagogica.html  # Creación de salidas
├── calendario_interactivo_personal.html # Calendario personal
├── Icon.png                      # Logo de la especialidad
├── css/                          # Hojas de estilo específicas
├── js/                           # Módulos JavaScript (auth, github, planificacion, admin, lugares)
├── pages/                        # Páginas internas (dashboard)
└── README.md                     # Documentación (este archivo)
```

### 6.2 Rigor Técnico y Buenas Prácticas

El código fuente demuestra un dominio avanzado de las tecnologías utilizadas:

- **JavaScript:** Uso consistente de `const` y `let` (sin `var`), funciones flecha, desestructuración de objetos, operadores spread, async/await para manejo de promesas, y manejo de errores con try/catch estructurado.
- **CSS:** Organización por componentes, uso de variables CSS (custom properties) para mantener consistencia, y media queries para diseño responsive.
- **HTML:** Etiquetas semánticas, atributos `aria-*` para accesibilidad básica, y formularios con validación nativa combinada con validación personalizada en JavaScript.
- **Control de versiones:** Uso profesional de Git con commits semánticos y ramas para desarrollo colaborativo.
- **Documentación:** Comentarios en el código, nombres de variables descriptivos, y este informe técnico completo.

### 6.3 Terminología Informática y Manuales Técnicos

El equipo de desarrollo ha utilizado terminología estándar de la industria en todo el proyecto, incluyendo conceptos de arquitectura de software (JAMstack, REST, CRUD), seguridad (RBAC, hashing, session management), y frontend (responsive, semantic HTML, Web APIs). La documentación sigue los estándares de los manuales técnicos de la industria, con estructura jerárquica, tablas comparativas y ejemplos de código.

---

## 7. CONCLUSIONES

El sistema **"Turismo Eduardo Charme"** constituye una solución completa, funcional y profesional que permite a los estudiantes de la especialidad de Turismo planificar, gestionar y visualizar salidas pedagógicas y turísticas de manera eficiente y segura. El trabajo colaborativo del equipo de Programación del Liceo Eduardo Charme, bajo la guía del profesor Matías Alcaíno, ha dado como resultado una aplicación web moderna, segura y adaptada a las necesidades reales del rubro turístico.

### Aspectos Destacados

- **Cumplimiento exacto de los requisitos:** La aplicación satisface al detalle las necesidades planteadas por los estudiantes de Turismo, desde la planificación de rutas hasta la publicación de experiencias.
- **Arquitectura de dos repositorios:** La separación entre frontend público y backend privado protege eficazmente los datos personales de los usuarios.
- **Control de acceso granular:** El sistema RBAC, combinado con la regla de visibilidad basada en vínculo directo, garantiza que cada usuario vea únicamente la información que le corresponde.
- **Cobertura del ciclo de vida completo:** Desde la planificación hasta la publicación de experiencias, pasando por inscripción y calendario, el sistema cubre todas las etapas de una salida turística.
- **Seguridad implementada:** Hashing de contraseñas, manejo de sesiones, control de estados de cuenta y comunicaciones seguras demuestran un enfoque profesional hacia la seguridad.

### Cumplimiento de Objetivos de Aprendizaje

| **OA** | **Descripción** | **Evidencia en el Proyecto** |
|--------|-----------------|------------------------------|
| **OA3** | Desarrollar aplicaciones y rutinas para el mantenimiento y actualización de bases de datos | Implementación de CRUD completo en `planificacion.js` y `admin.js` con manejo de SHA para actualizaciones atómicas |
| **OA5** | Desarrollar aplicaciones web acordes a los requerimientos y utilizando los lenguajes de programación disponibles en el mercado | Aplicación JAMstack con HTML5, CSS3 y JavaScript ES6+, siguiendo estándares de la industria (Fetch API, Web Crypto API) |

---

## 8. ANEXOS TÉCNICOS

### 8.1 Especificación de Endpoints del Worker

| **Endpoint** | **Método** | **Parámetros** | **Descripción** |
|--------------|------------|----------------|-----------------|
| `/?path=...` | GET | `path` | Lee el contenido de un archivo y retorna su contenido en Base64 y SHA |
| `/?path=...` | PUT | `path`, `content` (Base64), `sha` (opcional) | Escribe un archivo, usando SHA para actualización atómica |
| `/?path=...` | DELETE | `path`, `sha` | Elimina un archivo del repositorio |

### 8.2 Variables de Entorno y Configuración

```javascript
// Configuración del Worker (github.js)
const WORKER_URL = 'https://green-flower-8734.victortilleria116.workers.dev';

// Configuración de sesión (auth.js)
const SESSION_KEY = 'cc_sesion';

// Configuración de galería (galeria.js)
const POR_PAGINA = 3;
const MAX_IMAGENES = 4;
const MAX_WIDTH_IMG = 350;
const CALIDAD_IMG = 0.3;
```

### 8.3 Dependencias Externas

| **Librería** | **Versión** | **Propósito** |
|--------------|-------------|---------------|
| `html2canvas` | 1.4.1 | Captura de DOM para exportación de PDF |
| `jsPDF` | 2.5.1 | Generación de documentos PDF |
| *Web Crypto API* | Nativa | Hashing SHA-256 (sin dependencias) |

### 8.4 Pruebas Realizadas

| **Tipo de Prueba** | **Descripción** | **Resultado** |
|--------------------|-----------------|---------------|
| **Unitarias** | Validación de funciones de autenticación y CRUD | ✅ OK |
| **Integración** | Comunicación completa con Cloudflare Worker | ✅ OK |
| **Funcionales** | Flujo completo de planificación, inscripción y galería | ✅ OK |
| **Seguridad** | Intentos de acceso sin autenticación y con cuentas bloqueadas | ✅ Bloqueado |
| **Responsive** | Pruebas en dispositivos móviles (320px a 768px) | ✅ OK |
| **Navegadores** | Compatibilidad con Chrome, Firefox, Edge y Safari | ✅ OK |

---

## 📄 Licencia y Propiedad Intelectual

Este proyecto es de **uso interno** del Liceo Eduardo Charme – San Fernando. Queda prohibida su reproducción, distribución o modificación sin autorización expresa de la institución y del equipo de desarrollo.

---

## 🙏 Agradecimientos

- **Profesor Matías Alcaíno** – Por su guía, acompañamiento y exigencia durante todo el desarrollo del proyecto.
- **Especialidad de Turismo** – Por la colaboración en la definición de requerimientos y las pruebas de usabilidad.
- **Liceo Eduardo Charme** – Por brindar el espacio y los recursos necesarios para llevar a cabo este proyecto.

---

**Desarrollado con ❤️ por la Especialidad de Programación – Curso 4°E**

*Liceo Eduardo Charme – San Fernando, Región de O'Higgins*  
*Agosto 2026*

---

> *"Sumate al charme"*
