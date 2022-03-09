<template>
  <div id="app">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="8" :sm="12" :md="16" :lg="18" :xl="22"><div>
        <br><br><br><br><br>
        <el-divider />
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-col :span="8">
              <el-input v-model="ruleForm.name" />
            </el-col>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="ruleForm.gender">
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-col :span="8">
              <el-input v-model="ruleForm.phone" />
            </el-col>
          </el-form-item>
          <el-form-item label="生日" required>
            <el-col :span="8">
              <el-form-item prop="birthday">
                <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择生日" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <!--          <el-form-item label="机构名" prop="insName">-->
          <!--            <el-col :span="8">-->
          <!--              <el-input v-model="ruleForm.insName" />-->
          <!--            </el-col>-->
          <!--          </el-form-item>-->
          <el-form-item label="机构名" prop="insName" required>
            <el-col :span="8">
              <el-autocomplete
                v-model="ruleForm.insName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入区域名称"
                @select="handleSelect"
              />
            </el-col>
          </el-form-item>
          <el-form-item ref="uploadElement" label="上传照片" prop="avatar">
            <el-input v-if="false" v-model="ruleForm.avatar" type="file" />
            <el-upload
              ref="upload"
              class="avatar-uploader"
              :show-file-list="false"
              action="#"
              :before-upload="beforeUpload"
              :on-change="handleChange"
              :auto-upload="false"
              :data="ruleForm"
            >
              <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">录入</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-divider />
      </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addMember } from '@/api/file'
import { Message } from 'element-ui'
import { elDateToFormat } from '@/utils/date'
import { insSuggesion } from '@/api/institude'

var validatorPhone = function(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!/^1\d{10}$/.test(value)) {
    callback(new Error('手机号格式错误'))
  } else {
    callback()
  }
}
export default {
  data() {
    return {
      suggestion: '',
      ruleForm: {
        name: '',
        gender: '',
        birthday: '',
        phone: '',
        avatar: '',
        insName: ''
      },
      file: '',
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        insName: [
          { required: true, message: '请输入机构名', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请上传照片', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatorPhone, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birthday: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
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
        insSuggesion().then(response => {
          this.suggestion = response.data
        })
      })
    },
    submitForm(formName) {
      if (this.beforeUpload(this.ruleForm.file)) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            new Promise((resolve, reject) => {
              const files = new FormData()
              files.append('name', this.ruleForm.name)
              files.append('gender', this.ruleForm.gender)
              const birth = elDateToFormat(this.ruleForm.birthday)
              console.log('birth', birth)
              files.append('birthday', birth)
              files.append('phone', this.ruleForm.phone)
              files.append('avatar', this.ruleForm.file)
              files.append('insName', this.ruleForm.insName)
              addMember(files).then(response => {
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
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(file, fileList) {
      this.ruleForm.file = file.raw
      console.log('handleChange:file', file)
      console.log('handleChange:file.raw', file.raw)
      this.ruleForm.avatar = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    querySearchAsync(queryString, cb) {
      const input = this.suggestion
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
.el-col {
  border-radius: 4px
}
.bg-purple-dark {
  background: #99a9bf
}
.bg-purple {
  background: #d3dce6
}
.bg-purple-light {
  background: #e5e9f2
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
input[type="file"] {
  display: none;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
