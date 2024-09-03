<script lang="ts" setup>
import { reactive, ref, defineEmits } from 'vue'
import { FormRules ,ElMessage} from 'element-plus'
import { v4 } from 'uuid'
import moment from 'moment'

const formSize = ref('large')

const ruleFormRef = ref()

const props = defineProps({
  updateData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      expiredDate: new Date(),
      completed: false,
    }),
  },
  status: {
    type: String,
    default: 'add',
  },
});
const ruleForm = reactive(props.updateData)

const emit = defineEmits(['add-todo','update-todo'])
const rules = reactive<FormRules>({
  title: [
    { required: true, message: '請填寫標題', trigger: 'blur' },
    { min: 0, max: 50, message: '最多50字長度', trigger: 'blur' }
  ],
  description: [{ required: true, message: '請填寫描述事項', trigger: 'blur' }],
  expiredDate: [
    { required: true, message: '請選擇到期日', trigger: 'change' },
    { type: 'date', message: '日期格式錯誤', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value && value < new Date()) {
          callback(new Error('到期日不能小於當前日期'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  completed: [{ required: true, message: '請選擇是否完成', trigger: 'change' }]
})
/**
 * 送出表單內容
 * @param formEl
 */
const SubmitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm.expiredDate);
      
      emit(props.status==="add"?"add-todo":"update-todo", { id: v4(), ...ruleForm, expiredDate: moment(ruleForm.expiredDate).format("YYYY-MM-DD HH:mm")})
      ResetForm(formEl)
      ElMessage({
      message: `${props.status==="add"?"新增":"儲存"}成功`,
      type: 'success',
      });
    } else {
      return false
    }
  })
}
/**
 * 重設表單
 * @param formEl
 */
const ResetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    label-position="left"
    :size="formSize"
    status-icon
  >
    <el-form-item label="標題" prop="title">
      <el-input v-model="ruleForm.title" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="ruleForm.description" type="textarea" />
    </el-form-item>
    <el-form-item label="到期日" required>
      <el-col :span="11">
        <el-form-item prop="expiredDate">
          <el-date-picker
            v-model="ruleForm.expiredDate"
            type="datetime"
            placeholder="請選擇日期時間"
            format="YYYY-MM-DD HH:mm"
            date-format="MMM DD, YYYY"
            time-format="HH:mm"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="完成" prop="completed">
      <el-switch v-model="ruleForm.completed" inline-prompt active-text="是" inactive-text="否" />
    </el-form-item>

    <div style="text-align: right">
      <el-button class="btn" @click="ResetForm(ruleFormRef)">重設</el-button>
      <el-button type="primary" @click="SubmitForm(ruleFormRef)"> 
        {{  props.status==="add"?"新增":"儲存"}} 
      </el-button>
    </div>
  </el-form>
</template>
