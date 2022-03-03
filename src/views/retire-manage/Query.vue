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
    <el-row type="flex" justify="center">
      <el-col :span="16" v-loading="tableLoading">
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
            label="名称"
            width="200"
          />
          <el-table-column
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="borwseDetail(scope.row)">详细信息</el-button>
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
      <div v-loading="detailLoading">
        <el-descriptions class="margin-top" :column="3" :size="size" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user" />
              机构id
            </template>
            {{ detailData.id }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user" />
              机构名称
            </template>
            {{ detailData.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline" />
              总人数
            </template>
            {{ detailData.sum }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone" />
              联系电话
            </template>
            {{ detailData.phone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone" />
              邮箱
            </template>
            {{ detailData.email }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets" />
              地址
            </template>
            {{ detailData.address }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { insDetail, insPage } from '@/api/institude'

export default {
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      detailLoading: false,
      filter: {
        name: '',
        birthday: '',
        gender: ''
      },
      dialogDetailVisible: false,
      tableLoading: false,
      tableData: '',
      detailData: {
        id: '',
        name: '',
        phone: '',
        address: '',
        sum: '',
        email: ''
      }
    }
  },
  created: function() {
    console.log('loading data...')
    this.getList()
  },
  methods: {
    getList() {
      this.tableLoading = true
      const requestParam = {
        page: this.page,
        size: this.size
      }
      new Promise(resolve => {
        insPage(requestParam).then(response => {
          this.page = response.data.page
          this.size = response.data.size
          this.total = response.data.totalPage
          this.tableData = response.data.list
          this.tableLoading = false
        })
      })
    },
    resetFilter(filter) {
      this.$refs[filter].resetFields()
    },
    borwseDetail(row) {
      this.dialogDetailVisible = true
      this.detailLoading = true
      const requestParam = {
        id: row.id
      }
      new Promise(resolve => {
        insDetail(requestParam).then(response => {
          this.detailData = response.data
          this.detailLoading = false
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
