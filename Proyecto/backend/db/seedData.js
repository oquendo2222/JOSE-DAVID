const Genero = require('../models/Generos');
const Tipo = require('../models/Tipo');

const initialGeneros = [
  { nombre: 'Acción', descripcion: 'Producciones con ritmo alto y escenas de acción.' },
  { nombre: 'Aventura', descripcion: 'Historias centradas en viajes, exploración y descubrimiento.' },
  { nombre: 'Ciencia ficción', descripcion: 'Narrativas con avances científicos, espaciales o futuristas.' },
  { nombre: 'Drama', descripcion: 'Relatos enfocados en conflictos humanos y emocionales.' },
  { nombre: 'Terror', descripcion: 'Producciones diseñadas para provocar tensión o miedo.' },
];

const initialTipos = [
  { nombre: 'Película', descripcion: 'Contenido audiovisual unitario.' },
  { nombre: 'Serie', descripcion: 'Contenido audiovisual dividido por episodios.' },
];

const ensureCatalogData = async () => {
  await Promise.all(
    initialGeneros.map((genero) =>
      Genero.updateOne(
        { nombre: genero.nombre },
        { $setOnInsert: { ...genero, estado: 'Activo' } },
        { upsert: true }
      )
    )
  );

  await Promise.all(
    initialTipos.map((tipo) =>
      Tipo.updateOne(
        { nombre: tipo.nombre },
        { $setOnInsert: tipo },
        { upsert: true }
      )
    )
  );
};

module.exports = ensureCatalogData;