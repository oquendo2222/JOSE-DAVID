import React, { useState, useEffect } from "react";
import { getTipos, createTipo, updateTipo, deleteTipo } from "../services/apiTipo";
import List from "../components/List";
import Form from "../components/Form";

const TipoPage = () => {
  const [tipos, setTipos] = useState([]);
  const [editingTipo, setEditingTipo] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "nombre", label: "Nombre", required: true },
    { name: "descripcion", label: "Descripción" }
  ];

  useEffect(() => {
    loadTipos();
  }, []);

  const loadTipos = async () => {
    try {
      setLoading(true);
      const response = await getTipos();
      setTipos(response.data.data);
      setMessage("");
    } catch (error) {
      setMessage("Error al cargar los tipos: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createTipo(data);
      setMessage("¡Tipo creado exitosamente!");
      loadTipos();
      setEditingTipo(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (tipo) => {
    setEditingTipo(tipo);
    setMessage("");
  };

  const handleUpdate = async (data) => {
    try {
      await updateTipo(editingTipo._id, data);
      setMessage("¡Tipo actualizado exitosamente!");
      loadTipos();
      setEditingTipo(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTipo(id);
      setMessage("¡Tipo eliminado exitosamente!");
      loadTipos();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setEditingTipo(null);
    setMessage("");
  };

  return (
    <div className="page-container">
      <h1>Gestión de Tipos</h1>
      {message && (
        <div className={`message ${message.startsWith("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}
      {loading && <p>Cargando...</p>}
      {!loading && (
        <List
          items={tipos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          fields={["nombre", "descripcion"]}
        />
      )}
      <div className="form-section">
        <h2>{editingTipo ? "Editar Tipo" : "Crear Tipo"}</h2>
        <Form
          fields={fields}
          onSubmit={editingTipo ? handleUpdate : handleCreate}
          initialData={editingTipo || {}}
          onCancel={editingTipo ? handleCancel : null}
          isEditing={!!editingTipo}
        />
      </div>
    </div>
  );
};

export default TipoPage;
