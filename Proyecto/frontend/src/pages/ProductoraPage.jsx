import React, { useState, useEffect } from "react";
import { getProductoras, createProductora, updateProductora, deleteProductora } from "../services/apiProductora";
import List from "../components/List";
import Form from "../components/Form";

const estadoOptions = [
  { value: 'Activo', label: 'Activo' },
  { value: 'Inactivo', label: 'Inactivo' },
];

const formatDate = (value) => (value ? new Date(value).toLocaleDateString('es-CO') : '-');

const ProductoraPage = () => {
  const [productoras, setProductoras] = useState([]);
  const [editingProductora, setEditingProductora] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "nombre", label: "Nombre", required: true },
    { name: "estado", label: "Estado", type: "select", options: estadoOptions, required: true },
    { name: "slogan", label: "Slogan", required: true },
    { name: "descripcion", label: "Descripción", type: "textarea", rows: 4, required: true }
  ];

  const listFields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'estado', label: 'Estado' },
    { key: 'slogan', label: 'Slogan' },
    { key: 'descripcion', label: 'Descripción' },
    { label: 'Actualizado', render: (item) => formatDate(item.fechaActualizacion) },
  ];

  useEffect(() => {
    loadProductoras();
  }, []);

  const loadProductoras = async () => {
    try {
      setLoading(true);
      const response = await getProductoras();
      setProductoras(response.data.data);
      setMessage("");
    } catch (error) {
      setMessage("Error al cargar las productoras: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createProductora(data);
      setMessage("¡Productora creada exitosamente!");
      loadProductoras();
      setEditingProductora(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (productora) => {
    setEditingProductora(productora);
    setMessage("");
  };

  const handleUpdate = async (data) => {
    try {
      await updateProductora(editingProductora._id, data);
      setMessage("¡Productora actualizada exitosamente!");
      loadProductoras();
      setEditingProductora(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductora(id);
      setMessage("¡Productora eliminada exitosamente!");
      loadProductoras();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setEditingProductora(null);
    setMessage("");
  };

  return (
    <div className="page-container">
      <h1>Gestión de Productoras</h1>
      {message && (
        <div className={`message ${message.startsWith("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}
      {loading && <p>Cargando...</p>}
      {!loading && (
        <List
          items={productoras}
          onEdit={handleEdit}
          onDelete={handleDelete}
          fields={listFields}
        />
      )}
      <div className="form-section">
        <h2>{editingProductora ? "Editar Productora" : "Crear Productora"}</h2>
        <Form
          fields={fields}
          onSubmit={editingProductora ? handleUpdate : handleCreate}
          initialData={editingProductora || { estado: 'Activo', slogan: '', descripcion: '' }}
          onCancel={editingProductora ? handleCancel : null}
          isEditing={!!editingProductora}
        />
      </div>
    </div>
  );
};

export default ProductoraPage;
