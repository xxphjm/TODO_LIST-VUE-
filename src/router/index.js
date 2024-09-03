import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoView from '../views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cland',
      component: HomeView
    },
    {
      path: '/cland',
      redirect: '/' // 將 /cland 重定向到 /
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodoView
    }
  ]
})
//middleware實作地方
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  next()
})
//通常處理錯誤
// router.afterEach((to, from) => {
//   // console.log(to, from)
// })

export default router
