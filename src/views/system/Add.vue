<template>
  <div id="app">
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div/></el-col>
      <el-col :xs="8" :sm="12" :md="16" :lg="18" :xl="22" type="flex" justify="center"><div>
        <br><br><br><br><br>
        <el-divider />
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-col :span="8">
              <el-input v-model="ruleForm.name" />
            </el-col>
          </el-form-item>
          <el-form-item label="区域类型" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="区县" />
              <el-radio label="社区" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="区域名称" prop="areaName" required>
            <el-col :span="8">
              <el-autocomplete
                v-model="ruleForm.areaName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入区域名称"
                @select="handleSelect"
              />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-divider />
      </div></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div/></el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { adminSuggestion, adminCreate } from '@/api/user'

export default {
  data() {
    return {
      suggestion: '',
      ruleForm: {
        name: '',
        type: '',
        areaName: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.suggestion = this.loadAll()
  },
  methods: {
    loadAll() {
      new Promise(resolve => {
        adminSuggestion().then(response => {
          this.suggestion = response.data
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          new Promise((resolve, reject) => {
            console.log('do addMember')
            adminCreate(this.ruleForm).then(response => {
              console.log(response)
              if (response.code === 200) {
                Message({
                  message: '录入成功',
                  type: 'success',
                  duration: 5 * 1000
                })
              }
            })
            resolve()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    querySearchAsync(queryString, cb) {
      let input = ''
      if (this.ruleForm.type === '社区') {
        input = this.suggestion.community
      }
      if (this.ruleForm.type === '区县') {
        input = this.suggestion.area
      }
      var results = queryString ? [input].filter(this.createStateFilter(queryString)) : input
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>
<style>
</style>
