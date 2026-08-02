// Base de datos de lugares turísticos de San Fernando y alrededores
const lugares = [
  {
    nombre: "Termas del Flaco",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "Aprox. 65-77 km al este de San Fernando, en la ribera norte del río Tinguiririca; sector de montaña.",
    descripcion: "Centro termal natural en altura (1.736 msnm) con pozones y entorno andino; popular para turismo de naturaleza y trekking.",
    miniatura: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/5e/24/3b/las-piscinas.jpg?w=900&h=500&s=1"
  },
  {
    nombre: "Santuario Alto Huemul",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "Cordillera de Colchagua, sector alto de la comuna (áreas de bosque entre 1.000 y 2.000 msnm).",
    descripcion: "Santuario de la Naturaleza que conserva bosquetes de roble y fauna nativa; apto para observación de aves y conservación.",
    miniatura: "https://laderasur.com/wp-content/uploads/2019/06/alto-huemul4.jpg"
  },
  {
    nombre: "Casa de las Piedras Pintadas del Tinguiririca",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "Sector del río Tinguiririca, en la comuna (acceso por rutas interiores hacia el cordón cordillerano).",
    descripcion: "Alerón rocoso con pictografías prehispánicas de estilo geométrico, evidencia arqueológica de grupos recolectores.",
    miniatura: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhuwOfjkFC4iDuekM3rToRd5Rbcc0yk22H5Qor0NOQm3_KNrcWarQ4VU2j05WnlslyZe0WT5q7l_l7NmxOiy6Xo1wg-7l6rPuIjXMV5bbnFhroKir7BxgRN_JqwQlA8EPCXSqBwjxe_FNgH/s1600/Pinturarupestre.png"
  },
  {
    nombre: "Huellas de Animales extintos (Termas del Flaco)",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "localidad de Termas del Flaco, 80 km al este de San Fernando.",
    descripcion: "Impresiones fósiles (huellas de terópodos) conservadas desde hace 150 millones de años; interés paleontológico y natural.",
    miniatura: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIovrYUA4hspS6EvLOnE1_vvu7z68L_BGNTg5TKNHujAw7tognChefbw&s=10"
  },
  {
    nombre: "Ruta del Vino",
    apertura: "9:30",
    cierre: "17:30",
    ubicacion: "Viñas alrededor de San Fernando y Valle de Colchagua; alguna a 5-40 km de la ciudad.",
    descripcion: "Circuitos de enoturismo, degustaciones y visitas a bodegas; San Fernando es puerta de acceso a rutas del vino de Colchagua y Cachapoal.",
    miniatura: "https://images.visitchile.com/destinos/591_img_2126_jpg_1920x807_default.jpg"
  },
  {
    nombre: "Glaciar Universidad",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "En la ruta que une San Fernando con Termas del Flaco, siguiendo los ríos Azufre y San José.",
    descripcion: "Frente glaciar de interés para excursiones de montaña y observación glaciologica; requiere coordinación y buen tiempo.",
    miniatura: "https://www.wikiexplora.com/images/thumb/f/f5/Glaciar_ma%C3%B1ke.JPG/230px-Glaciar_ma%C3%B1ke.JPG"
  },
  {
    nombre: "Plaza de Armas de San Fernando",
    apertura: "24 horas",
    cierre: "24 horas",
    ubicacion: "Centro de San Fernando, Provincia de Colchagua, Región de O'Higgins.",
    descripcion: "Plaza principal de la ciudad, punto de encuentro con monumentos, actividades comunales y acceso a comercios y la municipalidad.",
    miniatura: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Plaza_de_Armas_de_San_Fernando_02.jpg/500px-Plaza_de_Armas_de_San_Fernando_02.jpg"
  },
  {
    nombre: "Iglesia Parroquial Nuestra Señora del Carmen",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "Próxima a la Plaza de Armas, centro de San Fernando.",
    descripcion: "Iglesia histórica que alberga celebraciones religiosas y procesiones locales importantes.",
    miniatura: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Parroquia_Nuestra_Se%C3%B1ora_del_Carmen_%28San_Fernando%29.jpg/500px-Parroquia_Nuestra_Se%C3%B1ora_del_Carmen_%28San_Fernando%29.jpg"
  },
  {
    nombre: "Museo de Colchagua",
    apertura: "Variable",
    cierre: "Variable",
    ubicacion: "En la provincia de Colchagua (museo principal en Santa Cruz, con información turística en San Fernando y rutas del vino accesibles desde San Fernando).",
    descripcion: "Museo que recoge patrimonio, historia y etnografía del valle; San Fernando sirve como puerta de entrada al Valle de Colchagua y rutas vitivinícolas.",
    miniatura: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Museo_de_Colchagua.JPG/500px-Museo_de_Colchagua.JPG"
  },
  {
    nombre: "Museo Lircunlauta",
    apertura: "09:00 (mar-vie)",
    cierre: "13:00 y 14:30-18:30 (mar-vie); 14:00-19:00 (fin de semana)",
    ubicacion: "Juan Jiménez 1595, San Fernando",
    descripcion: "Museo patrimonial instalado en una casona histórica; es uno de los hitos culturales de la ciudad.",
    miniatura: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Museo_Casa_Lircunlauta.JPG/500px-Museo_Casa_Lircunlauta.JPG"
  },
  {
    nombre: "City tour histórico",
    apertura: "08:30 (lun-vie)",
    cierre: "14:00 (lun-vie)",
    ubicacion: "Casco histórico de San Fernando; recorre Museo Lircunlauta, la Cárcel, la Pileta de la Plaza de Armas e Iglesia San Francisco.",
    descripcion: "Recorrido guiado por el centro patrimonial de la ciudad.",
    miniatura: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/San_Fernando_Plaza.jpg/500px-San_Fernando_Plaza.jpg"
  },
  {
    nombre: "Cementerio Municipal de San Fernando",
    apertura: "09:00",
    cierre: "17:30 (visitas fúnebres); atención general hasta 14:00",
    ubicacion: "Juan Jiménez 1266, San Fernando.",
    descripcion: "Espacio municipal con visitas fúnebres y atención al público.",
    miniatura: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cementerio_de_San_Fernando.jpg/500px-Cementerio_de_San_Fernando.jpg"
  },
  {
    nombre: "Trekking Cerro Pangalillo",
    apertura: "Consultar",
    cierre: "Consultar",
    ubicacion: "Final del camino Lircunlauta, sector La Olla.",
    descripcion: "Trekking de precordillera con flora y fauna nativa; el cerro va de 900 a 1165 msnm.",
    miniatura: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Cerro_en_la_cordillera_de_la_costa.jpg/500px-Cerro_en_la_cordillera_de_la_costa.jpg"
  },
  {
    nombre: "Ruta Laguna del Encanto",
    apertura: "Consultar",
    cierre: "Consultar",
    ubicacion: "Desde San Fernando por ruta a Puente Negro, siguiendo el camino a Termas del Flaco y luego el cruce hacia las sierras de Bella Vista.",
    descripcion: "Ruta de acceso a una laguna cordillerana en un entorno agreste.",
    miniatura: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Laguna_en_los_Andes.jpg/500px-Laguna_en_los_Andes.jpg"
  }
];
