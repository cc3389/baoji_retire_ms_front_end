<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { memberChart } from '@/api/trans'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      tableData: {
        data: '',
        data2: ''
      },
      chart: null
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.getData()
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getData() {
      new Promise(resolve => {
        memberChart().then(response => {
          if (response.code === 200) {
            this.tableData.data = response.data.in
            this.tableData.data2 = response.data.out
          }
        })
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.setOptions(this.tableData)
    },
    setOptions({ data, data2 } = {}) {
      console.log('data:', data)
      console.log('data2:', data2)
      const xAxisData = [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ]
      this.chart.setOption({
        title: {
          top: 20,
          text: '转入转出人数统计',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        backgroundColor: '#08263a',
        grid: {
          left: '5%',
          right: '5%'
        },
        xAxis: [{
          show: false,
          data: xAxisData
        }, {
          show: false,
          data: xAxisData
        }],
        visualMap: {
          show: false,
          min: 0,
          max: 50,
          dimension: 0,
          inRange: {
            color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#4a657a'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#08263f'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: 'back',
          type: 'bar',
          data: data2,
          z: 1,
          itemStyle: {
            normal: {
              opacity: 0.4,
              barBorderRadius: 5,
              shadowBlur: 3,
              shadowColor: '#111'
            }
          }
        },
        {
          name: 'Simulate Shadow',
          type: 'line',
          data,
          z: 2,
          showSymbol: false,
          animationDelay: 0,
          animationEasing: 'linear',
          animationDuration: 1200,
          lineStyle: {
            normal: {
              color: 'transparent'
            }
          },
          areaStyle: {
            normal: {
              color: '#08263a',
              shadowBlur: 50,
              shadowColor: '#000'
            }
          }
        },
        {
          name: 'front',
          type: 'bar',
          data,
          xAxisIndex: 1,
          z: 3,
          itemStyle: {
            normal: {
              barBorderRadius: 5
            }
          }
        }],
        animationEasing: 'elasticOut',
        animationEasingUpdate: 'elasticOut',
        animationDelay(idx) {
          return idx * 20
        },
        animationDelayUpdate(idx) {
          return idx * 20
        }
      })
    }
  }
}
</script>
