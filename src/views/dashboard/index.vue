<template>
  <div class="dashboard-editor-container">
    <panel-group />

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import { serviceFlowStatData, servicePieChartData } from '@/api/service'

// const lineChartData = {
//   newVisits: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165],
//     actualData: [120, 82, 91, 154, 162, 140, 145]
//   },
//   messages: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140],
//     actualData: [180, 160, 151, 106, 145, 150, 130]
//   },
//   purchases: {
//     expectedData: [80, 100, 121, 104, 105, 90, 100],
//     actualData: [120, 90, 100, 138, 142, 130, 130]
//   },
//   shoppings: {
//     expectedData: [130, 140, 141, 142, 145, 150, 160],
//     actualData: [120, 82, 91, 154, 162, 140, 130]
//   }
// }

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    PieChart
  },
  data() {
    return {
      lineChartData: {
        title: '今日流量统计',
        today: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],
        yesterday: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
      },
      pieChartData: {
        legend: [],
        data: []
      }
    }
  },
  created() {
    this.fetchFlowStatData()
    this.fetchPieChartData()
  },
  methods: {
    fetchFlowStatData() {
      serviceFlowStatData().then((response) => {
        this.lineChartData = response.data
      })
    },
    fetchPieChartData() {
      servicePieChartData().then((response) => {
        console.log(111111)
        console.log(response.data)
        this.pieChartData = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  height: 100%;
  width: 100%;
  position:absolute;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
