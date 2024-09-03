<script setup>
import { ref } from 'vue'
import moment from 'moment'

// 建立日期狀態
const selectedDate = ref(new Date())
const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <el-calendar v-model="selectedDate">
    <!-- 使用 v-slot:date-cell 自訂日期儲存格的顯示內容 -->
    <template #date-cell="{ data }">
      <div>
        <!-- 日期顯示部分 -->
        <span>{{ data.date.getDate() }}</span>
        <!-- 自訂顯示內容，會追加到儲存格中 -->
      </div>
      <div class="todo-container">
        <div :class="data.day" v-for="todo in props.todos" :key="todo.id">
          <div v-if="moment(todo.expiredDate).format('YYYY-MM-DD') === data.day && !todo.completed">
            <el-tag>{{ todo.title }}</el-tag>
          </div>
        </div>
        <!-- <div v-if="filteredTodos.length > maxVisibleTodos" class="ellipsis">
        ...
      </div> -->
      </div>
    </template>
  </el-calendar>
</template>
<style scoped>
.date-cell {
  position: relative;
}

.todo-container {
  max-height: 100px; /* 設置顯示區域的最大高度 */
  overflow: hidden;
  position: relative;
}

.ellipsis {
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  padding: 0 5px;
}
</style>
