<script setup>
import { RouterView } from 'vue-router'
import HomeMenu from './components/HomeMenu.vue'
import { todoData } from './data/data'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
//取得路由
const route = useRoute()
const todos = reactive(todoData)
//取得待辦事項數量
const todoCount = computed(() => {
  return todos.filter((todo) => !todo.completed).length
})

/**
 * 取得面包屑
 * @returns {string}
 */
const breadcrumbItem = computed(() => {
  switch (route.path) {
    case '/':
      return '行事曆'
    case '/todos':
      return '我的待辦'
    default:
      return null
  }
})
// /**
//  * 更新待辦事項完成狀態
//  * @param {Array} newTodos - 新的待辦事項
//  */
// const UpdateTodos = (newTodos) => {
//   console.log(newTodos);
  
//   todos.value=newTodos
  
// }

</script>

<template>
  <div class="common-layout">
    <el-container :style="{ minHeight: '100vh' }">
      <HomeMenu :todoCount="todoCount" />
      <el-main>
        <el-breadcrumb>
          <el-breadcrumb-item>
            <el-icon><HomeFilled /></el-icon>
          </el-breadcrumb-item>
          <el-breadcrumb-item> {{ breadcrumbItem }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <RouterView :todos="todos" @update-todos="UpdateTodos" /> -->
        <RouterView :todos="todos" />
      </el-main>
      <el-footer :style="{ textAlign: 'center' }">
        Copyright © 2024 Sam Huang All rights reserved
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.el-main {
  flex: auto;
  min-height: 0;
  padding: 32px;
}
</style>
