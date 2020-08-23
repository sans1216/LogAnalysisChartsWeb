<template>
  <div class="Echarts">
    <div class="leftBox">
      <div class="panel">
        <h3 class="chart-title">{{msg}}</h3>
        <loadingSign v-if="isLoading" style="top: 33%;left: 13%;"></loadingSign>
        <div id="chart1" style="width: 100%;height:16rem;"></div>
        <!-- <div v-if="!haveData" class="noDataInfo">未获取到数据</div> -->
      </div>
      <div class="panel-footer"></div>
    </div>
  </div>
</template>

<script>
import loadingSign from "./loadingSign.vue";

const cors = require("cors");

export default {
  name: "chartTime",
  components: {
    loadingSign
  },
  data() {
    return {
      colors: ["#86fed8", "#14e9ff", "#015bff"],
      timeData: [],
      data: null,
      isLoading: true,
      haveData: true
    };
  },
  props: {
    msg: String
  },
  mounted() {
    if (this.data == null) {
      this.$Loading.start();
      this.initEchart();
    } else {
      this.$Loading.finish();
    }

    const myChart = this.$echarts.init(document.getElementById("chart1"));
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  },
  methods: {
    async initEchart(data) {
      let params = {
        startTime: this.$parent.$parent.time.startTime,
        endTime: this.$parent.$parent.time.endTime
      };
      if (this.$parent.$parent.time.startTime === undefined) {
        params = {
          startTime: null,
          endTime: null
        };
      }
      await this.$http.post("/DistributionTrend/all", params).then(res => {
        if (res.data.code == 200) {
          this.isLoading = false;
          this.data = res.data.data;
          this.timeData = res.data.data.list;
          if (res.data.data.high.length == 0) {
            this.haveData = false;
          }
          console.log(this.haveData)
          const myChart = this.$echarts.init(document.getElementById("chart1"));
          const timeData = this.timeData.map(str => str.replace("2020/", ""));
          const option = {
            color: this.colors,
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985"
                },
                lineStyle: {
                  color: this.colors[0]
                }
              }
            },
            legend: {
              data: ["高风险", "中风险", "低风险"],
              textStyle: { color: "#fff" },
              inactiveColor: this.colors[2]
            },
            grid: {
              left: "8%",
              right: "8%",
              bottom: "30%",
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                data: timeData,
                axisTick: {
                  alignWithLabel: true
                },
                axisLine: {
                  onZero: false,
                  lineStyle: {
                    color: this.colors[1]
                  }
                }
              },
              {
                type: "category",
                axisTick: {
                  alignWithLabel: true
                },
                axisLine: {
                  onZero: false,
                  lineStyle: {
                    color: this.colors[0]
                  }
                },
                data: timeData
              }
            ],
            yAxis: [
              {
                axisLine: {
                  type: "value",
                  lineStyle: {
                    color: this.colors[0]
                  }
                }
              }
            ],

            series: [
              {
                name: "高风险",
                type: "line",
                stack: "总量",
                areaStyle: {},
                smooth: true,
                data: this.data.high
              },
              {
                name: "中风险",
                type: "line",
                stack: "总量",
                areaStyle: {},
                smooth: true,
                data: this.data.medium
              },
              {
                name: "低风险",
                type: "line",
                stack: "总量",
                areaStyle: {},
                smooth: true,
                data: this.data.low
              }
            ]
          };
          myChart.setOption(option);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.noDataInfo {
  width: 100%;
  height: 100%;
  margin-top: 5%;
  color: #2ccbef;
  padding: 1% 34% 0 37%;
}
</style>
