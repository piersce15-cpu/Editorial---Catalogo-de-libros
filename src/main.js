import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'

createApp(App)
  .use(router)// Usamos el router en nuestra aplicación para manejar las rutas y vistas
  .mount('#app')// Montamos la aplicación en el elemento con id "app" del HTML
