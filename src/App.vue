<template>
  <!-- Aplicación principal -->
  <div id="app">
    <nav class="main-nav">
      <router-link to="/">Inicio</router-link> | 
      <router-link to="/libros">Catálogo</router-link>
    </nav>
    <!-- Mostramos un mensaje de bienvenida solo en la página de inicio -->
    <h1 v-if="$route.path === '/'">Bienvenid@, {{ usuario }}!</h1>

    <!-- Aquí se renderizarán las vistas según la ruta, y escuchamos el evento para incrementar el contador de libros seleccionados -->
    <div class="contenido">
      <router-view @incrementar-contador="incrementarContador"></router-view>
    </div>
    <!-- Pie de página con el contador de libros seleccionados -->
    <footer class="footer">
      <p>Libros seleccionados: {{ contador }}</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {// Definimos el estado de la aplicación, incluyendo el nombre del usuario y un contador para los libros seleccionados
    return {
      usuario: "Piera",
      contador: 0
    }
  },
  methods: {
    incrementarContador() {// Método para incrementar el contador cada vez que se selecciona un libro
      this.contador++;
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: #f8f9fa; 
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.main-nav {
  background-color: #1e3a5f; 
  padding: 15px;
  border-radius: 0;
}

.main-nav a {
  color: #f1f5f9;
  margin: 0 15px;
  text-decoration: none;
  font-size: 16px;
}

.main-nav a:hover {
  border-bottom: 2px solid #facc15;
}

h1, h2 {
  font-family: 'Georgia', serif;
  color: #1e293b;
  margin-bottom: 20px;
}

button {
  background-color: #1e3a5f;
}

button:hover {
  background-color: #16324f;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0px 20px;
}

.footer {
  margin-top: 60px;
}

.contenido {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}
</style>