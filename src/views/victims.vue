<template>
  <div style="margin: -.476rem;height:100%" ref="vicBig">
    <div class="Echarts" style="height:100%;">
      <dv-border-box-12 class="victimLBox">
        <h3 class="chart-title">受害者分布图</h3>
        <loadingSign v-if="isLoading" style="top: 40%;left: 28%;"></loadingSign>
        <div id="victimmap-big" style="height:90%;width:100%;padding:0 5rem 1rem;"></div>
      </dv-border-box-12>
      <dv-border-box-12 class="victimRBox">
        <h3 class="chart-title">受害者TOP5</h3>
        <loadingSign v-if="isLoading" style="top: 40%;left: 75%;"></loadingSign>
        <div id="victim-top" class="victimTop-item"></div>
      </dv-border-box-12>
      <div class="victim-form">
        <h3 class="chart-title" >最新受害者列表</h3>
        <loadingSign v-if="isLoading" style="top:76%;left: 44%;"></loadingSign>
        <dv-scroll-board
          :config="chartConfig"
          style="height:70%;padding:0 2rem 3rem"
          id="vicChart"
        />
      </div>
    </div>
  </div>
</template>
<script>
import loadingSign from "../components/loadingSign";
export default {
  components: {
    loadingSign
  },
  data() {
    return {
      data: null,
      victimData: null,
      chartConfig: null,
      isLoading:true,
    };
  },
  mounted() {
    const myChart = this.$echarts.init(
      document.getElementById("victimmap-big")
    );
    const myChart1 = this.$echarts.init(document.getElementById("victim-top"));

    window.addEventListener("resize", function() {
      myChart.resize();
      myChart1.resize();
    });
    this.initEchart();
  },
  methods: {
    async initEchart(data) {
      await this.$http.post("/api/Victim/analysis", data, res => {
        this.data = res.data.data;
        this.isLoading = false;
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
        this.processData();
        const mapChart = this.$echarts.init(
          document.getElementById("victimmap-big")
        );
        const victimOptions = {
          title: {
            subtext: "不同地域所遭受的攻击详情",
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
            left: 20,
            bottom: 50
          },
          series: myseries
        };
        mapChart.setOption(victimOptions);
        this.chartConfig = this.data.latestVictim;
        this.chartConfig.rowNum = 3;
        const victimtop = this.$echarts.init(
          document.getElementById("victim-top")
        );
        victimtop.setOption({
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "13%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.data.topVictim.xaxis,
              axisTick: {
                alignWithLabel: true
              },
              lineStyle: {
                type: "solid",
                color: "#fff", //左边线的颜色
                width: "2" //坐标线的宽度
              },
              axisLabel: {
                textStyle: {
                  color: "#fff" //坐标值得具体的颜色
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: {
                textStyle: {
                  color: "#fff" //坐标值得具体的颜色
                }
              }
            }
          ],
          series: [
            {
              name: "受害次数",
              type: "bar",
              barWidth: "60%",
              label: {
                show: true,
                position: "top"
              },
              data: this.data.topVictim.yaxis
            }
          ]
        });
      });
    },
     processData() {
      let v = 0;
      const omIndex = this.data.maps[0].findIndex(
        element => element.name === "欧盟"
      );
      var Europe = [
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
        "Lithuania",
        "United Kingdom",
        "Luxembourg",
        "Republic of Malta",
        "Nederland",
        "Poland",
        "Portugal",
        "Slovakia",
        "Slovenia"
      ];

      this.data.maps[0].splice(omIndex, 1, {
        name: Europe[0],
        value: this.data.maps[0][omIndex].value
      });
      for (let i = 1; i < Europe.length; i++)
        this.data.maps[0].splice(omIndex, 0, {
          name: Europe[i],
          value: this.data.maps[0][omIndex].value
        });
      this.data.maps[1].splice(omIndex, 1, {
        name: Europe[0],
        value: this.data.maps[1][omIndex].value
      });
      for (let i = 1; i < Europe.length; i++)
        this.data.maps[1].splice(omIndex, 0, {
          name: Europe[i],
          value: this.data.maps[1][omIndex].value
        });
    },
  }
};
</script>
<style scoped>
.victimmap-big {
  width: 100%;
}
.victimLBox {
  margin: 1rem 0 0 4.6rem;
  background-color: #2259878c;
  border-radius: 1.076923rem;
  width: 56%;
  height: 48%;
}
.victimRBox {
  margin: 0.5rem 3.5rem 0 3.5rem;
  background-color: #2259878c;
  border-radius: 1.07rem;
  width: 33%;
  position: relative;
  top: -49%;
  left: 58%;
  height: 48%;
}
.victim-form {
  position: relative;
  left: 10%;
  height: 24%;
  top: -51%;
  width: 80%;
}
.victimTop-item {
  width: 100%;
  height: 90%;
  padding: 0 3rem 3rem;
}
</style>
