<template>
  <div id="app">
    <br>
    <!--    分页-->
    <el-row type="flex" justify="center">
      <div class="block" :span="14">
        <el-pagination
          :current-page.sync="this.page"
          :hide-on-single-page="true"
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
          :default-sort="{prop: 'peoId', order: 'ascending'}"
        >
          <el-table-column
            prop="peoId"
            label="id"
            width="150"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="200"
          />
          <el-table-column
            prop="fee"
            label="应缴费用"
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
          :hide-on-single-page="true"
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
import { feePage } from '@/api/member'

export default {
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      tableLoading: false,
      tableData: ''
    }
  },
  created: function() {
    console.log('loading data...')
    this.getList()
  },
  methods: {
    getList() {
      this.tableLoading = true
      const param = {
        page: this.page,
        size: this.size
      }
      new Promise(resolve => {
        feePage(param).then(response => {
          this.tableData = response.data.list
          this.total = response.data.totalPage
          this.size = response.data.size
          this.page = response.data.page
          this.tableLoading = false
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
    }
  }
}
</script>

<style>

</style>
