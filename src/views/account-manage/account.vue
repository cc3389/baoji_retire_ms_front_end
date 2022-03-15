<template>
  <div class="app-container">
    <h1>重置密码</h1>
    <el-divider />
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="ruleForm.oldPwd" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="ruleForm.newPwd" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form></el-col>
      <el-col :span="6" />
      <el-col :span="6" />
      <el-col :span="6" />
    </el-row>

  </div>
</template>

<script>
import { isPassword } from '@/utils/validate'
import { resetPass } from '@/api/user'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!isPassword(value)) {
        callback(new Error('密码为6到20为的数字与字母'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        newPwd: '',
        checkPass: '',
        oldPwd: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          new Promise(resolve => {
            resetPass(this.ruleForm).then(response => {
              if (response.code === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.resetForm(formName)
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
