<template>
  <div id="app">
    <br>
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
    <el-row>
      <el-col offset="3">
        <el-button type="primary" @click="dialogFormVisible = true">增加活动记录</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col v-loading="tableLoading" :span="18">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'id', order: 'ascending'}"
        >
          <el-table-column
            prop="id"
            label="活动id"
            width="150"
          />
          <el-table-column
            prop="date"
            label="时间"
            width="200"
          />
          <el-table-column
            prop="comId"
            label="社区id"
            width="180"
          />
          <el-table-column
            prop="comName"
            label="社区名称"
            width="180"
          />
          <el-table-column
            prop="description"
            label="活动记录"
            width="200"
          />
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
    <el-dialog title="添加活动记录" :visible.sync="dialogFormVisible">
      <el-form ref="editDataForm" :model="editDataForm" :rules="rules">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="editDataForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="社区名称" prop="areaName" required>
          <el-col :span="8">
            <el-autocomplete
              v-model="editDataForm.comName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入区域名称"
              @select="handleSelect"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="活动时间" prop="date">
          <el-col :span="11">
            <el-date-picker v-model="editDataForm.date" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="editDataForm.description" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFormSubmit('editDataForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addActivity, activityPage } from '@/api/activity'
import { transSuggestion } from '@/api/trans'
import { comSuggestion } from '@/api/community'

export default {

  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      suggestion: '',
      dialogFormVisible: false,
      tableLoading: false,
      tableData: '',
      editDataForm: {
        comName: '',
        name: '',
        description: '',
        date: ''
      },
      rules: {
        comName: [
          { required: true, message: '请输入活动社区', trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入活动描述', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  created: function() {
    this.getList()
  },
  mounted() {
    this.suggestion = this.loadAll()
  },
  methods: {
    loadAll() {
      new Promise(resolve => {
        comSuggestion().then(response => {
          this.suggestion = response.data
        })
      })
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
    getList() {
      const requestParam = {
        page: this.page,
        size: this.size
      }
      this.tableLoading = true
      new Promise(resolve => {
        activityPage(requestParam).then(response => {
          this.tableData = response.data.list
          this.total = response.data.totalPage
          this.page = response.data.page
          this.size = response.data.size
          this.tableLoading = false
          resolve()
        })
      })
    },
    handleFormSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise(resolve => {
            addActivity(this.editDataForm).then(response => {
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

</style>
