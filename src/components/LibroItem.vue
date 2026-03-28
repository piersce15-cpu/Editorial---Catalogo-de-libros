<template>
  <!-- Tarjeta de libro -->
  <div class="libro-card" @click="seleccionarLibro">
    <h3>{{ titulo }}</h3>
    <p><strong>Autor:</strong> {{ autor }}</p>
    <p><strong>Categoría:</strong> {{ categoria }}</p>

    <!-- Botón para eliminar y editar el libro, emitimos un evento al padre -->
    <div class="botones-accion">
    <button class="btn eliminar" @click.stop="$emit('eliminar')">Eliminar</button>
    <button class="btn editar" @click.stop="$emit('editar')">Editar</button>
    </div>
  </div>
</template>

<script>
export default {// Definimos el nombre del componente
  name: 'LibroItem',
  // Definimos qué datos esperamos recibir del padre (App.vue)
  props: {
    titulo: String,
    autor: String,
    categoria: String
  },
  methods: {
  seleccionarLibro() {
    this.$emit('ver-detalle')// Emitimos un evento para que el padre sepa que este libro fue seleccionado
    this.$emit('seleccionado')// Emitimos otro evento para marcarlo como seleccionado (para resaltar la tarjeta)
  }
}
}
</script>

<style scoped>
.libro-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  margin: 15px auto;
  width: 100%;
  border-left: 5px solid #1e3a5f;
  transition: all 0.2s ease;
  text-align: left;
}

.libro-card:hover {
  transform: translateY(-5px);
}

.libro-card h3 {
  margin: 0 0 10px 0;
  color: #1a2a3a;
  font-family: 'Georgia', serif; /* Fuente con serifa para el título */
}

.botones-accion {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 15px;
}

.btn {
  background: transparent;
  border: 1px solid transparent;
  font-size: 13px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 20px;
  font-family: 'Georgia', serif;
  transition: all 0.2s ease;
}

.btn.editar {
  color: #1e3a5f;
  border-color: #1e3a5f;
}

.btn.editar:hover {
  background-color: #1e3a5f;
  color: white;
}

.btn.eliminar {
  color: #b91c1c;
  border-color: #b91c1c;
}

.btn.eliminar:hover {
  background-color: #b91c1c;
  color: white;
}
</style>