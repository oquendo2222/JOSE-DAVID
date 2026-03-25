import React, { useState, useEffect } from "react";
import { getMedias, createMedia, updateMedia, deleteMedia } from "../services/apiMedia";
import List from "../components/List";
import Form from "../components/Form";

const MediaPage = () => {
  const [medias, setMedias] = useState([]);
  const [editingMedia, setEditingMedia] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "title", label: "Título", required: true },
    { name: "director", label: "Director" },
    { name: "year", label: "Año", type: "number" },
    { name: "genre", label: "Género" },
    { name: "type", label: "Tipo (Película/Serie)", required: true }
  ];

  useEffect(() => {
    loadMedias();
  }, []);

  const loadMedias = async () => {
    try {
      setLoading(true);
      const response = await getMedias();
      setMedias(Array.isArray(response.data) ? response.data : response.data.data);
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
      loadMedias();
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
      loadMedias();
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
      loadMedias();
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
          fields={["title", "director", "year", "genre", "type"]}
          viewMode="cards"
        />
      )}
      <div className="form-section">
        <h2>{editingMedia ? "Editar Media" : "Crear Media"}</h2>
        <Form
          fields={fields}
          onSubmit={editingMedia ? handleUpdate : handleCreate}
          initialData={editingMedia || {}}
          onCancel={editingMedia ? handleCancel : null}
          isEditing={!!editingMedia}
        />
      </div>
    </div>
  );
};

export default MediaPage;