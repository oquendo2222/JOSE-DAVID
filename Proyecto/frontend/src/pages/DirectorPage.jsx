import React, { useState, useEffect } from "react";
import { getDirectores, createDirector, updateDirector, deleteDirector } from "../services/apiDirector";
import List from "../components/List";
import Form from "../components/Form";
const estadoOptions = [
  { value: 'Activo', label: 'Activo' },
  { value: 'Inactivo', label: 'Inactivo' },
];

const formatDate = (value) => (value ? new Date(value).toLocaleDateString('es-CO') : '-');

const DirectorPage = () => {
  const [directores, setDirectores] = useState([]);
  const [editingDirector, setEditingDirector] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "nombre", label: "Nombre", required: true },
    { name: "estado", label: "Estado", type: "select", options: estadoOptions, required: true }
  ];

  const listFields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'estado', label: 'Estado' },
    { label: 'Creado', render: (item) => formatDate(item.fechaCreacion) },
    { label: 'Actualizado', render: (item) => formatDate(item.fechaActualizacion) },
  ];

  useEffect(() => {
    loadDirectores();
  }, []);

  const loadDirectores = async () => {
    try {
      setLoading(true);
      const response = await getDirectores();
      setDirectores(response.data.data);
      setMessage("");
    } catch (error) {
      setMessage("Error al cargar los directores: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createDirector(data);
      setMessage("¡Director creado exitosamente!");
      loadDirectores();
      setEditingDirector(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (director) => {
    setEditingDirector(director);
    setMessage("");
  };

  const handleUpdate = async (data) => {
    try {
      await updateDirector(editingDirector._id, data);
      setMessage("¡Director actualizado exitosamente!");
      loadDirectores();
      setEditingDirector(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDirector(id);
      setMessage("¡Director eliminado exitosamente!");
      loadDirectores();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setEditingDirector(null);
    setMessage("");
  };

  return (
    <div className="page-container">
      <h1>Gestión de Directores</h1>
      {message && (
        <div className={`message ${message.startsWith("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}
      {loading && <p>Cargando...</p>}
      {!loading && (
        <List
          items={directores}
          onEdit={handleEdit}
          onDelete={handleDelete}
          fields={listFields}
        />
      )}
      <div className="form-section">
        <h2>{editingDirector ? "Editar Director" : "Crear Director"}</h2>
        <Form
          fields={fields}
          onSubmit={editingDirector ? handleUpdate : handleCreate}
          initialData={editingDirector || {}}
          onCancel={editingDirector ? handleCancel : null}
          isEditing={!!editingDirector}
        />
      </div>
    </div>
  );
};

export default DirectorPage;
