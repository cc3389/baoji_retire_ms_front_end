<template>
  <div id="app">
    <br>
    <el-row type="flex" justify="center">
      <div class="block" :span="14">
        <el-pagination
          :current-page.sync="this.page"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="parseInt(this.total)"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <el-divider />
    <!--    表格-->
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <el-button type="primary" @click="addFormVisible = true">增加社区</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="10" v-loading="tableLoading">
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
            label="社区名称"
            width="150"
          />
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="delForm(scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="editForm(scope.row)">修改</el-button>
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
<!--    修改社区-->
    <div>
      <el-dialog title="修改社区" :visible.sync="editFormVisible">
        <el-form :model="editComForm" :rules="rules" ref="editComForm">
          <el-form-item label="社区名称" label-width="120px" prop="name">
            <el-input v-model="editComForm.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditCommunity('editComForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
<!--    增加社区-->
    <div>
      <el-dialog title="增加社区" :visible.sync="addFormVisible">
        <el-form :model="addComForm" :rules="rules" ref="addComForm">
          <el-form-item label="社区名称" label-width="120px" prop="name">
            <el-input v-model="addComForm.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddCommunity('addComForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import { editMember } from '@/api/file'
import { Message } from 'element-ui'
import { communityPage, delCommunity, editCommunity, addCommunity } from '@/api/community'

export default {
  data() {
    return {
      tableLoading: false,
      page: 1,
      size: 10,
      total: '',
      filter: {
        name: ''
      },
      editComForm: {
        name: '',
        comId: ''
      },
      addComForm: {
        name: ''
      },
      editFormVisible: false,
      addFormVisible: false,
      // loading: 'False',
      tableData: '',
      rules: {
        name: [
          { required: true, message: '请输入社区名', trigger: 'blur' },
          { min: 2, message: '长度至少为2', trigger: 'blur' }
        ]
      }
    }
  },
  created: function() {
    console.log('loading data...')
    this.getList()
  },
  methods: {
    getList() {
      const requestParam = {
        page: this.page,
        size: this.size,
        name: this.filter.name
      }
      this.tableLoading = true
      new Promise((resolve, reject) => {
        communityPage(requestParam).then(response => {
          this.total = response.data.totalPage
          this.tableData = response.data.list
          this.tableLoading = false
        })
      })
    },
    handleEditCommunity(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          new Promise((resolve, reject) => {
            editCommunity(this.editComForm).then(response => {
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
    handleAddCommunity(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise((resolve, reject) => {
            addCommunity(this.addComForm).then(response => {
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
      this.editComForm.comId = row.id
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
            editMember(this.editComForm).then(response => {
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
      this.$confirm('此操作将永久删除该社区, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new Promise((resolve, reject) => {
          const requestParam = {
            id: row.id
          }
          delCommunity(requestParam).then(response => {
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
    }
  }

}
</script>

<style>
</style>

