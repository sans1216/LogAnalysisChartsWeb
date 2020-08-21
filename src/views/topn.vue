<template>
  <div style="height:100%" ref="topnBig">
    <div style="display:flex;height:100%;margin:auto">
      <dv-border-box-12 class="topnBox">
        <h3 class="chart-title" style="padding-top:2rem">攻击链TOP5</h3>
        <loadingSign v-if="isLoading" style="top: 36%;left: 21%;"></loadingSign>
        <div id="chartTopn1" class="topn-item"></div>
        <h3 class="chart-title" style="padding-top:1rem;">设备TOP5</h3>
        <loadingSign v-if="isLoading" style="top: 67%;left: 21%;"></loadingSign>
        <div id="chartTopn2" class="topn-item"></div>
      </dv-border-box-12>
      <dv-border-box-12 class="topnBox">
        <h3 class="chart-title" style="padding-top:2rem">模型类型TOP5</h3>
        <loadingSign v-if="isLoading" style="top: 36%;left: 69%;"></loadingSign>
        <div id="chartTopn3" class="topn-item"></div>
        <h3 class="chart-title" style="padding-top:1rem">告警子类型TOP5</h3>
        <loadingSign v-if="isLoading" style="top: 67%;left: 69%;"></loadingSign>
        <div id="chartTopn4" class="topn-item"></div>
      </dv-border-box-12>
    </div>
  </div>
</template>
<script>
import loadingSign from "../components/loadingSign";
export default {
  data() {
    return {
      data: null,
      isLoading: true
    };
  },
  components: {
    loadingSign
  },
  mounted() {
    const myChart = this.$echarts.init(document.getElementById("chartTopn1"));
    const myChart4 = this.$echarts.init(document.getElementById("chartTopn2"));
    const myChart2 = this.$echarts.init(document.getElementById("chartTopn3"));
    const myChart3 = this.$echarts.init(document.getElementById("chartTopn4"));
    window.addEventListener("resize", function() {
      myChart.resize();
      myChart4.resize();
      myChart2.resize();
      myChart3.resize();
    });
    this.initEchart();
  },
  methods: {
    async initEchart(data) {
      await this.$http.post("/api/Attacker/topN", data, res => {
        if (res.data.code === 200) {
          this.isLoading = false;
          this.data = res.data.data;
          const myChart = this.$echarts.init(
            document.getElementById("chartTopn1")
          );
          const myChart2 = this.$echarts.init(
            document.getElementById("chartTopn2")
          );
          const myChart3 = this.$echarts.init(
            document.getElementById("chartTopn3")
          );
          const myChart4 = this.$echarts.init(
            document.getElementById("chartTopn4")
          );
          let chartArray = [myChart, myChart2, myChart3, myChart4];
          for (let i = 0; i < chartArray.length; i++) {
            let data = this.data.topN[i].data;
            let titlename = this.data.topN[i].titleName;
            let valdata = this.data.topN[i].valdata;
            const myColor = [
              "#1089E7",
              "#F57474",
              "#56D0E3",
              "#F8B448",
              "#8B78F6"
            ];
            let option = {
              // 图标位置
              grid: {
                top: "10%",
                left: "32%",
                right: "14%",
                bottom: "10%"
              },
              xAxis: {
                show: false
              },
              yAxis: [
                {
                  show: true,
                  data: titlename,
                  inverse: true,
                  axisLine: {
                    show: true
                  },
                  splitLine: {
                    show: true
                  },
                  axisTick: {
                    show: true
                  },
                  axisLabel: {
                    color: "#fff",
                    rich: {
                      lg: {
                        backgroundColor: "#FFF",
                        color: "#fff",
                        borderRadius: 15,
                        align: "center",
                        width: 19,
                        height: 15
                      }
                    }
                  }
                },
                {
                  show: true,
                  inverse: true,
                  data: data,
                  axisLabel: {
                    textStyle: {
                      fontSize: 12,
                      color: "#fff"
                    }
                  }
                }
              ],
              series: [
                {
                  name: "条",
                  type: "bar",
                  yAxisIndex: 0,
                  data: data,
                  barCategoryGap: 50,
                  barWidth: 10,
                  itemStyle: {
                    normal: {
                      barBorderRadius: 20,
                      color(params) {
                        const num = myColor.length;
                        return myColor[params.dataIndex % num];
                      }
                    }
                  },
                  label: {
                    normal: {
                      show: false,
                      position: "outside",
                      formatter: "{c}"
                    }
                  }
                },
                {
                  name: "框",
                  type: "bar",
                  yAxisIndex: 1,
                  barCategoryGap: 50,
                  data: data,
                  barWidth: 15,
                  itemStyle: {
                    normal: {
                      color: "none",
                      borderColor: "#00c1de",
                      borderWidth: 3,
                      barBorderRadius: 15
                    }
                  }
                }
              ]
            };
            chartArray[i].setOption(option);
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
.topn-item {
  width: 90%;
  height: 30%;
  margin: auto;
}
.topnBox {
  margin: 1% 0 0 6.5%;
  height: 68%;
  background-color: #2259878c;
  border-radius: 1.076923rem;
  width: 40%;
}
</style>
