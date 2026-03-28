import { NavLink, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GeneroPage from './pages/GeneroPage';
import DirectorPage from './pages/DirectorPage';
import ProductoraPage from './pages/ProductoraPage';
import TipoPage from './pages/TipoPage';
import MediaPage from './pages/MediaPage';
import './App.css';

const links = [
  { to: '/', label: 'Panel' },
  { to: '/media', label: 'Media' },
  { to: '/generos', label: 'Géneros' },
  { to: '/directores', label: 'Directores' },
  { to: '/productoras', label: 'Productoras' },
  { to: '/tipos', label: 'Tipos' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Ingeniería Web II</p>
          <h1>Administrador de Películas y Series</h1>
          <p className="app-subtitle">
            Gestión monolítica de catálogos y publicaciones multimedia con reglas de negocio por módulo.
          </p>
        </div>
        <nav className="app-nav" aria-label="Navegación principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/generos" element={<GeneroPage />} />
          <Route path="/directores" element={<DirectorPage />} />
          <Route path="/productoras" element={<ProductoraPage />} />
          <Route path="/tipos" element={<TipoPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
