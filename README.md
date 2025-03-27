# 📱 Aplicación Híbrida de Comercio Electrónico

Aplicación móvil híbrida desarrollada con Ionic + Angular que incluye:
- ✅ Autenticación con Firebase  
- 🛒 Carrito de compras, pasarela de pagos 
- 📦 Consumo de API REST  
- 💾 Almacenamiento local  

## 🔑 Datos de Acceso
**Para pruebas**, utiliza estas credenciales:  
**Email**: `admin@gmail.com`  
**Contraseña**: `admin123`  

*(Asegúrate de que este usuario esté registrado en tu consola de Firebase)*

## 🛠 Instalación

### Requisitos previos
- Node.js v16+  
- Ionic CLI:  
  ```bash
  npm install -g @ionic/cli
  npm install -g firebase-tools
  Pasos
Clona el repositorio:

 ```bash
Copy
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo ```
Instala dependencias:

 ```bash
Copy
npm install ```
Configura Firebase:

Crea un proyecto en Firebase Console

Habilita Email/Password en Authentication

Copia tus credenciales a src/environments/environment.ts

Ejecuta la app:


ionic serve
🚀 Despliegue
Android
bash
Copy
ionic capacitor add android
ionic capacitor copy android
cd android && ./gradlew assembleDebug
iOS
bash
Copy
ionic capacitor add ios
ionic capacitor copy ios
# Abre Xcode y compila
📊 Estructura del Proyecto
Copy
src/
├── app/
│   ├── pages/          # Pantallas (login, home, cart)
│   ├── services/       # Lógica de negocio
│   └── app.module.ts   # Configuración principal
├── assets/             # Imágenes/fuentes
└── environments/       # Variables de entorno
🐛 Solución de Problemas
Error "Invalid API Key": Verifica tus credenciales en environment.ts

Pantalla en blanco: Ejecuta npm ci para reinstalar dependencias

Problemas con Firebase: Habilita Email/Password en Authentication

📄 Documentación Adicional
Ionic Framework Docs

Firebase Guide
## Posdata: profesor hice sola el trabajo mis compañeros de grupo no hicieron nada me ignoraron asi que lo hice sola gracias por su atención 😀👍🏻
