import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/tenants',
      name: 'tenants',
      component: () => import('../views/TenantsView.vue')
    },
    {
      path: '/contracts',
      name: 'contracts',
      component: () => import('../views/ContractsView.vue')
    },
    {
      path: '/billing',
      name: 'billing',
      component: () => import('../views/BillingView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/parcels',
      name: 'parcels',
      component: () => import('../views/ParcelsView.vue')
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/ReportsView.vue')
    }
  ]
})

export default router