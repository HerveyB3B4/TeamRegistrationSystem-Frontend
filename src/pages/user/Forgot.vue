<template>
  <el-card class="ep-bg-purple">
    <el-text size="large" tag="b" type="info">忘记密码</el-text>
    <br />
    <el-icon size="150px">
      <Avatar />
    </el-icon>
    <el-form ref="registerFormRef" :model="registerForm" status-icon :rules="rules" label-width="70px" class="Register">
      <el-form-item label="账户" prop="account">
        <el-input v-model="registerForm.account" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="registerForm.code" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认" prop="repassword">
        <el-input v-model="registerForm.repassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="sendEmail(registerForm.account)">发送验证码</el-button>
        <el-button type="primary" @click="submitForm(registerFormRef)">更改密码</el-button>
        <el-button @click="resetForm(registerFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-row justify="center" align="center" :gutter="20">
      <el-col :span="50">
        <el-text>
          记得密码？
          &nbsp
          <el-link :underline="false" type="primary" href="/login">登录</el-link>
        </el-text>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import router from "../../routers";
import userService from '../../apis/userService';

const registerFormRef = ref<FormInstance>()

const validateCode = (rule: any, value: any, callback: any) => {
  var EmailRegularExpression = /[0-9]{6}$/
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else {
    if (!EmailRegularExpression.test(value)) {
      callback(new Error('验证码格式错误'))
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
  account: '',
  code: '',
  password: '',
  repassword: '',
})

const rules = reactive<FormRules<typeof registerForm>>({
  account: [
    { required: true, message: '请输入账户' },
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { validator: validateCode, trigger: 'blur' }
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

const sendEmail = async (account: string) => {
  if (account === '') {
    ElMessage.error("未输入账户");
  } else {
    const res = await userService.sendEmail(account);
    if (res.data.code === 200) {
      if (res.data.msg === '发送成功') {
        ElMessage.success('发送成功');
      } else {
        ElMessage.error(res.data.msg);
      }
    }
  }
}

const submit = async () => {
  const userInfo = ref({
    account: registerForm.account,
    password: registerForm.password,
    code: registerForm.code,
  })
  // console.log(userInfo);
  console.log("发送请求：注册");
  const res = await userService.forgotPassword(userInfo.value);
  console.log("请求成功，获得数据：", res);
  if (res.data.code === 200) {
    if (res.data.msg === "OK") {
      const responseData = res.data.data;
      console.log(responseData);
      router.push("/login");
    } else {
      ElMessage.error(res.data.msg);
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