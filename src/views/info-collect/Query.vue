<template>
  <div class="app-container">
    <br>
    <!--    过滤器-->
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-form ref="requestParam" :inline="true" :model="requestParam" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="requestParam.name" placeholder="姓名" />
          </el-form-item>
          <!--          <el-form-item label="生日">-->
          <!--            <el-col>-->
          <!--              <el-form-item prop="birth">-->
          <!--                <el-date-picker v-model="requestParam.birth" type="date" placeholder="选择生日" style="width: 100%" />-->
          <!--              </el-form-item>-->
          <!--            </el-col>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="性别" prop="gender">-->
          <!--            <el-radio-group v-model="requestParam.gender">-->
          <!--              <el-radio label="男" />-->
          <!--              <el-radio label="女" />-->
          <!--            </el-radio-group>-->
          <!--          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="handleFilterSumit">过滤器</el-button>
            <el-button @click="resetFilter('filter')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!--    分页-->
    <el-row type="flex" justify="center">
      <div class="block" :span="14">
        <el-pagination
          :hide-on-single-page="true"
          :current-page.sync="this.requestParam.page"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="parseInt(this.totalPage)"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <el-divider />
    <!--    表格-->
    <el-input v-model="filename" placeholder="请输入文件名 (默认为 excel-list)" style="width:350px;" prefix-icon="el-icon-document" />
    <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">
      导出选定项目
    </el-button>
    <el-row v-loading="listLoading" type="flex" justify="center">
      <el-col :span="18">
        <el-table
          ref="tableData"
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'peoId', order: 'ascending'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column
            prop="peoId"
            label="id"
            widith="150"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="200"
          />
          <el-table-column
            prop="birth"
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
            width="150"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="borwseDetail(scope.row.peoId)">查看</el-button>
              <el-button type="text" size="small" @click="editForm(scope.row.peoId)">编辑</el-button>
              <el-button type="text" size="small" @click="showTransOutDialog(scope.row)">转出</el-button>
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
          :current-page.sync="this.requestParam.page"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="this.requestParam.size"
          layout="sizes, prev, pager, next"
          :total="parseInt(this.totalPage)"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <!--    详细信息-->
    <el-dialog title="详细信息" :visible.sync="dialogDetailVisible">
      <div>
        <el-descriptions v-loading="detailLoading" class="margin-top" :column="3" :size="size" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user" />
              姓名
            </template>
            {{ detailData.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building" />
              照片
            </template>
            <el-image
              :src="this.detailData.avatar"
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
            {{ detailData.gender }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone" />
              手机号
            </template>
            {{ detailData.phone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets" />
              年龄
            </template>
            {{ detailData.age }}
          </el-descriptions-item>
          <template slot="extra">
            <el-button type="primary" size="small">导出</el-button>
          </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building" />
              是否死亡
            </template>
            {{ detailData.isDeath }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building" />
              机构名称
            </template>
            {{ detailData.insName }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
    <!--    修改信息-->
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form ref="editDataForm" v-loading="editLoading" :model="editDataForm" :rules="rules">
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
            <el-form-item prop="birth">
              <el-date-picker v-model="editDataForm.birth" type="date" placeholder="选择生日" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item ref="uploadElement" label="上传照片" prop="avatar" required>
          <el-input v-if="false" v-model="editDataForm.avatar" />
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
            <img v-if="editDataForm.avatar" :src="editDataForm.avatar" class="avatar">
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
    <!--    转出申请对话框-->
    <el-dialog title="转出申请" :visible.sync="transOutFormVisible">
      <el-form :model="transOutForm">
        <el-form-item label="转出人">
          <span>{{ transOutForm.name }}</span>
        </el-form-item>
        <el-form-item label="社区名称">
          <el-autocomplete
            v-model="transOutForm.community"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入转出社区名称"
            @select="handleSelect"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="transOutFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleTransFormSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validatePhone } from '@/utils/validate'
import { editMember } from '@/api/file'
import { Message } from 'element-ui'
import { exportMem, queryMember, queryMemberDetail } from '@/api/member'
import { elDateToFormat, formatToElDate } from '@/utils/date'
import { transSuggestion } from '@/api/trans'
import { transOut } from '@/api/member'

export default {
  data() {
    return {
      list: null,
      multipleSelection: [],
      downloadLoading: false,
      filename: '',
      birth: '',
      requestParam: {
        page: 1,
        size: 10,
        name: '',
        birth: '',
        gender: ''
      },
      transOutForm: {
        id: '',
        name,
        community: ''
      },
      transOutFormVisible: false,
      listLoading: false,
      detailLoading: false,
      editLoading: false,
      transSuggestion: '',
      filter: {
        name: ''
      },
      dialogDetailVisible: false,
      dialogFormVisible: false,
      totalPage: '1',
      // loading: 'False',
      tableData: '',
      detailData: {
        name: '',
        phone: '',
        avatar: '',
        age: '',
        gender: '',
        birth: '',
        isDeath: '',
        insName: ''
      },
      editDataForm: {
        id: '',
        name: '',
        phone: '',
        avatar: '',
        age: '',
        gender: '',
        birth: '',
        file: '',
        insName: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, message: '长度至少为2', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请上传照片', trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.transSuggestion = this.loadSuggestion()
  },
  created: function() {
    console.log('loading data...')
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      console.log('selection change', val)
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['姓名', '生日', '性别', '手机号', '机构名称', '健康状况']
          const filterVal = ['name', 'birth', 'gender', 'phone', 'insName', 'isDeath']
          const originalList = this.multipleSelection
          var list = []
          for (const i in originalList) {
            list.push(originalList[i].peoId)
          }
          var exportData = null
          const requestParam = { list }
          new Promise(resolve => {
            exportMem(requestParam).then(response => {
              if (response.code === 200) {
                exportData = response.data.list
                const data = this.formatJson(filterVal, exportData)
                excel.export_json_to_excel({
                  header: tHeader,
                  data,
                  filename: this.filename
                })
              }
            })
          })
          this.downloadLoading = false
          this.$refs.tableData.clearSelection()
        })
      } else {
        this.$message({
          message: '请至少选择一项',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.requestParam.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.requestParam.page = val
      this.getList()
    },
    showTransOutDialog(row) {
      this.transOutForm.name = row.name
      this.transOutForm.id = row.peoId
      this.transOutFormVisible = true
    },
    handleTransFormSubmit() {
      new Promise((resolve, reject) => {
        transOut(this.transOutForm).then(response => {
          if (response.code === 200) {
            this.$message({
              message: '申请转出成功',
              type: 'success'
            })
            this.transOutFormVisible = false
            this.getList()
          }
        })
      })
    },
    getList() {
      this.listLoading = true
      new Promise((resolve, reject) => {
        queryMember(this.requestParam).then(response => {
          console.log(response)
          this.tableData = response.data.list
          this.totalPage = response.data.totalPage
          this.listLoading = false
          resolve()
        })
      })
    },
    resetFilter(filter) {
      this.$refs[filter].resetFields()
    },
    handleFilterSumit() {
      console.log('filter submit')
      this.requestParam.birth = elDateToFormat(this.requestParam.birth)
      this.getList()
    },
    handleSubmit(formName) {
      const isJpg = this.beforeUpload(this.editDataForm.file)
      if (!isJpg) {
        return null
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          new Promise((resolve, reject) => {
            const birth = elDateToFormat(this.editDataForm.birth)
            const files = new FormData()
            files.append('id', this.editDataForm.id)
            files.append('name', this.editDataForm.name)
            files.append('gender', this.editDataForm.gender)
            files.append('phone', this.editDataForm.phone)
            files.append('avatar', this.editDataForm.file)
            files.append('birth', birth)
            editMember(files).then(response => {
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
    borwseDetail(id) {
      this.dialogDetailVisible = true
      this.detailLoading = true
      const requestParam = {
        peoId: id
      }
      new Promise((resolve, reject) => {
        queryMemberDetail(requestParam).then(response => {
          this.detailData = response.data.list
          this.detailLoading = false
          resolve()
        })
      })
    },
    editForm(id) {
      this.dialogFormVisible = true
      this.editLoading = true
      const requestParam = {
        peoId: id
      }
      new Promise((resolve, reject) => {
        queryMemberDetail(requestParam).then(response => {
          this.detailData = response.data.list
          this.editDataForm.id = id
          this.editDataForm.age = this.detailData.age
          this.editDataForm.birth = formatToElDate(this.detailData.birth)
          this.editDataForm.avatar = this.detailData.avatar
          this.editDataForm.gender = this.detailData.gender
          this.editDataForm.name = this.detailData.name
          this.editDataForm.phone = this.detailData.phone
          this.editLoading = false
          resolve()
        })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(file, fileList) {
      this.editDataForm.file = file.raw
      this.editDataForm.avatar = URL.createObjectURL(file.raw)
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
      const transSuggestion = this.transSuggestion
      console.log('queryString:', queryString)
      var results = queryString ? transSuggestion.filter(this.createStateFilter(queryString)) : transSuggestion
      console.log('suggesions:', results)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => { // 设置多少秒调用一次方法
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadSuggestion() {
      new Promise((resolve, reject) => {
        transSuggestion().then(response => {
          this.transSuggestion = response.data.list
          resolve()
        })
      })
    },
    handleSelect(item) {
      console.log(item)
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
