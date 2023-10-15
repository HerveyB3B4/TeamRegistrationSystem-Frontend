<template>
    <el-card class="ep-bg-purple">
        <el-icon>
            <List />
        </el-icon><el-text size="large" tag="b" type="info">注册新团队</el-text>
        <br />
        <br />
        <el-form ref="createFormRef" :model="createForm" status-icon :rules="rules" label-width="70px" class="create">
            <el-form-item label="团队名" prop="name">
                <el-input v-model="createForm.name" />
            </el-form-item>
            <el-form-item label="口号" prop="slogan" type="textarea">
                <el-input v-model="createForm.slogan" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="createForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认" prop="repassword">
                <el-input v-model="createForm.repassword" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(createFormRef)">创建</el-button>
                <el-button @click="resetForm(createFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import router from "../../routers";
import teamService from '../../apis/teamService';

const createFormRef = ref<FormInstance>()

const validateName = (rule: any, value: any, callback: any) => {
    var NameRegularExpression = /^[\w\s\u4E00-\u9FA5]{1,25}$/
    if (value === '') {
        callback(new Error('请输入团队名'))
    } else {
        if (!NameRegularExpression.test(value)) {
            callback(new Error('团队名格式错误'))
        }
        callback()
    }
}

const validateSlogan = (rule: any, value: any, callback: any) => {
    var NameRegularExpression = /^[\w\s\u4E00-\u9FA5]{1,1000}$/
    if (value === '') {
        callback(new Error('请输入团队口号'))
    } else {
        if (!NameRegularExpression.test(value)) {
            callback(new Error('团队口号格式错误'))
        }
        callback()
    }
}

const validatePass = (rule: any, value: any, callback: any) => {
    var PasswordRegularExpression = /^[\w\s\u4E00-\u9FA5]{1,25}$/
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (!PasswordRegularExpression.test(value)) {
        callback(new Error('密码格式错误'))
    } else {
        if (createForm.repassword !== '') {
            if (!createFormRef.value) return
            createFormRef.value.validateField('repassword', () => null)
        }
        callback()
    }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请确认密码'))
    } else if (value !== createForm.password) {
        callback(new Error("两次密码输入不一致"))
    } else {
        callback()
    }
}

const createForm = reactive({
    name: '',
    slogan: '',
    password: '',
    repassword: '',
})

const rules = reactive<FormRules<typeof createForm>>({
    name: [
        { required: true, message: '请输入团队名' },
        { validator: validateName, trigger: 'blur' }
    ],
    slogan: [
        { required: true, message: '请输入团队口号' },
        { validator: validateSlogan, trigger: 'blur' }
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
    const teamInfo = ref({
        team_name: createForm.name,
        slogan: createForm.slogan,
        team_password: createForm.password,
    })
    // console.log(userInfo);
    console.log("发送请求：创建团队");
    const res = await teamService.createTeam(teamInfo.value);
    console.log("请求成功，获得数据：", res);
    if (res.data.code === 200) {
        if (res.data.msg === "OK") {
            ElMessage.success("注册成功！");
            router.push("/");
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
  
<style scoped></style>