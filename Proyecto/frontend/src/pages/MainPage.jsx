import React, { useState, useEffect } from 'react';
import { getMedias, createMedia } from '../services/apiMedia';
import { getDirectores } from '../services/apiDirector';
import { getGeneros } from '../services/apiGenero';
import { getProductoras } from '../services/apiProductora';
import { getTipos } from '../services/apiTipo';
import '../App.css';

function MainPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newMedia, setNewMedia] = useState({ title: '', director: '', year: '', genre: '', type: '' });

  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [genresRes, typesRes, directorsRes, moviesRes] = await Promise.all([
          getGeneros(),
          getTipos(),
          getDirectores(),
          getMedias()
        ]);
        setGenres(genresRes.data.data || []);
        setTypes(typesRes.data.data || []);
        setDirectors(directorsRes.data.data || []);
        setAllMovies(Array.isArray(moviesRes.data) ? moviesRes.data : moviesRes.data.data || []);
      } catch (err) {
        console.error('Error loading options:', err);
      }
    };
    loadOptions();
  }, []);

  const loadData = async (type) => {
    try {
      setLoading(true);
      setError('');
      let response;

      switch (type) {
        case 'medias':
          response = await getMedias();
          setData({ type: 'Películas/Series', data: Array.isArray(response.data) ? response.data : response.data.data || [] });
          break;
        case 'directores':
          const uniqueDirectors = [...new Set(allMovies.map(m => m.director))].filter(d => d).map(name => ({ nombre: name }));
          setData({ type: 'Directores', data: uniqueDirectors });
          break;
        case 'generos':
          const uniqueGenres = [...new Set(allMovies.map(m => m.genre))].filter(g => g).map(name => ({ nombre: name }));
          setData({ type: 'Géneros', data: uniqueGenres });
          break;
        case 'productoras':
          response = await getProductoras();
          setData({ type: 'Productoras', data: response.data.data || [] });
          break;
        case 'tipos':
          const uniqueTypes = [...new Set(allMovies.map(m => m.type))].filter(t => t).map(name => ({ nombre: name }));
          setData({ type: 'Tipos', data: uniqueTypes });
          break;
        default:
          break;
      }
    } catch (err) {
      setError('Error al cargar los datos: ' + (err.response?.data?.message || err.message));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMedia = async () => {
    try {
      await createMedia(newMedia);
      setNewMedia({ title: '', director: '', year: '', genre: '', type: '' });
      // Reload allMovies and options
      const moviesRes = await getMedias();
      setAllMovies(Array.isArray(moviesRes.data) ? moviesRes.data : moviesRes.data.data || []);
      loadData('medias');
    } catch (err) {
      setError('Error al crear película: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="main-page">
      <h1>Sistema de Gestión de Medios</h1>

      <div className="buttons-section">
        <h2>Hacer petición para ver datos:</h2>
        <div className="buttons">
          <button onClick={() => loadData('medias')} disabled={loading}>
            Ver Películas/Series
          </button>
          <button onClick={() => loadData('directores')} disabled={loading}>
            Ver Directores
          </button>
          <button onClick={() => loadData('generos')} disabled={loading}>
            Ver Géneros
          </button>
          <button onClick={() => loadData('productoras')} disabled={loading}>
            Ver Productoras
          </button>
          <button onClick={() => loadData('tipos')} disabled={loading}>
            Ver Tipos
          </button>
        </div>
      </div>

      <div className="add-section">
        <h2>Agregar Nueva Película/Serie</h2>
        <input type="text" placeholder="Título" value={newMedia.title} onChange={e => setNewMedia({...newMedia, title: e.target.value})} />
        <input type="text" placeholder="Director" value={newMedia.director} onChange={e => setNewMedia({...newMedia, director: e.target.value})} />
        <input type="number" placeholder="Año" value={newMedia.year} onChange={e => setNewMedia({...newMedia, year: e.target.value})} />
        <input type="text" placeholder="Género" value={newMedia.genre} onChange={e => setNewMedia({...newMedia, genre: e.target.value})} />
        <input type="text" placeholder="Tipo" value={newMedia.type} onChange={e => setNewMedia({...newMedia, type: e.target.value})} />
        <button onClick={handleCreateMedia}>Agregar Película/Serie</button>
      </div>

      {error && <div className="error">{error}</div>}

      {data && !loading && (
        <div className="data-display">
          <h3>{data.type} ({data.data.length} registros)</h3>
          {data.type === 'Películas/Series' ? (
            <div className="movies-list">
              {data.data.map((movie, index) => (
                <div key={movie._id || index} className="movie-card">
                  <h4>{movie.title}</h4>
                  <p><strong>Director:</strong> {movie.director}</p>
                  <p><strong>Año:</strong> {movie.year}</p>
                  <p><strong>Género:</strong> {movie.genre}</p>
                  <p><strong>Tipo:</strong> {movie.type}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="items-list">
              {data.data.map((item, index) => (
                <div key={item._id || index} className="item">
                  <span>{item.nombre}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MainPage;

