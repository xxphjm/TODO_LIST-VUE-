<script setup>
import { reactive, ref } from 'vue'
import TodoItem from '../components/TodoItem.vue'
import TodoModel from '../components/TodoModel.vue'

const queryType = ref('all')
const isAddDialog = ref(false)
const isUpdateDialog = ref(false)
const updateData = reactive({})
const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  }
})
const todos = reactive(props.todos)
// const emit = defineEmits(['update-todos'])
/**
 * 根據查詢類型取得待辦事項
 * @returns {Array}
 */
const GetTodos = () => {
  switch (queryType.value) {
    case 'completed':
      return todos.filter((todo) => todo.completed)
    case 'uncompleted':
      return todos.filter((todo) => !todo.completed)
    case 'all':
    default:
      return todos
  }
}

/**
 * 刪除待辦事項
 * @param {number} id - 待辦事項 ID
 */
const DeleteTodo = (todoId) => {
  const index = todos.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
    todos.splice(index, 1); // 使用 splice 刪除特定索引處的項目
  }
  // emit('update-todos', todos)
}

/**
 * 選取待辦事項已完成或未完成
 * @param {number} id - 待辦事項 ID
 * @param {boolean} isCompleted - 是否完成
 */
const HandleCompleteChange = (todoId, isCompleted) => {

  const index = todos.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
    // 直接修改指定索引處的物件
    Object.assign(todos[index], {completed:isCompleted}); // 使用 Object.assign 確保 Vue 正確監控變更
  }
  // emit('update-todos', todos)
}
/**
 * 開啟新增待辦事項視窗
 */
const OpenTodoWindow = (todoItem) => {
  console.log(todoItem);
  
  if(todoItem){
    Object.assign(updateData, todoItem)
    
    isUpdateDialog.value = true
  }
  else{
    isAddDialog.value = true
  }
}
/**
 * 新增待辦事項
 */
const AddTodo = (todoData) => {

  todos.push(todoData)
  isAddDialog.value = false
}
/**
 * 更新待辦事項
 */
const UpdateTodo = (todoData) => {
  const index = todos.findIndex(todo => todo.id === todoData.id);
  if (index !== -1) {
    // 直接修改指定索引處的物件
    Object.assign(todos[index], todoData); // 使用 Object.assign 確保 Vue 正確監控變更
  }
  isUpdateDialog.value = false
}
</script>
<template>
      <el-dialog v-model="isAddDialog" title="待辦事項" status="add">
      <TodoModel @add-todo="AddTodo" />
    </el-dialog>
    <el-dialog v-model="isUpdateDialog" title="待辦事項">
      <TodoModel @update-todo="UpdateTodo" :updateData="updateData" status="update"/>
    </el-dialog>
  <div :style="{ background: '#FFF', padding: '10px', marginTop: '10px' }">
    <div :style="{ display: 'flex', alignItems: 'center' }">
      <el-radio-group v-model="queryType">
        <el-radio-button label="全部" value="all" />
        <el-radio-button label="已完成" value="completed" />
        <el-radio-button label="未完成" value="uncompleted" />
      </el-radio-group>
      <el-button type="primary" :style="{ marginLeft: 'auto' }" @click="()=>OpenTodoWindow()" icon="plus">新增代辦</el-button>
    </div>

    <div v-if="GetTodos().length > 0">
      <TodoItem
        v-for="todoitem in GetTodos()"
        :key="todoitem.id"
        :todoItem="todoitem"
        :HandleCompleteChange="HandleCompleteChange"
        :DeleteTodo="DeleteTodo"
        :OpenTodoWindow="OpenTodoWindow"
      />
    </div>
    <el-empty v-else description="無資料" />
  </div>
</template>

<style>

</style>
