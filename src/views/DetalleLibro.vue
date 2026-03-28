<template>
  <!-- Detalle del libro seleccionado -->
  <div class="detalle">
    <h2>Detalle del Libro</h2>
    <div v-if="libro">
      <h3>{{ libro.titulo }}</h3>
      <p><strong>Autor:</strong> {{ libro.autor }}</p>
      <p><strong>Categoría:</strong> {{ libro.categoria }}</p>
      <p v-if="libro.resumen"><strong>Resumen:</strong> {{ libro.resumen }}</p>
    </div>
    <!-- Si no se encuentra el libro, mostramos un mensaje -->
    <p v-else>Libro no encontrado</p>
    <!-- Enlace para volver al catálogo de libros -->
    <router-link to="/libros">Volver al catálogo</router-link>
  </div>
</template>

<script>
export default {
  name: 'DetalleLibro',
  props: ['id'],// Recibimos el ID del libro a través de las props (gracias a la configuración de rutas)
  data() {
  return {
    libros: []// Aquí almacenaremos la lista de libros, que puede venir de localStorage o de un fallback con libros base
    }
  },
  mounted() {
  const librosGuardados = localStorage.getItem('libros');// Intentamos cargar los libros desde localStorage

  if (librosGuardados) {
    this.libros = JSON.parse(librosGuardados);// Si encontramos libros guardados, los usamos
  } else {
    // fallback con libros base 
    this.libros = [
      { id: 1, titulo: "El Gran Gatsby", autor: "F. Scott Fitzgerald", categoria: "Novela" },
      { id: 2, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", categoria: "Novela" },
      { id: 3, titulo: "1984", autor: "George Orwell", categoria: "Ciencia Ficción" }
    ];
  }
},
  computed: {
    libro() {
      return this.libros.find(l => Number(l.id) === Number(this.id));// Buscamos el libro que coincida con el ID recibido por props
    }
  }
}
</script>

<style scoped>
.detalle { 
  padding: 20px;
  margin-top: 20px;
 
}

.detalle h2 {
  font-size: 28px;
  margin-bottom: 30px; 
  color: #1e3a5f;
  text-decoration: underline;
  
}
.detalle h3 {
  font-size: 26px;
  margin-bottom: 30px; 
  color: #1c4479;
  
}


</style>