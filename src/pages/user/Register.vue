<template>
  <el-card class="ep-bg-purple">
    <el-text size="large" tag="b" type="info">注册新用户</el-text>
    <br />
    <el-icon size="150px">
      <Avatar />
    </el-icon>
    <el-form ref="registerFormRef" :model="registerForm" status-icon :rules="rules" label-width="70px" class="Register">
      <el-form-item label="昵称" prop="name">
        <el-input v-model="registerForm.name" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="registerForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认" prop="repassword">
        <el-input v-model="registerForm.repassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(registerFormRef)">注册</el-button>
        <el-button @click="resetForm(registerFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-row justify="center" align="center" :gutter="20">
      <el-col :span="50">
        <el-text>
          已有帐户？
          &nbsp
          <el-link :underline="false" type="primary" href="/login">登录</el-link>
        </el-text>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { FormInstance, FormRules, ElMessage } from 'element-plus';
import router from "../../routers";
import userService from '../../apis/userService'

const registerFormRef = ref<FormInstance>()

const validateName = (rule: any, value: any, callback: any) => {
  var NameRegularExpression = /^[\w\s\u4E00-\u9FA5]{1,25}$/
  if (value === '') {
    callback(new Error('请输入昵称'))
  } else {
    if (!NameRegularExpression.test(value)) {
      callback(new Error('昵称格式错误'))
    }
    callback()
  }
}

const validatePhone = (rule: any, value: any, callback: any) => {
  var EmailRegularExpression = /^1[3456789]\d{9}$/
  if (value === '') {
    callback(new Error('请输入电话号码'))
  } else {
    if (!EmailRegularExpression.test(value)) {
      callback(new Error('电话号码格式错误'))
    }
    callback()
  }
}

const validateEmail = (rule: any, value: any, callback: any) => {
  var EmailRegularExpression = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
  if (value === '') {
    callback(new Error('请输入电子邮箱'))
  } else {
    if (!EmailRegularExpression.test(value)) {
      callback(new Error('电子邮箱格式错误'))
    }
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  var PasswordRegularExpression = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z -~]{8,25}$/
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!PasswordRegularExpression.test(value)) {
    callback(new Error('密码格式错误，需要字母与数字组合的8~25位密码'))
  } else {
    if (registerForm.repassword !== '') {
      if (!registerFormRef.value) return
      registerFormRef.value.validateField('repassword', () => null)
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== registerForm.password) {
    callback(new Error("两次密码输入不一致"))
  } else {
    callback()
  }
}

const registerForm = reactive({
  name: '',
  phone: '',
  email: '',
  password: '',
  repassword: '',
})

const rules = reactive<FormRules<typeof registerForm>>({
  name: [
    { required: true, message: '请输入昵称' },
    { validator: validateName, trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入电话号码' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入电子邮箱' },
    { validator: validateEmail, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { validator: validatePass, trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请确认密码' },
    { validator: validatePass2, trigger: 'blur' }
  ],
})

const submit = async () => {
  const userInfo = ref({
    name: registerForm.name,
    phone: registerForm.phone,
    email: registerForm.email,
    password: registerForm.password,
  })
  // console.log(userInfo);
  console.log("发送请求：注册");
  const res = await userService.register(userInfo.value);
  console.log("请求成功，获得数据：", res);
  if (res.data.code === 200) {
    if (res.data.msg === "OK") {
      const responseData = res.data.data;
      console.log(responseData);
      router.push("/login");
    } else {
      ElMessage.error(res.data.msg)
    }
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      submit();
    } else {
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.el-card {
  opacity: 0.95;
  margin-bottom: 5px;
}

.el-card:last-child {
  margin-bottom: 0;
}

.el-link {
  margin-top: -3.6px;
}
</style>