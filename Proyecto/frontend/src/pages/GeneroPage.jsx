import React, { useState, useEffect } from "react";
import { getGeneros, createGenero, updateGenero, deleteGenero } from "../services/apiGenero";
import List from "../components/List";
import Form from "../components/Form";

const estadoOptions = [
  { value: 'Activo', label: 'Activo' },
  { value: 'Inactivo', label: 'Inactivo' },
];

const formatDate = (value) => (value ? new Date(value).toLocaleDateString('es-CO') : '-');

const GeneroPage = () => {
  const [generos, setGeneros] = useState([]);
  const [editingGenero, setEditingGenero] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "nombre", label: "Nombre", required: true },
    { name: "estado", label: "Estado", type: "select", options: estadoOptions, required: true },
    { name: "descripcion", label: "Descripción", type: "textarea", rows: 4, required: true }
  ];

  const listFields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'estado', label: 'Estado' },
    { key: 'descripcion', label: 'Descripción' },
    { label: 'Actualizado', render: (item) => formatDate(item.fechaActualizacion) },
  ];

  useEffect(() => {
    loadGeneros();
  }, []);

  const loadGeneros = async () => {
    try {
      setLoading(true);
      const response = await getGeneros();
      setGeneros(response.data.data);
      setMessage("");
    } catch (error) {
      setMessage("Error al cargar los géneros: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createGenero(data);
      setMessage("¡Género creado exitosamente!");
      loadGeneros();
      setEditingGenero(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (genero) => {
    setEditingGenero(genero);
    setMessage("");
  };

  const handleUpdate = async (data) => {
    try {
      await updateGenero(editingGenero._id, data);
      setMessage("¡Género actualizado exitosamente!");
      loadGeneros();
      setEditingGenero(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGenero(id);
      setMessage("¡Género eliminado exitosamente!");
      loadGeneros();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setEditingGenero(null);
    setMessage("");
  };

  return (
    <div className="page-container">
      <h1>Gestión de Géneros</h1>
      {message && (
        <div className={`message ${message.startsWith("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}
      {loading && <p>Cargando...</p>}
      {!loading && (
        <List
          items={generos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          fields={listFields}
        />
      )}
      <div className="form-section">
        <h2>{editingGenero ? "Editar Género" : "Crear Género"}</h2>
        <Form
          fields={fields}
          onSubmit={editingGenero ? handleUpdate : handleCreate}
          initialData={editingGenero || { estado: 'Activo', descripcion: '' }}
          onCancel={editingGenero ? handleCancel : null}
          isEditing={!!editingGenero}
        />
      </div>
    </div>
  );
};

export default GeneroPage;
