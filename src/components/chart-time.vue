<template>
  <div class="Echarts">
    <dv-border-box-12 class="leftBox">
      <h3 class="chart-title">{{msg}}</h3>
      <loadingSign v-if="isLoading" style="top: 32%;left: 12%;"></loadingSign>
      <div id="chart1" style="width: 100%;height:16rem;"></div>
    </dv-border-box-12>
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
      colors: ["#8B78F6", "#56D0E3", "#F57474"],
      timeData: [],
      data: null,
      isLoading: true
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
    window.addEventListener("resize", function() {
      myChart.resize();
    });
  },
  methods: {
    async initEchart(data) {
      await this.$http.post("/api/DistributionTrend/all", data, res => {
        if (res.data.code == 200) {
          this.isLoading = false;
          this.data = res.data.data;
          this.timeData = res.data.data.list;
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
              bottom: "20%",
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
            dataZoom: [
              {
                show: true,
                realtime: true,
                start: 30,
                end: 70
              },
              {
                type: "inside",
                realtime: true,
                start: 30,
                end: 70
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
</style>
