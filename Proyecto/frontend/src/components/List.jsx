import React, { useState } from 'react';
import './List.css';

const getValueByPath = (item, path) => path.split('.').reduce((acc, key) => acc?.[key], item);

const normalizeField = (field) => {
  if (typeof field === 'string') {
    return {
      key: field,
      label: field.charAt(0).toUpperCase() + field.slice(1),
    };
  }

  return field;
};

const List = ({ items, onEdit, onDelete, fields, viewMode = 'table' }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(null);
  const normalizedFields = fields.map(normalizeField);

  const handleDeleteClick = (id) => {
    setConfirmDelete(id);
  };

  const handleConfirmDelete = async (id) => {
    setLoading(id);
    try {
      await onDelete(id);
      setConfirmDelete(null);
    } finally {
      setLoading(null);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="list-container empty">
        <p>No hay registros disponibles</p>
      </div>
    );
  }

  if (viewMode === 'cards') {
    return (
      <div className="list-container">
        <div className="card-grid">
          {items.map(item => (
            <article className="media-card" key={item._id}>
              <div className="media-card-content">
                {normalizedFields.map(field => (
                  <div className="media-card-row" key={`${item._id}-${field.key || field.label}`}>
                    <span className="media-card-label">{field.label}:</span>
                    <span className="media-card-value">
                      {field.render ? field.render(item) : (getValueByPath(item, field.key) ? String(getValueByPath(item, field.key)) : '-')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="media-card-actions">
                <button
                  onClick={() => onEdit(item)}
                  className="btn btn-edit"
                  title="Editar"
                >
                  ✏️ Editar
                </button>
                {confirmDelete === item._id ? (
                  <div className="confirm-delete">
                    <p>¿Confirmar eliminación?</p>
                    <button
                      onClick={() => handleConfirmDelete(item._id)}
                      className="btn btn-danger"
                      disabled={loading === item._id}
                    >
                      {loading === item._id ? 'Eliminando...' : 'Sí'}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="btn btn-secondary"
                      disabled={loading === item._id}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="btn btn-delete"
                    title="Eliminar"
                  >
                    🗑️ Eliminar
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="table-responsive">
        <table className="list-table">
          <thead>
            <tr>
              {normalizedFields.map(field => (
                <th key={field.key || field.label}>{field.label}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id}>
                {normalizedFields.map(field => (
                  <td key={`${item._id}-${field.key || field.label}`}>
                    {field.render ? field.render(item) : (getValueByPath(item, field.key) ? String(getValueByPath(item, field.key)) : '-')}
                  </td>
                ))}
                <td className="actions">
                  <button 
                    onClick={() => onEdit(item)} 
                    className="btn btn-edit"
                    title="Editar"
                  >
                    ✏️ Editar
                  </button>
                  {confirmDelete === item._id ? (
                    <div className="confirm-delete">
                      <p>¿Confirmar eliminación?</p>
                      <button
                        onClick={() => handleConfirmDelete(item._id)}
                        className="btn btn-danger"
                        disabled={loading === item._id}
                      >
                        {loading === item._id ? 'Eliminando...' : 'Sí'}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="btn btn-secondary"
                        disabled={loading === item._id}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleDeleteClick(item._id)} 
                      className="btn btn-delete"
                      title="Eliminar"
                    >
                      🗑️ Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
