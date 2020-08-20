<template>
  <div style="width: 28%;">
    <section>
      <dv-border-box-12 class="rightBox">
        <h3 class="chart-title" style="padding-top:2rem">攻击链TOP5</h3>
        <loadingSign v-if="isLoading" style="top:35%;left:81%"></loadingSign>
        <div id="chartTopn1" class="topnItem" style="width: 100%;height:11rem;"></div>
        <h3 class="chart-title">被害设备TOP5</h3>
        <loadingSign v-if="isLoading" style="top:65%;left:81%"></loadingSign>
        <div id="chartTopn2" class="topnItem" style="width: 100%;height:11rem;"></div>
      </dv-border-box-12>
    </section>
  </div>
</template>
<script>
import loadingSign from "./loadingSign.vue";
export default {
  name: "chartTime",
  components: {
    loadingSign
  },
  data() {
    return {
      isLoading: true
    };
  },
  props: {
    msg: String
  },
  mounted() {
    this.initEchart();
    const myChart = this.$echarts.init(document.getElementById("chartTopn1"));
    const myChart2 = this.$echarts.init(document.getElementById("chartTopn2"));
    window.addEventListener("resize", function() {
      myChart.resize();
      myChart2.resize();
    });
  },
  methods: {
    async initEchart() {
      await this.$http.post("/api/Attacker/topN", null, res => {
        if (res.data.code == 200) {
          this.isLoading = false;
          this.data = res.data.data;
          const myChart = this.$echarts.init(
            document.getElementById("chartTopn1")
          );
          const myChart2 = this.$echarts.init(
            document.getElementById("chartTopn2")
          );
          let chartArray = [myChart, myChart2];
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
                left: "35%",
                right: "20%",
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
<style lang="scss" scoped>
.topnItem {
  width: 95%;
  height: 11rem;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
</style>
