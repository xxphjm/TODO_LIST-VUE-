<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
const { todoItem, HandleCompleteChange, DeleteTodo, OpenTodoWindow } = defineProps({
  todoItem: {
    type: Object,
    default: () => {}
  },
  HandleCompleteChange: {
    type: Function,
    default: () => {}
  },
  DeleteTodo: {
    type: Function,
    default: () => {}
  },
  OpenTodoWindow: {
    type: Function,
    default: () => {}
  }

})
/**
 * 開啟刪除訊息
 * @param {number} todoId - 待辦事項 ID
 */
const OpenDeleteMessage = (todoId) => {
  console.log(todoId)

  ElMessageBox.confirm('是否刪除該筆資料', '警告', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      DeleteTodo(todoId)
      ElMessage({
        type: 'success',
        message: '刪除成功'
      })
    })
    .catch(() => {})
}
</script>
<template>
  
  <el-card :body-style="{ fontSize: '14px', paddingTop: '5px', paddingBottom: '10px' }">
    <template #header>
      <div class="card-header">
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <el-checkbox
            :id="todoItem.id"
            :label="todoItem.title"
            :checked="todoItem.completed"
            @change="HandleCompleteChange(todoItem.id, !todoItem.completed)"
            :style="{
              whiteSpace: 'pre-wrap',
              textDecoration: todoItem.completed ? 'line-through' : 'none'
            }"
          />

          <el-tag
            key="completed"
            :type="todoItem.completed ? 'success' : 'warning'"
            effect="dark"
            :disable-transitions="true"
            :style="{ marginLeft: 'auto' }"
          >
            {{ todoItem.completed ? '已完成' : '未完成' }}
          </el-tag>
        </div>
      </div>
    </template>
    <div class="card-content">
      <p
        :style="{
          textDecoration: todoItem.completed ? 'line-through' : 'none',
          wordWrap: 'break-word'
        }"
      >
        {{ todoItem.description }}
      </p>
      <div :style="{ color: '#AEAEAE', display: 'flex', alignItems: 'center' }">
        <el-icon><Clock /></el-icon>
        <span>{{ todoItem.expiredDate }}</span>
        <div :style="{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }">
          <el-button
            icon="edit"
            size="large"
            style="font-size: 26px; color: #3f9eff"
            @click="OpenTodoWindow(todoItem)"
            circle
          ></el-button>
          <el-button
            icon="delete"
            size="large"
            style="font-size: 26px; color: #f56c6c"
            @click="OpenDeleteMessage(todoItem.id)"
            circle
          ></el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style>
.el-card {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-checkbox__label {
  font-size: 20px !important;
}
.el-card__header {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
</style>
