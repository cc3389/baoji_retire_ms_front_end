<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import {memberChart} from "@/api/member";

export default {
  watch: {
    options: {
      handler(options) {
        this.chart.setOption(this.options)
      },
      deep: true
    }
  },
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
      chart: null,
      data: '',
      data2: ''
    }
  },
  mounted() {
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
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      new Promise(resolve => {
        memberChart().then(response => {
          if (response.code === 200) {
            this.data = response.data.in
            this.data2 = response.data.out
          }
        })
      })
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
      ]// x轴底部参照
      // const data = [] // 正数据
      // const data2 = []// 负数据
      // for (let i = 1; i <= 12; i++) {
      //   xAxisData.push(i)
      //   // data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
      //   data.push(i)
      //   // data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3)
      //   data2.push(-i)
      // }
      this.chart.setOption({
        title: {
          text: '社区人员转入转出情况'
        },
        backgroundColor: '#08263a',
        grid: {
          left: '5%',
          right: '5%'
        },
        xAxis: [
        //   {
        //   axisTick: {
        //     alignWithLabel: true
        //   },
        //   type: 'category',
        //   name: '时间',
        //   show: true, // 参照放下面
        //   data: xAxisData
        // }
          {
            axisTick: {
              alignWithLabel: true
            },
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            name: '转入人数',
            data: [
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
          },
          {
            axisTick: {
              alignWithLabel: true
            },
            name: '转出人数',
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            data: [
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
            show: false // y轴坐标引导线
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
          data: this.data2,
          z: 1,
          itemStyle: {
            normal: {
              opacity: 0.4,
              barBorderRadius: 5,
              shadowBlur: 3,
              shadowColor: '#111'
            }
          }
        }, {
          name: 'Simulate Shadow',
          type: 'line',
          data: this.data2,
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
        }, {
          name: 'front',
          type: 'bar',
          data: this.data,
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
