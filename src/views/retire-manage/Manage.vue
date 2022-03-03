<template>
  <div id="app">
    <br>
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
    <el-row>
      <el-col :offset="3">
        <el-button @click="addFormVisible=true" type="primary">增加退管机构</el-button>
      </el-col>
    </el-row>
    <!--    表格-->
    <el-row type="flex" justify="center">
      <el-col v-loading="tableLoading" :span="10">
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
            label="机构名称"
            width="150"
          />
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editForm(scope.row)">修改</el-button>
              <el-button type="danger" size="small" @click="delForm(scope.row)">删除</el-button>
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
    <!--    修改退管-->
    <div>
      <el-dialog title="修改机构" :visible.sync="editFormVisible">
        <el-form ref="editComForm" :model="editInsForm" :rules="rules">
          <el-form-item label="机构名称" label-width="120px" prop="name">
            <el-input v-model="editInsForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="机构电话" label-width="120px" prop="phone">
            <el-input v-model="editInsForm.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="机构地址" label-width="120px" prop="address">
            <el-input v-model="editInsForm.address" autocomplete="off" />
          </el-form-item>
          <el-form-item label="所属社区" label-width="120px" prop="comName">
            <el-autocomplete
              v-model="editInsForm.comName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入所属社区"
              @select="handleSelect"
            />
          </el-form-item>
          <el-form-item label="邮箱" label-width="120px" prop="email">
            <el-input v-model="editInsForm.email" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditIns('editComForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--    增加退管-->
    <div>
      <el-dialog title="增加退管机构" :visible.sync="addFormVisible">
        <el-form ref="addInsForm" :model="addInsForm" :rules="rules">
          <el-form-item label="机构名称" label-width="120px" prop="name">
            <el-input v-model="addInsForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="机构总人数" label-width="120px" prop="sumPeople">
            <el-input v-model="addInsForm.sumPeople" type="number" autocomplete="off" />
          </el-form-item>
          <el-form-item label="机构电话" label-width="120px" prop="phone">
            <el-input v-model="addInsForm.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="机构地址" label-width="120px" prop="address">
            <el-input v-model="addInsForm.address" autocomplete="off" />
          </el-form-item>
          <el-form-item label="所属社区" label-width="120px" prop="comName">
            <el-autocomplete
              v-model="addInsForm.comName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入所属社区"
              @select="handleSelect"
            />
          </el-form-item>
          <el-form-item label="邮箱" label-width="120px" prop="email">
            <el-input v-model="addInsForm.email" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddIns('addInsForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import { Message } from 'element-ui'
import { insPage, addIns, delIns, updateIns, insDetail } from '@/api/institude'
import { transSuggestion } from '@/api/trans'
var validatorPhone = function(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!/^1\d{10}$/.test(value)) {
    callback(new Error('手机号格式错误'))
  } else {
    callback()
  }
}
import { isEmail } from '@/utils/validate'
var validatorEmail = function(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else if (!isEmail(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}
export default {
  data() {
    return {
      suggestion: '',
      tableLoading: false,
      page: 1,
      size: 10,
      total: 0,
      filter: {
        name: ''
      },
      editInsForm: {
        id: '',
        name: '',
        comName: '',
        phone: '',
        email: '',
        address: ''
      },
      addInsForm: {
        name: '',
        sumPeople: '',
        comName: '',
        phone: '',
        email: '',
        address: ''
      },
      editFormVisible: false,
      addFormVisible: false,
      tableData: '',
      rules: {
        name: [
          { required: true, message: '请输入机构名', trigger: 'blur' },
          { min: 2, message: '长度至少为2', trigger: 'blur' }
        ],
        sumPeople: [
          { required: true, message: '请输入总人数', trigger: 'blur' },
        ],
        comName: { required: true, message: '请输入所属社区名', trigger: 'blur' },
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatorPhone, trigger: 'blur' }
        ],
        email: [{ validator: validatorEmail, trigger: 'blur' },
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        address: { required: true, message: '请输入机构地址', trigger: 'blur' }
      }
    }
  },
  created: function() {
    console.log('loading data...')
    this.getList()
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    loadAll() {
      new Promise(resolve => {
        transSuggestion().then(response => {
          this.suggestion = response.data.list
        })
      })
    },
    getList() {
      this.tableLoading = true
      new Promise((resolve, reject) => {
        const requestParam = {
          page: this.page,
          size: this.size,
          name: this.filter.name
        }
        insPage(requestParam).then(response => {
          this.total = response.data.totalPage
          this.tableData = response.data.list
          this.tableLoading = false
        })
      })
    },
    handleEditIns(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          new Promise((resolve, reject) => {
            updateIns(this.editInsForm).then(response => {
              this.editFormVisible = false
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.getList()
              }
            })
          })
        }
      })
    },
    handleAddIns(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise((resolve, reject) => {
            addIns(this.addInsForm).then(response => {
              this.addFormVisible = false
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.getList()
              }
            })
          })
        }
      })
    },
    editForm(row) {
      console.log('edit com..')
      const requestParam = {
        id: row.id
      }
      new Promise(resolve => {
        insDetail(requestParam).then(response => {
          this.editInsForm = response.data
        })
      })
      this.editFormVisible = true
    },
    resetFilter(filter) {
      this.$refs[filter].resetFields()
    },
    handleSubmit(formName) {
      console.log('submit')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          new Promise((resolve, reject) => {
            console.log('do addMember')
            updateIns(this.editDataForm).then(response => {
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit() {
      console.log('submit filter')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getList()
    },
    delForm(row) {
      this.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const requestParam = {
          id: row.id
        }
        new Promise((resolve, reject) => {
          delIns(requestParam).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            }
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    querySearchAsync(queryString, cb) {
      var suggestion = this.suggestion
      var results = queryString ? suggestion.filter(this.createStateFilter(queryString)) : suggestion

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

