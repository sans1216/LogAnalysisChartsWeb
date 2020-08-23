<template>
  <div class="Echarts">
    <div class="panel">
      <h3 class="chart-title">{{msg}}分析</h3>
      <loadingSign v-if="isLoading" style="top: 41%;left: 47%;"></loadingSign>
      <div id="chartmap" style="width: 100%;height:69%;"></div>
      <!-- <div class="noDataInfo" style="width: 100%;height:69%;">未获取到数据</div> -->
      <div class="changeBtn" v-if="isVictim">
        <Button type="info" ghost style="width:100px" @click="changeProfile()">查看攻击者</Button>
      </div>
      <div class="changeBtn" v-else>
        <Button type="info" ghost style="width:100px" @click="changeProfile()">查看受害者</Button>
      </div>
      <h3 class="chart-title" style="position: relative;top: -3.5rem;">{{msg}}详细信息</h3>
      <chart-form class="vicChart" :config="chartConfig"></chart-form>
      <!-- <div  class="noDataInfo" style="width: 100%;height:69%;">未获取到数据</div> -->
      <div class="panel-footer"></div>
    </div>
  </div>
</template>

<script>
import loadingSign from "./loadingSign.vue";
import chartForm from "./chart-form.vue";

export default {
  name: "chartMap",
  components: {
    loadingSign,
    chartForm
  },
  data() {
    return {
      isVictim: true,
      chartConfig: null,
      anotherconfig: this.config,
      attackerOptions: null,
      data: null,
      isLoading: true,
      haveData: true,
      haveData2:false,
    };
  },
  props: {
    msg: String,
    config: Array
  },
  mounted() {
    const myChart = this.$echarts.init(document.getElementById("chartmap"));
    window.addEventListener("resize", () => {
      myChart.resize();
    });
    this.initVicEchart();
  },
  methods: {
    async initVicEchart(data) {
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
      await this.$http.post("/Victim/analysis", params).then(res => {
        if (res.data.code === 200) {
          this.isLoading = false;
          this.msg = "受害者";
          this.data = res.data.data;
          this.processData();
          if (res.data.data.maps[0].length == 0) {
            this.haveData = false;
          }
          const myseries = [
            {
              name: "受害热度",
              type: "map",
              mapType: "world",
              label: {
                show: false
              },
              data: this.data.maps[0]
            },
            {
              name: "受害告警类型",
              type: "map",
              mapType: "world",
              label: {
                show: false
              },
              data: this.data.maps[1]
            }
          ];
          const myChart = this.$echarts.init(
            document.getElementById("chartmap")
          );
          const victimOptions = {
            title: {
              subtext: "不同地域所遭受的攻击详情",
              left: 285
            },
            tooltip: {
              trigger: "item",
              textStyle: {
                color: "#fff"
              },
              formatter(params) {
                let res = `${params.name}<br/>`;
                for (let i = 0; i < myseries.length; i += 1) {
                  for (let j = 0; j < myseries[i].data.length; j += 1) {
                    if (myseries[i].data[j].name === params.name) {
                      res += `${myseries[i].name} : ${myseries[i].data[j].value}</br>`;
                    }
                  }
                }
                return res;
              }
            },
            toolbox: {
              show: true,
              orient: "vertical",
              left: "right",
              top: "center",
              feature: {
                restore: {},
                saveAsImage: {}
              }
            },
            visualMap: {
              min: 0,
              max: 1100000,
              realtime: false,
              calculable: true,
              inRange: {
                color: ["#05CBE9", "#3D85FF"]
              },
              left: 20
            },
            series: myseries
          };
          myChart.setOption(victimOptions);
          this.chartConfig = this.data.latestVictim;
          this.chartConfig.data = this.chartConfig.data.concat(
            this.chartConfig.data.slice(0, 5)
          );
          this.chartConfig.rowNum = 2;
          this.chartConfig.hoverPause = true;

        }
      });
    },
    async initAttEchart(data) {
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
      await this.$http.post("/Attacker/analysis", params).then(res => {
        if (res.data.code === 200) {
          this.msg = "攻击者";
          this.data = res.data.data;
          if (res.data.data.maps[0].length == 0) {
            this.haveData = false;
          }
          const myseries = [
            {
              name: "攻击热度",
              type: "map",
              mapType: "world",
              label: {
                show: false
              },
              data: this.data.maps[0]
            },
            {
              name: "攻击链类型",
              type: "map",
              mapType: "world",
              label: {
                show: false
              },
              data: this.data.maps[1]
            }
          ];
          const myChart = this.$echarts.init(
            document.getElementById("chartmap")
          );
          const attackOptions = {
            grid: {
              top: "10%",
              left: "35%",
              right: "20%",
              bottom: "10%"
            },
            title: {
              subtext: "不同地域所发起的攻击详情",
              left: 285
            },
            tooltip: {
              trigger: "item",
              textStyle: {
                color: "#fff"
              },
              formatter(params) {
                let res = `${params.name}<br/>`;
                for (let i = 0; i < myseries.length; i += 1) {
                  for (let j = 0; j < myseries[i].data.length; j += 1) {
                    if (myseries[i].data[j].name === params.name) {
                      res += `${myseries[i].name} : ${myseries[i].data[j].value}</br>`;
                    }
                  }
                }
                return res;
              }
            },
            toolbox: {
              show: true,
              orient: "vertical",
              left: "right",
              top: "center",
              feature: {
                restore: {},
                saveAsImage: {}
              }
            },
            visualMap: {
              min: 0,
              max: 1100000,
              realtime: false,
              calculable: true,
              inRange: {
                color: ["#FFF", "#8B78F6"]
              },
              left: 20
            },
            series: myseries
          };
          myChart.setOption(attackOptions);
          this.chartConfig = this.data.latestAttacker;
          this.chartConfig.rowNum = 2;
        }
      });
    },
    processData() {
      if (this.data.maps[0][0] != undefined) {
        const v = 0;
        const omIndex = this.data.maps[0].findIndex(
          element => element.name === "欧盟"
        );
        const Europe = [
          "Austria",
          "Belgium",
          "Bulgaria",
          "Croatia",
          "Cyprus",
          "Czech Rep",
          "Denmark",
          "Estonia",
          "Finland",
          "Greece",
          "Hungary",
          "Ireland",
          "Latvia",
          "United Kingdom",
          "Luxembourg",
          "Republic of Malta",
          "Nederland",
          "Portugal",
          "Slovakia",
          "Slovenia"
        ];

        this.data.maps[0].splice(omIndex, 1, {
          name: Europe[0],
          value: this.data.maps[0][omIndex].value
        });
        for (let i = 1; i < Europe.length; i++) {
          this.data.maps[0].splice(omIndex, 0, {
            name: Europe[i],
            value: this.data.maps[0][omIndex].value
          });
        }
        this.data.maps[1].splice(omIndex, 1, {
          name: Europe[0],
          value: this.data.maps[1][omIndex].value
        });
        for (let i = 1; i < Europe.length; i++) {
          this.data.maps[1].splice(omIndex, 0, {
            name: Europe[i],
            value: this.data.maps[1][omIndex].value
          });
        }
      }
    },
    changeProfile() {
      if (this.isVictim) {
        this.initAttEchart();
        this.isVictim = false;
      } else {
        this.initVicEchart();
        this.isVictim = true;
      }
    }
  }
};
</script>
<style scoped>
.noDataInfo {
  width: 100%;
  height: 100%;
  color: #2ccbef;
  padding: 0% 32% 0 41%;
}
</style>
