<template>
  <div id="app">
    <br>
    <!--    过滤器-->
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-form ref="filter" :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="filter.name" placeholder="姓名" />
          </el-form-item>
          <el-form-item label="生日">
            <el-col>
              <el-form-item prop="birthday">
                <el-date-picker v-model="filter.birthday" type="date" placeholder="选择生日" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="filter.gender">
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">过滤器</el-button>
            <el-button @click="resetFilter('filter')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!--    分页-->
    <el-row type="flex" justify="center">
      <div class="block" :span="14">
        <el-pagination
          :current-page.sync="this.page"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="parseInt(this.total)"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <el-divider />
    <!--    表格-->
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'id', order: 'ascending'}"
        >
          <el-table-column
            prop="id"
            label="id"
            width="150"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="200"
          />
          <el-table-column
            prop="birthday"
            label="生日"
            width="200"
          />
          <el-table-column
            prop="gender"
            label="性别"
            width="180"
          />
          <el-table-column
            label="操作"
            width="100"
          >
            <template>
              <el-button type="text" size="small" @click="borwseDetail">查看</el-button>
              <el-button type="text" size="small" @click="editForm">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-divider />
    <!--    分页-->
    <el-row type="flex" justify="center">
      <div class="block" :span="14">
        <el-pagination
          :current-page.sync="this.page"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="parseInt(this.total)"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <!--    详细信息-->
    <el-dialog title="详细信息" :visible.sync="dialogDetailVisible">
      <div>
        <el-descriptions class="margin-top" :column="3" :size="size" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user" />
              姓名
            </template>
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building" />
              照片
            </template>
            <el-image
              src="https://x0.ifengimg.com/res/2021/EC934263EE097554D42CDDB2C7E9F1C925C61F4F_size16_w416_h531.jpeg"
              alt="照片"
              style="width: 100px; height: 127px"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline" />
              性别
            </template>
            男
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone" />
              手机号
            </template>
            18100000000
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets" />
              年龄
            </template>
            23
          </el-descriptions-item>
          <template slot="extra">
            <el-button type="primary" size="small">导出</el-button>
          </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building" />
              是否死亡
            </template>
            否
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building" />
              机构名称
            </template>
            幸福养老院
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
    <!--    修改信息-->
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form ref="editDataForm" :model="editDataForm" :rules="rules">
        <el-form-item label="姓名" prop="name" required>
          <el-col :span="5">
            <el-input v-model="editDataForm.name" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="gender" required>
          <el-radio-group v-model="editDataForm.gender">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" required>
          <el-col :span="5">
            <el-input v-model="editDataForm.phone" />
          </el-col>
        </el-form-item>
        <el-form-item label="生日" required>
          <el-col :span="5">
            <el-form-item prop="birthday">
              <el-date-picker v-model="editDataForm.birthday" type="date" placeholder="选择生日" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item ref="uploadElement" label="上传照片" prop="imageUrl" required>
          <el-input v-if="false" v-model="editDataForm.imageUrl" />
          <el-upload
            ref="upload"
            class="avatar-uploader"
            :show-file-list="false"
            action="#"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :auto-upload="false"
            :data="editDataForm"
          >
            <img v-if="editDataForm.imageUrl" :src="editDataForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="resetForm('editDataForm')">重 置</el-button>
        <el-button type="primary" @click="handleSubmit('editDataForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validatePhone } from '@/utils/validate'
import { editMember } from '@/api/file'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      filter: {
        name: '',
        birthday: '',
        gender: ''
      },
      dialogDetailVisible: false,
      dialogFormVisible: false,
      // loading: 'False',
      tableData: '',
      detailData: {
        name: '',
        phone: '',
        imageUrl: '',
        age: '',
        gender: '',
        birthday: '',
        isDeath: '',
        insName: ''
      },
      editDataForm: {
        name: '',
        phone: '',
        imageUrl: '',
        age: '',
        gender: '',
        birthday: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, message: '长度至少为2', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请上传照片', trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
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
  created: function() {
    console.log('loading data...')
  },
  methods: {
    resetFilter(filter) {
      this.$refs[filter].resetFields()
    },
    handleSubmit(formName) {
      console.log('submit')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          new Promise((resolve, reject) => {
            console.log('do addMember')
            editMember(this.editDataForm).then(response => {
              console.log(response)
              if (response.code === 200) {
                Message({
                  message: '修改成功',
                  type: 'success',
                  duration: 5 * 1000
                })
                this.dialogFormVisible = false
                this.getList()
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
    borwseDetail() {
      this.dialogDetailVisible = true
    },
    editForm() {
      this.dialogFormVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(file, fileList) {
      this.editDataForm.imageUrl = URL.createObjectURL(file.raw)
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
    }
  }

}
</script>

<style>
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
