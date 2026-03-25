import React, { useState, useEffect } from "react";
import { getMedias, createMedia, updateMedia, deleteMedia } from "../services/apiMedia";
import { getDirectores } from "../services/apiDirector";
import { getGeneros } from "../services/apiGenero";
import { getProductoras } from "../services/apiProductora";
import { getTipos } from "../services/apiTipo";
import List from "../components/List";
import Form from "../components/Form";

const MediaPage = () => {
  const [medias, setMedias] = useState([]);
  const [catalogs, setCatalogs] = useState({ generos: [], directores: [], productoras: [], tipos: [] });
  const [editingMedia, setEditingMedia] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const mapOptions = (items) => items.map((item) => ({ value: item._id, label: item.nombre }));

  const fields = [
    { name: "serial", label: "Serial", required: true },
    { name: "titulo", label: "Título", required: true },
    { name: "sinopsis", label: "Sinopsis", type: "textarea", rows: 5, required: true },
    { name: "url", label: "URL de la película", type: "url", required: true },
    { name: "imagenPortada", label: "Imagen de portada", type: "url", required: true },
    { name: "anioEstreno", label: "Año de estreno", type: "number", min: 1888, required: true },
    { name: "genero", label: "Género principal", type: "select", options: mapOptions(catalogs.generos), required: true },
    { name: "director", label: "Director principal", type: "select", options: mapOptions(catalogs.directores), required: true },
    { name: "productora", label: "Productora", type: "select", options: mapOptions(catalogs.productoras), required: true },
    { name: "tipo", label: "Tipo", type: "select", options: mapOptions(catalogs.tipos), required: true }
  ];

  const listFields = [
    {
      label: 'Portada',
      render: (item) => (
        <img
          src={item.imagenPortada}
          alt={item.titulo}
          className="poster-thumb"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      )
    },
    { key: 'serial', label: 'Serial' },
    { key: 'titulo', label: 'Título' },
    { label: 'Sinopsis', render: (item) => item.sinopsis },
    { label: 'Género', render: (item) => item.genero?.nombre || '-' },
    { label: 'Director', render: (item) => item.director?.nombre || '-' },
    { label: 'Productora', render: (item) => item.productora?.nombre || '-' },
    { label: 'Tipo', render: (item) => item.tipo?.nombre || '-' },
    { key: 'anioEstreno', label: 'Año' },
    {
      label: 'Enlace',
      render: (item) => (
        <a href={item.url} target="_blank" rel="noreferrer" className="inline-link">
          Abrir media
        </a>
      )
    }
  ];

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    try {
      setLoading(true);
      const [mediaRes, generosRes, directoresRes, productorasRes, tiposRes] = await Promise.all([
        getMedias(),
        getGeneros({ estado: 'Activo' }),
        getDirectores({ estado: 'Activo' }),
        getProductoras({ estado: 'Activo' }),
        getTipos(),
      ]);
      setMedias(mediaRes.data.data || []);
      setCatalogs({
        generos: generosRes.data.data || [],
        directores: directoresRes.data.data || [],
        productoras: productorasRes.data.data || [],
        tipos: tiposRes.data.data || [],
      });
      setMessage("");
    } catch (error) {
      setMessage("Error al cargar las medias: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createMedia(data);
      setMessage("¡Media creada exitosamente!");
      loadPage();
      setEditingMedia(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (media) => {
    setEditingMedia(media);
    setMessage("");
  };

  const handleUpdate = async (data) => {
    try {
      await updateMedia(editingMedia._id, data);
      setMessage("¡Media actualizada exitosamente!");
      loadPage();
      setEditingMedia(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedia(id);
      setMessage("¡Media eliminada exitosamente!");
      loadPage();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setEditingMedia(null);
    setMessage("");
  };

  return (
    <div className="page-container">
      <h1>Gestión de Películas y Series</h1>
      {message && (
        <div className={`message ${message.startsWith("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}
      {loading && <p>Cargando...</p>}
      {!loading && (
        <List
          items={medias}
          onEdit={handleEdit}
          onDelete={handleDelete}
          fields={listFields}
          viewMode="cards"
        />
      )}
      <div className="form-section">
        <h2>{editingMedia ? "Editar Media" : "Crear Media"}</h2>
        <Form
          fields={fields}
          onSubmit={editingMedia ? handleUpdate : handleCreate}
          initialData={editingMedia ? {
            ...editingMedia,
            genero: editingMedia.genero?._id || '',
            director: editingMedia.director?._id || '',
            productora: editingMedia.productora?._id || '',
            tipo: editingMedia.tipo?._id || '',
          } : { anioEstreno: '', sinopsis: '', url: '', imagenPortada: '' }}
          onCancel={editingMedia ? handleCancel : null}
          isEditing={!!editingMedia}
        />
      </div>
    </div>
  );
};

export default MediaPage;