<template>
      <div :class="className" :style="{height:height,width:width}"/>
</template>


<script>

import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../../dashboard/mixins/resize'

export default {
    props: {
        className: {
          type: String,
          default: 'chart'
        },
        width: {
          type: String,
          default: '100%'
        },
        height: {
          type: String,
          default: '350px'
        },
        autoResize: {
          type: Boolean,
          default: true
        },
        chartData: {
          type: Object,
          required: true
        }
    },
    data(){
        return{
        }
    },
    watch: {
        chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
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
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions()
      },
      setOptions() {
        this.chart.setOption({
          xAxis: {
            data: this.chartData.date,
            boundaryGap: false,
            type: 'category',
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
            axisLabel:{
              // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
              formatter: function (value, index) {
                  // 格式化成月/日，只在第一个刻度显示年份
                  var date = new Date(value);
                  var month = date.getMonth() + 1;
                  if(month<10)
                      month = "0"+month;
                  var day = date.getDate()<10?"0"+date.getDate():+date.getDate();
                  var texts = [month+'-'+day];
                      texts.push(date.getFullYear());
                  return texts.join('\n');
              }
            }
          },
          grid: {
            left: 50,
            right: 50,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['未税单价', '市场价']
          },
          series: [{
            name: '未税单价', 
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: this.chartData.price,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '市场价',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: this.chartData.marketPrice,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }]
        })
      }
    }
}
</script>

<style>
    
</style>