<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :data="charData" />
  </div>
</template>

<script>
import Chart from './components/LineStat.vue'
import { serviceStat } from '@/api/service'
export default {
  components: { Chart },
  data() {
    return {
      charData: {
        title: '',
        today: [],
        yesterday: []
      }
    }
  },
  created() {
    console.log(this.$route.params)
    const id = this.$route.params.id
    this.fetchStat(id)
  },
  methods: {
    fetchStat(id) {
      const query = { 'id': id }
      console.log(id)
      serviceStat(query).then((response) => {
        console.log(response)
        this.charData = {
          title: response.data.title,
          today: response.data.today,
          yesterday: response.data.yesterday
        }
      })
    }
  }
}
</script>

<style  scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
