<template>
  <div style="padding:0  1.4rem;height:100%" ref="assetBig">
    <div style="display:flex;width:100%;height:35%">
      <div class="assetBox" style="margin:0 5rem;width: 94%;">
        <div class="panel">
          <h3 class="chart-title" style="padding-top:1.5rem">风险资产数量分布</h3>
          <loadingSign v-if="isLoading" style="top: 35%;left: 22%;"></loadingSign>
          <div id="assChart1" style="width: 21rem;height:70%;margin:auto"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="assetBox" style="margin:0 5rem 0 0;width: 94%;">
        <div class="panel">
          <h3 class="chart-title" style="padding-top:1.5rem">被攻击资产TOP5</h3>
          <loadingSign v-if="isLoading" style="top: 35%;left: 72%;"></loadingSign>
          <div id="assTop5" style="width: 26rem;height:70%;margin:auto"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </div>
    <div style="height:34%">
      <div class="assetBox" style="height: 100%;margin: 0.5rem 1rem 0px 2.9rem;width: 94%;">
        <div class="panel">
          <loadingSign v-if="isLoading" style="top: 71%;left: 45%;"></loadingSign>
          <h3 class="chart-title" style="padding-top:1rem">最近十项被攻击风险资产</h3>
          <!-- <dv-scroll-board
            style="height:73%;padding:0 3rem 3rem"
            :config="assetConfig"
            id="assChart2"
          />-->
          <chart-form style="height:87%;padding:0 3rem 3rem" id="assChart2" :config="assetConfig"></chart-form>
          <div class="panel-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loadingSign from "../components/loadingSign";
import chartForm from "../components/chart-form";

export default {
  components: {
    loadingSign,
    chartForm
  },
  data() {
    return {
      assetConfig: null,
      isLoading: true,
      colors: ["#2EE7FF", "#86FED8", "#0f225E", "#8ac2f8c4"],
      assData: null
    };
  },
  mounted() {
    this.initEchart();
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
      await this.$http.post("/RiskAsset/all", params).then(res => {
        const numsChart = this.$echarts.init(
          document.getElementById("assChart1")
        );
        const topChart = this.$echarts.init(document.getElementById("assTop5"));
        this.isLoading = false;
        this.assData = res.data.data;
        const titlename = this.assData.riskAssetVo3.titleName;
        const { data } = this.assData.riskAssetVo3;
        const valdata = this.assData.riskAssetVo3.valData;
        const myColor = [
          "#2EE7FF",
          "#86FED8",
          "#8ac2f8c4",
          "#8B78F6",
          "#0f225E"
        ];
        const topOption = {
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
              data,
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
              data,
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
              data,
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
        const numsOption = {
          color: ["#2EE7FF", "#86FED8", "#0f225E", "#8ac2f8c4"],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: 0,
            top: 40,
            data: ["低风险", "已失陷", "高风险"],
            textStyle: {
              color: "white"
            }
          },
          series: [
            {
              name: "资产分布",
              type: "pie",
              radius: ["50%", "60%"],
              top: -30,
              left: 0,
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "inside"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: this.assData.riskAssetVo2.list
            }
          ]
        };
        numsChart.setOption(numsOption);
        // typeChart.setOption(numsOption);
        topChart.setOption(topOption);
        this.assetConfig = this.assData.riskAssetVo1;
        this.assetConfig.data = this.assetConfig.data.concat(
          this.assetConfig.data.slice(0, 5)
        );
      });
    }
  }
};
</script>
