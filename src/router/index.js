import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegistView from '../views/RegistView.vue'
import HomeView from '../views/HomeView.vue'
import WriteView from '../components/WriteView.vue'
import RecieveView from '../components/RecieveView.vue'
import ConfigView from '../components/ConfigView.vue'
import MailContentView from '../components/MailContentView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/regist',
      name: 'regist',
      component: RegistView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/write',
          name: 'write',
          component: WriteView,
        },
        {
          path: '/recieve',
          name: 'recieve',
          component: RecieveView,
        },
        {
          path: '/mailconfig',
          name: 'mailconfig',
          component: ConfigView,
        }
      ]
    },
    {
        path: '/mailcontent',
        name: 'mailcontent',
        component: MailContentView,
    }
  ]
})

export default router
