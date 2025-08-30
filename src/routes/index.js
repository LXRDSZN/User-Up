import { createRouter, createWebHistory } from 'vue-router'
import LoginViews from '@/views/Login/LoginViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginViews
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/DashboardViews.vue') 
    },
    {
      path:'/Registrate',
      name:'Registrate',
      component: () => import('@/views/Registro/RegistroView.vue')
    },
    {
      path:'/Alumnos',
      name:'Alumnos',
      component: ()=> import('@/views/Alumnos/AlumnosViews.vue')
    },
    {
      path:'/Docentes',
      name:'Docentes',
      component: () => import('@/views/Docentes/DocentesViews.vue')
    },
    {
      path:'/Materias',
      name:'Materias',
      component : () => import ('@/views/Materias/MateriasView.vue')
    },
    {
      path: '/Horarios',
      name:'Horarios',
      component: () => import('@/views/Horarios/HorariosViews.vue')
    },
    {
      path: '/Grupos',
      name:'Grupos',
      component :() => import('@/views/Horarios/HorariosViews.vue')
    },
    {
      path:'/Kardex',
      name:'Kardex',
      component: () => import('@/views/Kardex/KardexViews.vue')
    }
  ]
})

export default router
