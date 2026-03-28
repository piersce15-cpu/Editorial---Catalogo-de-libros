<template>
  <!--Inicio de la página-->
  <div class="inicio">
    <h1>Bienvenido a la Editorial Nova</h1>
    <p>Gestiona tu catálogo de libros de forma rápida y sencilla.</p>
    <router-link to="/libros">
      <button>Ver Catálogo</button>
    </router-link>
  </div>
</template>

<style>
.inicio {
  background: white;
  padding: 50px 40px; 
  border-radius: 16px;
  width: 500px; 
  margin: 0 auto; 
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.inicio h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.inicio p {
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
}

.inicio button {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
}

button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #369870;
}

</style>