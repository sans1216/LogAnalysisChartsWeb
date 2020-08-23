<template>
  <div style="height:100%" ref="timeBig">
    <div class="timeBox">
      <div class="panel">
        <h2 class="chart-title">数据时序分布趋势图</h2>
        <loadingSign v-if="isLoading" style="top: 50%;left: 47%;"></loadingSign>
        <div id="charttime" style="width: 100%;height:100%;"></div>
        <div class="panel-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import loadingSign from "../components/loadingSign";

export default {
  data() {
    return {
      colors: ["#8B78F6", "#56D0E3", "#F57474"],
      timeData: [],
      data: null,
      isLoading: true
    };
  },
  components: {
    loadingSign
  },
  mounted() {
    this.initEchart();
    const myChart = this.$echarts.init(document.getElementById("charttime"));
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  },
  methods: {
    async initEchart(data) {
      let params = {
        startTime: this.$parent.time.startTime,
        endTime: this.$parent.time.endTime
      };
      if (this.$parent.time.startTime === undefined) {
        params = {
          startTime: null,
          endTime: null
        };
      }
      await this.$http.post("/DistributionTrend/all", params).then(res => {
        if (res.data.code === 200) {
          this.isLoading = false;
          this.data = res.data.data;
          this.timeData = res.data.data.list;
          const myChart = this.$echarts.init(
            document.getElementById("charttime")
          );
          const timeData = this.timeData.map(str => str.replace("2020/", ""));
          myChart.setOption({
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
              left: "3%",
              right: "4%",
              bottom: "15%",
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
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>
