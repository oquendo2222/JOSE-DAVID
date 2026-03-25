# 📺 Frontend - Sistema de Gestión de Medios

Interfaz minimalista en React para consultar datos del backend mediante peticiones HTTP y mostrarlos en formato JSON.

---

## ✨ Características

<div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">

- 🔘 Botones para hacer peticiones a diferentes endpoints de la API
- 📊 Visualización cruda de datos en formato JSON
- 🎯 Sin navegación ni formularios complejos
- 🔗 Conexión directa con API REST

</div>

---

## 🛠️ Tecnologías utilizadas

<div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #17a2b8;">

- ⚛️ **React 19**
- 📡 **Axios** para llamadas HTTP
- ⚡ **Vite** como bundler
- 📝 **ESLint** para linting

</div>

---

## 📦 Instalación

<div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px;">

```bash
npm install
```

</div>

---

## 🚀 Ejecución en desarrollo

<div style="background-color: #fffacd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">

```bash
npm run dev
```

La aplicación estará disponible en:
- 🌐 **http://localhost:5173**

</div>

---

## 📋 Funcionalidad

<div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px;">

La aplicación presenta botones para consultar diferentes tipos de datos:

- 🎬 Películas/Series
- 🎭 Directores
- 🎨 Géneros
- 🏢 Productoras
- 📂 Tipos

Cada botón realiza una petición **GET** al endpoint correspondiente del backend y muestra la respuesta en formato **JSON**.

</div>

---

## 🏗️ Construcción para producción

<div style="background-color: #e8f8de; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">

```bash
npm run build
```

</div>

---

## 👁️ Vista previa de producción

<div style="background-color: #f8e8e8; padding: 15px; border-radius: 8px; border-left: 4px solid #dc3545;">

```bash
npm run preview
```

</div>

---

## 📁 Estructura del proyecto

<div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px;">

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── services/      # Servicios para llamadas a la API
├── App.jsx        # Componente principal
├── main.jsx       # Punto de entrada
└── index.css      # Estilos globales
```

</div>
