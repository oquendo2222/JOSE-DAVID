import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMedias } from '../services/apiMedia';
import { getDirectores } from '../services/apiDirector';
import { getGeneros } from '../services/apiGenero';
import { getProductoras } from '../services/apiProductora';
import { getTipos } from '../services/apiTipo';

const cards = [
  {
    title: 'Géneros',
    description: 'Administra el catálogo principal y controla su estado activo o inactivo.',
    route: '/generos',
    key: 'generos',
  },
  {
    title: 'Directores',
    description: 'Registra directores principales habilitados para publicar media.',
    route: '/directores',
    key: 'directores',
  },
  {
    title: 'Productoras',
    description: 'Mantén las productoras con su estado, slogan y descripción institucional.',
    route: '/productoras',
    key: 'productoras',
  },
  {
    title: 'Tipos',
    description: 'Configura tipos de contenido como película o serie y extensiones futuras.',
    route: '/tipos',
    key: 'tipos',
  },
  {
    title: 'Media',
    description: 'Publica películas y series enlazando solo catálogos válidos y activos.',
    route: '/media',
    key: 'media',
  },
];

function MainPage() {
  const [stats, setStats] = useState({ generos: 0, directores: 0, productoras: 0, tipos: 0, media: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const [generos, directores, productoras, tipos, media] = await Promise.all([
          getGeneros(),
          getDirectores(),
          getProductoras(),
          getTipos(),
          getMedias(),
        ]);

        setStats({
          generos: generos.data.data.length,
          directores: directores.data.data.length,
          productoras: productoras.data.data.length,
          tipos: tipos.data.data.length,
          media: media.data.data.length,
        });
        setError('');
      } catch (loadError) {
        setError(loadError.response?.data?.message || loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <section className="dashboard">
      <div className="panel hero-panel">
        <div>
          <p className="eyebrow">Caso de estudio</p>
          <h2>Panel del Administrador</h2>
          <p className="section-copy">
            La aplicación separa los cinco módulos exigidos y obliga a relacionar cada publicación con género,
            director y productora activos.
          </p>
        </div>
        <div className="hero-list">
          <span>Serial y URL únicos para cada publicación</span>
          <span>Fechas automáticas de creación y actualización</span>
          <span>Catálogos iniciales para géneros y tipos</span>
        </div>
      </div>

      {error && <div className="message-banner error">{error}</div>}

      <div className="stats-grid">
        {cards.map((card) => (
          <article key={card.key} className="panel stat-card">
            <p className="stat-value">{loading ? '...' : stats[card.key]}</p>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <Link to={card.route} className="panel-link">
              Ir al módulo
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MainPage;

