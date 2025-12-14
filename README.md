# 🎮 GAMESTOCK

GameStock es una tienda web de videojuegos ficticia desarrollada con **React** y  **Firebase** , que permite a usuario navegar, buscar y comprar productos, y a administradores gestionar visibilidad y acceso a funcionalidades avanzadas. El proyecto fue realizado como proyecto final para el curso de **React JS de Talento Tech**.

Acceso: https://tt-react-gamma.vercel.app/

---

## 🚀 Tecnologías utilizadas

* **React** (Vite)
* **React Router DOM**
* **Firebase Firestore**
* **Context API** (Auth & Cart)
* **React Toastify** (notificaciones)
* **Font Awesome** (iconos)
* **CSS** (estilos)

---

## 👤 Roles de usuario

### Usuario normal

* Ver productos disponibles
* Visualizar datos de productos
* Buscar productos
* Agregar productos al carrito
* Realizar compras

### Administrador

* Acceso a Dashboard
* Ver productos ocultos (`visibility: false`)
* Cargar nuevos productos
* Editar datos de productos cargados

---

## 🔐 Autenticación

Sistema de autenticación **simulado** usando `localStorage`.

### Credenciales Admin (testing)

```
Usuario: admin
Contraseña: 1234.react
```

Incluye:

* Persistencia de sesión
* Logout
* Autofill de datos para testing

---

## 🛒 Carrito de compras

Funcionalidades:

* Agregar / quitar productos
* Control de cantidad
* Cálculo automático de subtotal y total
* Vaciar carrito

### Checkout

* Información de tarjeta ficticia
* Información de facturación
* Checkbox para autocompletar datos
* Notificación al confirmar compra 🎉

---

## 👁️ Visibilidad de productos

Cada producto en Firebase posee el campo:

```js
visibility: true | false
```

* Usuarios normales **no ven** productos con visibilty `false`
* Admin **sí los ve**
* Se muestra un icono (👁️) la derecha de la imagen del producto

---

## 🔍 Búsqueda y paginación

* Búsqueda por nombre
* Paginación numérica
* Grid dinámico responsive

---

## ⚙️ Instalación

```bash
npm install
npm run dev
```

---

## 📌 Notas

* Proyecto realizado para demostrar conocimientos en las tecnologias anteriormente mencionadas
* Autenticación y pagos **no son reales**

---

## 🔨Próximas funcionalidades a agregar

* Permitir registro de usuarios (firebase u otro gestor)
* Agregar tags a productos
* Permitir busqueda más personalizadas (por precio, tags, etc)
* Subida de imagenes/videos a productos (banner y dentro de detalles de producto)
* Tema oscuro y claro
* Selector de idioma de la página
