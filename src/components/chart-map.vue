<template>
  <div class="Echarts">
    <dv-border-box-12 class="mainBox">
      <h3 class="chart-title">{{msg}}分析</h3>
      <loadingSign v-if="isLoading" style="top: 41%;left: 47%;"></loadingSign>
      <div id="chartmap" style="width: 100%;height:69%;"></div>
      <dv-decoration-7 v-if="isVictim" class="changeBtn">
        <Button type="info" ghost style="width:100px" @click="changeProfile()">查看攻击者</Button>
      </dv-decoration-7>
      <dv-decoration-7 v-else class="changeBtn">
        <Button type="info" ghost style="width:100px" @click="changeProfile()">查看受害者</Button>
      </dv-decoration-7>
      <h3 class="chart-title" style="position: relative;top: -3.5rem;">{{msg}}详细信息</h3>
      <dv-scroll-board :config="chartConfig" id="vicChart" class="vicChart" />
    </dv-border-box-12>
  </div>
</template>

<script>
import loadingSign from "./loadingSign.vue";
export default {
  name: "chartMap",
  components: {
    loadingSign
  },
  data() {
    return {
      isVictim: true,
      chartConfig: null,
      anotherconfig: this.config,
      attackerOptions: null,
      data: null,
      isLoading: true
    };
  },
  props: {
    msg: String,
    config: Array
  },
  mounted() {
    const myChart = this.$echarts.init(document.getElementById("chartmap"));
    window.addEventListener("resize", function() {
      myChart.resize();
    });
    this.initVicEchart();
  },
  methods: {
    async initVicEchart() {
      await this.$http.post("/api/Victim/analysis", null, res => {
        if (res.data.code == 200) {
          this.isLoading = false;
          this.msg = "受害者";
          this.data = res.data.data;
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
              name: "受害主要类型",
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
              left: 215
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
          myChart.setOption(victimOptions);
          this.chartConfig = this.data.latestVictim;
          this.chartConfig.rowNum = 2;
        }
      });
    },
    async initAttEchart() {
      await this.$http.post("/api/Attacker/analysis", null, res => {
        if (res.data.data.code == 200) {
          this.msg = "攻击者";
          this.data = res.data.data;
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
              name: "攻击主要类型",
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
              left: 295
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

    changeProfile() {
      console.log(this.isVictim);
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
</style>
