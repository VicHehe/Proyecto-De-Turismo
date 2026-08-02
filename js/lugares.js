// Base de datos de lugares turísticos de San Fernando y alrededores
const lugares = [
  {
    nombre: "Termas del Flaco",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "Aprox. 65-77 km al este de San Fernando, en la ribera norte del río Tinguiririca; sector de montaña.",
    descripcion: "Centro termal natural en altura (1.736 msnm) con pozones y entorno andino; popular para turismo de naturaleza y trekking.",
    miniatura: "https://www.alltrails.com/mugen/image/trail-app-router?url=https%3A%2F%2Fimages.alltrails.com%2FeyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMzg4MTMxNDIvMDIzNWU3Njc0OWE5ZmY2ZTUzNmViMzY2NGFkYWUzMjAuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoiMTA4MCIsImhlaWdodCI6IjcwMCIsImZpdCI6ImNvdmVyIn0sInJvdGF0ZSI6bnVsbCwianBlZyI6eyJ0cmVsbGlzUXVhbnRpc2F0aW9uIjp0cnVlLCJvdmVyc2hvb3REZXJpbmdpbmciOnRydWUsIm9wdGltaXNlU2NhbnMiOnRydWUsInF1YW50aXNhdGlvblRhYmxlIjozfX19&w=3840&q=75"
  },
  {
    nombre: "Santuario Alto Huemul",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "Cordillera de Colchagua, sector alto de la comuna (áreas de bosque entre 1.000 y 2.000 msnm).",
    descripcion: "Santuario de la Naturaleza que conserva bosquetes de roble y fauna nativa; apto para observación de aves y conservación.",
    miniatura: "https://www.conaf.cl/wp-content/uploads/2023/02/santuario-alto-huemul-1.jpg"
  },
  {
    nombre: "Casa de las Piedras Pintadas del Tinguiririca",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "Sector del río Tinguiririca, en la comuna (acceso por rutas interiores hacia el cordón cordillerano).",
    descripcion: "Alerón rocoso con pictografías prehispánicas de estilo geométrico, evidencia arqueológica de grupos recolectores.",
    miniatura: "https://www.monumentos.gob.cl/sites/default/files/styles/landscape_medium/public/monumentos/piedras_pintadas_tinguiririca.jpg"
  },
  {
    nombre: "Huellas de Animales extintos (Termas del Flaco)",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "localidad de Termas del Flaco, 80 km al este de San Fernando.",
    descripcion: "Impresiones fósiles (huellas de terópodos) conservadas desde hace 150 millones de años; interés paleontológico y natural.",
    miniatura: "https://www.dinossaurios.com/wp-content/uploads/2023/03/huellas-termas-flaco.jpg"
  },
  {
    nombre: "Ruta del Vino",
    apertura: "9:30",
    cierre: "17:30",
    ubicacion: "Viñas alrededor de San Fernando y Valle de Colchagua; alguna a 5-40 km de la ciudad.",
    descripcion: "Circuitos de enoturismo, degustaciones y visitas a bodegas; San Fernando es puerta de acceso a rutas del vino de Colchagua y Cachapoal.",
    miniatura: "https://www.rutadelvino.cl/wp-content/uploads/2023/01/ruta-del-vino-colchagua.jpg"
  },
  {
    nombre: "Glaciar Universidad",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "En la ruta que une San Fernando con Termas del Flaco, siguiendo los ríos Azufre y San José.",
    descripcion: "Frente glaciar de interés para excursiones de montaña y observación glaciologica; requiere coordinación y buen tiempo.",
    miniatura: "https://www.turismoregiondeohiggins.cl/wp-content/uploads/2023/01/glaciar-universidad.jpg"
  },
  {
    nombre: "Plaza de Armas de San Fernando",
    apertura: "24 horas",
    cierre: "24 horas",
    ubicacion: "Centro de San Fernando, Provincia de Colchagua, Región de O'Higgins.",
    descripcion: "Plaza principal de la ciudad, punto de encuentro con monumentos, actividades comunales y acceso a comercios y la municipalidad.",
    miniatura: "https://www.sanfernando.cl/wp-content/uploads/2023/01/plaza-armas-san-fernando.jpg"
  },
  {
    nombre: "Iglesia Parroquial Nuestra Señora del Carmen",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "Próxima a la Plaza de Armas, centro de San Fernando.",
    descripcion: "Iglesia histórica que alberga celebraciones religiosas y procesiones locales importantes.",
    miniatura: "https://www.iglesiasdechile.cl/wp-content/uploads/2023/01/iglesia-san-fernando.jpg"
  },
  {
    nombre: "Museo de Colchagua",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "En la provincia de Colchagua (museo principal en Santa Cruz, con información turística en San Fernando y rutas del vino accesibles desde San Fernando).",
    descripcion: "Museo que recoge patrimonio, historia y etnografía del valle; San Fernando sirve como puerta de entrada al Valle de Colchagua y rutas vitivinícolas.",
    miniatura: "https://www.museodecolchagua.cl/wp-content/uploads/2023/01/museo-colchagua.jpg"
  },
  {
    nombre: "Museo Lircunlauta",
    apertura: "09:00 (mar-vie)",
    cierre: "13:00 y 14:30-18:30 (mar-vie); 14:00-19:00 (fin de semana)",
    ubicacion: "Juan Jiménez 1595, San Fernando",
    descripcion: "Museo patrimonial instalado en una casona histórica; es uno de los hitos culturales de la ciudad.",
    miniatura: "https://www.sanfernando.cl/wp-content/uploads/2023/01/museo-lircunlauta.jpg"
  },
  {
    nombre: "City tour histórico",
    apertura: "08:30 (lun-vie)",
    cierre: "14:00 (lun-vie)",
    ubicacion: "Casco histórico de San Fernando; recorre Museo Lircunlauta, la Cárcel, la Pileta de la Plaza de Armas e Iglesia San Francisco.",
    descripcion: "Recorrido guiado por el centro patrimonial de la ciudad.",
    miniatura: "https://www.sanfernando.cl/wp-content/uploads/2023/01/city-tour-san-fernando.jpg"
  },
  {
    nombre: "Cementerio Municipal de San Fernando",
    apertura: "09:00",
    cierre: "17:30 (visitas fúnebres); atención general hasta 14:00",
    ubicacion: "Juan Jiménez 1266, San Fernando.",
    descripcion: "Espacio municipal con visitas fúnebres y atención al público.",
    miniatura: "https://www.sanfernando.cl/wp-content/uploads/2023/01/cementerio-san-fernando.jpg"
  },
  {
    nombre: "Trekking Cerro Pangalillo",
    apertura: "Consultar",
    cierre: "Consultar",
    ubicacion: "Final del camino Lircunlauta, sector La Olla.",
    descripcion: "Trekking de precordillera con flora y fauna nativa; el cerro va de 900 a 1165 msnm.",
    miniatura: "https://www.turismoregiondeohiggins.cl/wp-content/uploads/2023/01/cerro-pangalillo.jpg"
  },
  {
    nombre: "Ruta Laguna del Encanto",
    apertura: "Consultar",
    cierre: "Consultar",
    ubicacion: "Desde San Fernando por ruta a Puente Negro, siguiendo el camino a Termas del Flaco y luego el cruce hacia las sierras de Bella Vista.",
    descripcion: "Ruta de acceso a una laguna cordillerana en un entorno agreste.",
    miniatura: "https://www.turismoregiondeohiggins.cl/wp-content/uploads/2023/01/laguna-del-encanto.jpg"
  }
];
