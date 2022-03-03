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
      <el-col v-loading="tableLoading" :span="16">
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
            width="120"
          />
          <el-table-column
            prop="permission"
            label="权限"
            width="120"
          />
          <el-table-column
            prop="areaName"
            label="管理区域名"
            width="200"
          />
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >撤销权限</el-button>
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
    <el-dialog title="修改权限" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
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
        <el-form-item label="区域名称" prop="name">
          <el-col :span="8">
            <el-autocomplete
              v-model="ruleForm.areaName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入区域名称"
              @select="handleSelect"
            />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { adminPage, adminRevoke, adminSuggestion, adminGrant } from '@/api/user'

export default {
  data() {
    return {
      suggestion: '',
      page: 1,
      size: 10,
      total: 0,
      filter: {
        name: ''
      },
      requestParam: '',
      ruleForm: {
        id: '',
        name: '',
        type: '',
        areaName: ''
      },
      dialogFormVisible: false,
      tableLoading: false,
      tableData: ''
    }
  },
  mounted() {
    this.suggestion = this.loadAll()
  },
  created: function() {
    console.log('loading data...')
    this.getList()
  },
  methods: {
    loadAll() {
      new Promise(resolve => {
        adminSuggestion().then(response => {
          this.suggestion = response.data
        })
      })
    },
    getList() {
      this.tableLoading = true
      this.requestParam = {
        page: this.page,
        size: this.size,
        name: this.filter.name
      }
      new Promise(resolve => {
        adminPage(this.requestParam).then(response => {
          this.tableData = response.data.list
          this.size = response.data.size
          this.page = response.data.page
          this.total = response.data.totalPage
          this.tableLoading = false
        })
        resolve()
      })
    },
    resetFilter(filter) {
      this.$refs[filter].resetFields()
    },
    handleEdit(index, row) {
      this.ruleForm.name = ''
      this.ruleForm.id = ''
      this.ruleForm.type = ''
      this.ruleForm.areaName = ''
      this.dialogFormVisible = true
      this.ruleForm.name = row.name
      this.ruleForm.id = row.id
      this.ruleForm.areaName = row.areaName
      if (row.permission === 'low') {
        this.ruleForm.type = '社区'
      } else if (row.permission === 'mid') {
        this.ruleForm.type = '区县'
      }
    },
    handleEditSubmit() {
      new Promise(resolve => {
        adminGrant(this.ruleForm).then(response => {
          this.dialogFormVisible = false
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getList()
          }
        })
      })
    },
    handleDelete(index, row) {
      this.$confirm('确认收回权限吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const requestParam = {
          id: row.id
        }
        adminRevoke(requestParam).then(response => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
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
    }
  }

}
</script>

<style>

</style>
