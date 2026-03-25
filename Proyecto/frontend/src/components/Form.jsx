import React, { useState, useEffect } from 'react';
import './Form.css';

const Form = ({ fields, onSubmit, initialData = {}, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialData);
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar error al cambiar
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} es requerido`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({});
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';
    const commonProps = {
      id: field.name,
      name: field.name,
      value,
      onChange: handleChange,
      placeholder: field.placeholder || `Ingresa ${field.label.toLowerCase()}`,
      className: errors[field.name] ? 'input-error' : '',
      disabled: loading || field.disabled,
    };

    if (field.type === 'textarea') {
      return <textarea {...commonProps} rows={field.rows || 4} />;
    }

    if (field.type === 'select') {
      return (
        <select {...commonProps}>
          <option value="">Selecciona una opción</option>
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        {...commonProps}
        type={field.type || 'text'}
        min={field.min}
        max={field.max}
        step={field.step}
      />
    );
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        {fields.map(field => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            {renderField(field)}
            {field.helpText && <small className="field-help">{field.helpText}</small>}
            {errors[field.name] && (
              <span className="error-message">{errors[field.name]}</span>
            )}
          </div>
        ))}
        <div className="form-buttons">
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
          </button>
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
