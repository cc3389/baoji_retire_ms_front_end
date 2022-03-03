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
    <el-row type="flex" justify="center" >
      <el-col :span="16" v-loading="tableLoading">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'peoId', order: 'ascending'}"
        >
          <el-table-column
            prop="peoId"
            label="id"
            width="100"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="100"
          />
          <el-table-column
            prop="birth"
            label="生日"
            width="100"
          />
          <el-table-column
            prop="gender"
            label="性别"
            width="100"
          />
          <el-table-column
            prop="isDeath"
            label="健康状态"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag
                :type="tagType(scope.row.isDeath)"
                disable-transitions
              >{{ scope.row.isDeath }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                :disabled="scope.row.status === '死亡'?true:false"
                @click="setDeath(scope.row.peoId)"
              >死亡申报</el-button>
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
  </div>
</template>

<script>
import { deathPage, deathReport } from '@/api/member'
export default {
  name: 'Death',
  data() {
    return {
      tableLoading: false,
      page: 1,
      size: 10,
      total: 0,
      tableData: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      console.log('getList...')
      this.tableLoading = true
      const requestParam = {
        page: this.page,
        size: this.size
      }
      new Promise((resolve, reject) => {
        deathPage(requestParam).then(response => {
          console.log('response', response)
          this.tableData = response.data.list
          this.total = response.data.total
          this.tableLoading = false
          resolve()
        })
      })
      this.tableLoading = false
    },
    tagType(status) {
      if (status === '健康') {
        return 'success'
      }
      if (status === '死亡') {
        return 'info'
      }
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
    setDeath(id) {
      this.$confirm('此操作将不可逆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const requestParam = {
          id: id
        }
        console.log('requestParam:', requestParam)
        new Promise((resolve, reject) => {
          deathReport(requestParam).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '申报成功!'
              })
              this.getList()
              resolve()
            }
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
