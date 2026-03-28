<template>
  <!-- Lista de libros -->
  <div class="lista-container">
    <!-- Campo de búsqueda para filtrar por autor o categoría -->
    <div class="filtro-container">
      <input v-model="filtro" placeholder="Buscar por autor o categoría" class="filtro-input"/>
    </div>
    <h2>Catálogo de Libros</h2>
    <!-- Sección del formulario para añadir nuevos libros -->
    <button class="toggle-btn" @click="mostrarFormulario = !mostrarFormulario">{{ mostrarFormulario ? 'Ocultar formulario ▲' : 'Añadir nuevo libro ▼' }}</button>
    <section v-if="mostrarFormulario" class="formulario-seccion">
      <h3>{{ editandoIndex !== null ? 'Editar Libro' : 'Añadir Nuevo Libro' }}</h3>
        <form @submit.prevent="agregarLibro">
        <input v-model="nuevoLibro.titulo" placeholder="Título" required />
        <input v-model="nuevoLibro.autor" placeholder="Autor" required />
        <select v-model="nuevoLibro.categoria" required>
          <option value="">Selecciona categoría</option>
          <option>Novela</option>
          <option>Ciencia Ficción</option>
          <option>Fantasía</option>
          <option>Romance</option>
          <option>Misterio</option>
          <option>Thriller</option>
          <option>Historia</option>
          <option>Biografía</option>
          <option>Poesía</option>
          <option>Autoayuda</option>
          <option>Infantil</option>
          <option>Juvenil</option>
          <option>Ensayo</option>
        </select>
        <textarea v-model="nuevoLibro.resumen" placeholder="Resumen"></textarea>
        <button type="submit">{{ editandoIndex !== null ? 'Actualizar Libro' : 'Guardar Libro' }}</button>
      </form>
      <!-- Vista previa del libro que se está añadiendo o editando -->
      <div v-show="nuevoLibro.titulo" class="preview">
        <p>Vista previa: <strong>{{ nuevoLibro.titulo }}</strong> - {{ nuevoLibro.autor }}</p>
      </div>
    </section>


<!-- Si hay libros en general -->
<div v-if="libros.length > 0">

  <!-- GRID solo si hay resultados del filtro -->
  <div v-if="librosFiltrados.length > 0" class="libros-grid">
    <div 
      v-for="libro in librosFiltrados" 
      :key="libro.id"
    >
    <!-- Componente para mostrar cada libro, con eventos para ver detalle, eliminar y editar -->
      <LibroItem 
        :titulo="libro.titulo" 
        :autor="libro.autor" 
        :categoria="libro.categoria"
        @ver-detalle="$router.push(`/libros/${libro.id}`)"
        @seleccionado="$emit('incrementar-contador')"
        @eliminar="eliminarLibro(libro.id)"
        @editar="editarLibro(libro.id)"
      />
      </div>
    </div>

    <!-- MENSAJE DE FILTRO VACÍO -->
    <p v-else>No se encontraron resultados</p>

  </div>

  <!-- SI NO HAY LIBROS EN GENERAL -->
  <p v-else>No hay libros disponibles.</p>

</div>
</template>

<script>
import LibroItem from '../components/LibroItem.vue'// Importamos el componente que muestra cada libro en la lista

export default {
  name: 'ListaLibros',
  components: { LibroItem },// Registramos el componente para poder usarlo en la plantilla
  data() {
    return {
      libros: [
        { id: 1, titulo: "El Gran Gatsby", autor: "F. Scott Fitzgerald", categoria: "Novela" },
        { id: 2, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", categoria: "Novela" },
        { id: 3, titulo: "1984", autor: "George Orwell", categoria: "Ciencia Ficción" }
      ],
      nuevoLibro: { titulo: "", autor: "", categoria: "", resumen: "" },
      filtro: "",
      editandoIndex: null,
      mostrarFormulario: false
    }
  },
  mounted() {
  const librosGuardados = localStorage.getItem('libros');// Intentamos cargar los libros desde localStorage

  if (librosGuardados) {
    this.libros = JSON.parse(librosGuardados);
  } else {
    // Guardar libros iniciales en localStorage
    localStorage.setItem('libros', JSON.stringify(this.libros));
  }
},
  watch: {// Cada vez que cambie la lista de libros, la guardamos en localStorage para persistencia
  libros: {
    handler() {
      localStorage.setItem('libros', JSON.stringify(this.libros));
    },
    deep: true
  }
  },
  methods: {
  agregarLibro() {
    if (!this.nuevoLibro.titulo.trim() || !this.nuevoLibro.autor.trim()) {// Validamos que título y autor no estén vacíos
      alert("Completa título y autor");
      return;
    }
    if (this.editandoIndex !== null) {// Si estamos editando, actualizamos el libro existente
      this.libros[this.editandoIndex] = {
        id: this.libros[this.editandoIndex].id, 
        ...this.nuevoLibro
      };
      this.editandoIndex = null;
    } else {// Si no, añadimos un nuevo libro con un ID único basado en la fecha actual
      this.libros.push({ id: Date.now(), ...this.nuevoLibro });
    }

    this.nuevoLibro = { titulo: "", autor: "", categoria: "", resumen: "" };
    this.mostrarFormulario = false;// Ocultamos el formulario después de añadir o editar un libro
  },

    eliminarLibro(id) {
    const index = this.libros.findIndex(l => l.id === id);// Buscamos el índice del libro que queremos eliminar
    if (index !== -1) {
    this.libros.splice(index, 1);// Si lo encontramos, lo eliminamos de la lista
  }
  },

    editarLibro(id) {
      const index = this.libros.findIndex(l => l.id === id);// Buscamos el índice del libro que queremos editar
      this.nuevoLibro = { ...this.libros[index] };// Si lo encontramos, cargamos sus datos en el formulario para editar
      this.editandoIndex = index;
      this.mostrarFormulario = true;// Mostramos el formulario para editar el libro
    }
  },
  computed: {
  librosFiltrados() {
  return this.libros.filter(libro =>
    (libro.autor || "").toLowerCase().includes(this.filtro.toLowerCase()) ||
    (libro.categoria || "").toLowerCase().includes(this.filtro.toLowerCase())
  );
}
} 
}
</script>

<style>
.toggle-btn {
  margin: 20px 0;
  padding: 10px 15px;
  background-color: #1e3a5f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.toggle-btn:hover {
  background-color: #14263d;
}

.formulario-seccion {
  background: white;
  border-radius: 10px;
  padding: 25px;
  width: 400px;
  margin: 20px auto;
  border-top: 5px solid #1e3a5f;
}

form input, 
form select, 
form textarea {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 90%;
  border-radius: 6px;
  border: 1px solid #ccc;
}

form button {
  background-color: #42b983;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

form button:hover {
  background-color: #369870;
}
.preview {
  color: #666;
  font-size: 0.9em;
  margin-top: 10px;
}
.filtro-container {
  margin: 20px 0;
}

.filtro-input {
  width: 300px;
  padding: 10px 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.filtro-input:focus {
  border-color: #1e3a5f;
  box-shadow: 0 0 5px rgba(30, 58, 95, 0.2);
}

.libros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-content: center; 
  gap: 80px;
  padding: 30px;
}

.lista-container {
  margin: 0;
}

.lista-container h2 {
  margin-bottom: 30px;
}

</style>