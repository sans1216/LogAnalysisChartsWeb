<template>
  <div :class="{'noImage': !data_IsImage}" style="padding:0rem 3.5%;height:100%" >
    <div style="height:100%">
      <div style="margin: auto; height: 100%;width: 100%;">
        <chartTime ref="time" :msg="title1" style="width:26%;height:36%"></chartTime>
        <chartAsset ref="asset" :msg="title2" :config="assetConfig" :data="assetData" style="width:26%;height:34%"></chartAsset>
        <chartMap ref="map" class="map" :msg="title3" :config="mapConfig"></chartMap>
        <chartTopN ref="topn" class="topn1" style="width:26%" :msg="title4" :data="topnData"></chartTopN>
        <btnSuggest ref="suggest" class="btnSuggest" :msg="title5"></btnSuggest>
      </div>
    </div>
  </div>
</template>
<script>
import chartTime from "../components/chart-time.vue";
import chartAsset from "../components/chart-asset.vue";
import chartMap from "../components/chart-map.vue";
import chartTopN from "../components/chart-topn.vue";
import btnSuggest from "../components/btn-suggest.vue";

export default {
  data() {
    return {
      color: "#091059",
      time: "",
      title1: "数据时序分布趋势柱状图",
      title2: "资产分布饼图",
      title3: "受害者",
      title4: "TOPN风险排行",
      title5: "查看说明及建议",
      seconds: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60
      ],
      timeData: null,
      assetConfig: {
        header: ["安全域", "资产名称", "风险评级"],
        data: [
          ["风暴中心（机房）", "WEB服务器-10.20.82.92", "已失陷"],
          ["风暴中心（机房）", "WEB服务器-10.20.82.92", "已失陷"],
          ["风暴中心（机房）", "WEB服务器-10.20.82.92", "已失陷"],
          ["服务中心（机房）", "WEB服务器-10.20.82.92", "已失陷"],
          ["服务中心（机房）", "WEB服务器-storm-node-10", "已失陷"],
          ["AiLPHA-SOC（机房）", "WEB服务器-storm-node-10", "已失陷"],
          ["AiLPHA-SOC（机房）", "DNS服务器-10.50.1.180", "高风险"],
          ["AiLPHA-SOC（机房）", "WEB服务器-jenkins.adl.io", "高风险"],
          ["安恒密盾（机房）", "WEB服务器-jenkins.adl.io", "高风险"],
          ["安恒密盾（机房）", "DNS服务器-10.50.1.180", "高风险"]
        ]
      },
      assetData: [
        { value: 335, name: "已失陷" },
        { value: 310, name: "高风险" },
        { value: 234, name: "低风险" },
        { value: 135, name: "安全" }
      ],
      mapData: null,
      mapConfig: null,
      topnData: null,
      data_IsImage: true,
      isFullScreen: false
    };
  },
  created() {},
  components: {
    chartTime,
    chartAsset,
    chartMap,
    chartTopN,
    btnSuggest,
  },
  methods: {

  }
};
</script>
<style scoped>
.map {
  position: relative;
  top: -73%;
  left: 28.5%;
  width: 43%;
  height: 73%;
}
.topn1 {
  position: relative;
  top: -146%;
  left: 74%;
  height:64.5%
}
</style>
