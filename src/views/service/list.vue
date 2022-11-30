<template>
  <div class="app-container">
    <div class="search-bar">
      <el-input v-model="query.info" type="text" placeholder="请输入服务名称/服务描述" style="width:300px" />
      <el-button type="primary" style="margin-left:10px" @click="fetchData">
        <i class="el-icon-search" />
        搜索
      </el-button>
      <router-link :to="'/service/add_http/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          添加HTTP服务
        </el-button>
      </router-link>
      <router-link :to="'/service/add_tcp/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          添加TCP服务
        </el-button>
      </router-link>
      <router-link :to="'/service/add_grpc/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          添加GRPC服务
        </el-button>
      </router-link>
      <el-button type="success" style="margin-left: 10px;" @click="refresh">
        <i class="el-icon-refresh" />
        重置
      </el-button>
    </div>
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
      <el-table-column label="服务名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.service_name }}
        </template>
      </el-table-column>
      <!-- 服务描述 -->
      <el-table-column label="服务描述" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.service_desc }}
        </template>
      </el-table-column>
      <!-- 类型 -->
      <el-table-column label="类型" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.load_type | loadTypeFilter }}</span>
        </template>
      </el-table-column>
      <!-- 服务地址 -->
      <el-table-column label="服务地址" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.service_addr }}
        </template>
      </el-table-column>
      <!-- QPS -->
      <el-table-column label="QPS" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.qps }}
        </template>
      </el-table-column>
      <!-- 日请求数 -->
      <el-table-column label="日请求数" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.qpd }}
        </template>
      </el-table-column>
      <!-- 节点数 -->
      <el-table-column label="节点数" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.total_node }}
        </template>
      </el-table-column>
      <el-table-column label="节点数" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.total_node }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary">统计</el-button>
          <el-button type="primary">更新</el-button>
          <el-button type="danger" @click="handleDeleteService(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="query.page_no"
        :page-sizes="[10, 15, 20,25 ]"
        :page-size="query.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getServiceList, deleteService } from '@/api/service.js'
const loadTypeOptions = [
  { key: '0', display_name: 'HTTP' },
  { key: '1', display_name: 'TCP' },
  { key: '2', display_name: 'GRPC' }
]

const loadTypeKeyValue = loadTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    loadTypeFilter(type) {
      return loadTypeKeyValue[type]
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
    },
    // 每页数据量改变时
    handleSizeChange(pageSize) {
      this.query.page_size = pageSize
      this.fetchData()
    },
    // pageNo发生变化时
    handleCurrentChange(pageNo) {
      this.query.page_no = pageNo
      this.fetchData()
    },
    // 删除服务
    handleDeleteService(index, row) {
      console.log(row)
      this.$confirm('此操作将会删除该服务，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteService({ 'id': row.id }).then((response) => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '删除服务成功'
          })
          this.fetchData()
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '删除服务失败:' + err
          })
        })
      })
    },
    refresh() {
      this.query.info = ''
      this.query.page_no = 1
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination{
  display: flex;
  justify-content: right;
}
.search-bar{
  padding-bottom: 10px;
}
</style>
