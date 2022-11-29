<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <!-- 服务名称 -->
      <el-table-column label="服务名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.service_name }}
        </template>
      </el-table-column>
      <!-- 服务描述 -->
      <el-table-column label="服务描述" width="150">
        <template slot-scope="scope">
          {{ scope.row.service_desc }}
        </template>
      </el-table-column>
      <!-- 类型 -->
      <el-table-column label="类型" width="100">
        <template slot-scope="scope">
          {{ scope.row.load_type }}
        </template>
      </el-table-column>
      <!-- 服务地址 -->
      <el-table-column label="服务地址" width="200">
        <template slot-scope="scope">
          {{ scope.row.service_addr }}
        </template>
      </el-table-column>
      <!-- QPS -->
      <el-table-column label="QPS" width="80">
        <template slot-scope="scope">
          {{ scope.row.qps }}
        </template>
      </el-table-column>
      <!-- 日请求数 -->
      <el-table-column label="日请求数" width="80">
        <template slot-scope="scope">
          {{ scope.row.qpd }}
        </template>
      </el-table-column>
      <!-- 节点数 -->
      <el-table-column label="节点数" width="80">
        <template slot-scope="scope">
          {{ scope.row.total_node }}
        </template>
      </el-table-column>
      <el-table-column label="节点数" width="80">
        <template slot-scope="scope">
          {{ scope.row.total_node }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="">
          <el-button type="primary">统计</el-button>
          <el-button type="primary">更新</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getServiceList } from '@/api/service.js'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      query: {
        info: '',
        page_no: 1,
        page_size: 10
      },
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getServiceList(this.query).then(response => {
        console.log(response)
        this.list = response.data.list
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
        this.listLoading = false
      })
    }
  }
}
</script>
