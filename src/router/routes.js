import { createRouter, createWebHashHistory } from 'vue-router'

import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: InicioView
  },
  {
    path: '/libros',
    name: 'Catalogo',
    component: ListaLibros
  },
  {
    path: '/libros/:id',
    name: 'Detalle',
    component: DetalleLibro,
    props: true // Permite pasar el ID del libro como prop al componente DetalleLibro
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router