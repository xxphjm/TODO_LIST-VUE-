<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  todoCount: {
    type: Number,
    default: 0
  }
})
//是否有未完成的待辦事項
const isAnyUncompletedTodoExist = !props.todoCount > 0
</script>
<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
    :ellipsis="false"
    :default-active="route.name"
  >
    <el-text :style="{ marginRight: 'auto', marginLeft: '30px' }" size="large">備忘錄</el-text>
    <el-menu-item index="cland">行事曆</el-menu-item>
    <el-menu-item index="todos">
      我的待辦
      <el-badge
        class="badge"
        :badge-style="{ verticalAlign: 'super' }"
        :hidden="isAnyUncompletedTodoExist"
        :value="todoCount"
      ></el-badge>
    </el-menu-item>
  </el-menu>
</template>
