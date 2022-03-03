<template>
  <div id="app">
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-form ref="filter" :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="filter.name" placeholder="姓名" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilterSubmit">过滤器</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!--    分页-->
    <el-row type="flex" justify="center">
      <div class="block" :span="14">
        <el-pagination
          :current-page.sync="this.page"
          hide-on-single-page="true"
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
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6" />
      <el-col :span="6" />
      <el-col :span="6"><el-button @click="clearFilter">清除所有过滤器</el-button></el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="3" />
      <el-col :span="18">
        <el-table
          ref="tableData"
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'id', order: 'descending'}"
        >
          <el-table-column
            sortable
            prop="id"
            label="id"
            width="100%"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="100%"
            sortable
          />
          <el-table-column
            prop="inCom"
            label="转入社区"
            width="100%"
          />
          <el-table-column
            prop="outCom"
            label="转出社区"
            width="100%"
          />
          <el-table-column
            prop="inDate"
            label="转入时间"
            width="100%"
          />
          <el-table-column
            prop="outDate"
            label="转出时间"
            width="100%"
          />
          <el-table-column
            prop="status"
            label="状态"
            width="100"
            :filters="[{ text: '待转移', value: '待转移' }, { text: '通过', value: '通过' },{ text: '拒绝', value: '拒绝' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="tagType(scope.row)"
                disable-transitions
              >{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                :disabled="checkDisable(scope.row.status)"
                @click="handleChoose(scope.$index, scope.row, true)"
              >同意</el-button>
              <el-button
                size="mini"
                type="danger"
                :disabled="checkDisable(scope.row.status)"
                @click="handleChoose(scope.$index, scope.row, false)"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="3" />
    </el-row>
    <el-divider />
    <!--    分页-->
    <el-row type="flex" justify="center">
      <div class="block" :span="14">
        <el-pagination
          :hide-on-single-page="true"
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

  </div>
</template>

<script>
import { transPage } from '@/api/trans'
import { transIn, transOut } from '@/api/member'

export default {
  name: 'Trans',
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      tableLoading: false,
      filter: {
        name: ''
      },
      dialogFormVisible: false,
      tableData: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.tableLoading = true
      const requestParam = {
        page: this.page,
        size: this.size,
        name: this.filter.name
      }
      new Promise((resolve, reject) => {
        transPage(requestParam).then(response => {
          this.tableData = response.data.list
          this.page = response.data.page
          this.size = response.data.size
          this.total = response.data.totalPage
          this.tableLoading = false
          resolve()
        })
      })
    },
    handleFilterSubmit() {
      this.getList()
    },
    checkDisable(status) {
      if (status === '待转移') {
        return false
      }
      return true
    },
    clearFilter() {
      this.$refs.tableData.clearFilter()
    },
    handleChoose(index, row, status) {
      console.log('handle choose...')
      const requestParam = {
        id: row.id,
        status: status
      }
      new Promise((resolve, reject) => {
        transIn(requestParam).then(response => {
          console.log('trans in response:', response)
          this.getList()
        })
      })
    },
    tagType(row) {
      if (row.status === '通过') { return 'success' }
      if (row.status === '待转移') { return 'warning' }
      if (row.status === '拒绝') { return 'danger' }
    },
    handleTransOut() {
      this.dialogFormVisible = true
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
    filterTag(value, row) {
      return row.status === value
    }

  }
}
</script>

<style scoped>

</style>
