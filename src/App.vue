<template>
  <div ref="bg" class="test" :class="{'noImage': !data_IsImage}">
    <pointwave :color="0x097bdb" style="height:0" />
    <div class="container" style="height:100%">
      <div class="menu-l">
        <Button type="info" ghost @click="$router.push('/')" style="margin-left:1.4rem">总体预览</Button>
        <Button
          class="choosePart"
          type="info"
          ghost
          @click="$router.push('/timetrend')"
          style="margin-left:1.4rem"
        >时间趋势</Button>
        <Button
          class="choosePart"
          type="info"
          ghost
          @click="$router.push('/assets')"
          style="margin-left:1.4rem"
        >资产分布</Button>
      </div>
      <div class="menu-r">
        <Button
          class="choosePart"
          type="info"
          ghost
          @click="$router.push('/victims')"
          style="margin-left:1.4rem"
        >受害者</Button>
        <Button
          class="choosePart"
          type="info"
          ghost
          @click="$router.push('/attackers')"
          style="margin-left:1.4rem"
        >攻击者</Button>
        <Button
          class="choosePart"
          type="info"
          ghost
          @click="$router.push('/topn')"
          style="margin-left:1.4rem"
        >TOPN</Button>
      </div>
      <div class="pheader">
        <img class="logo" src="./assets/images/logo.svg" alt />
        <p class="title">分析报告可视化面板展示</p>
      </div>
      <div class="tools" ref="tools">
        <DatePicker
          type="datetimerange"
          :disabled-seconds="seconds"
          ref="time"
          format="yyyy-MM-dd HH:mm:ss"
          @on-change="time=$event"
          v-model="time"
          placeholder="选择时间"
          style="width: 8rem"
        ></DatePicker>
        <Button type="info" ghost @click="reDraw" style="margin:1.2rem" v-if="!isFullScreen">生成报表</Button>
        <Button
          type="info"
          ghost
          href="http://10.11.40.91:8080/report/download"
          @click="exportFile"
          style="margin-left:0.1rem"
          v-if="!isFullScreen"
        >导出</Button>
        <Button
          type="info"
          ghost
          v-if="!isFullScreen"
          @click="getFullScreen"
          style="margin-left:1.2rem"
        >全屏显示</Button>
        <Button
          type="info"
          ghost
          size="large"
          v-if="isFullScreen"
          @click="leaveFullScreen"
          style="margin-left:1.4rem"
        >退出全屏</Button>
      </div>
      <div style="height:100%">
        <router-view ref="content" :key="$route.path"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Pointwave from "@/components/Pointwave";
import loadingSign from "@/components/loadingSign";
import bgPic from "@/assets/images/bg1.png";
export default {
  components: {
    Pointwave,
    loadingSign
  },
  data() {
    return {
      color: "",
      time: null,
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
      data_IsImage: true,
      isFullScreen: false
    };
  },
  methods: {
    changeTime() {},
    reDraw() {
      let path = this.$route.path;
      this.time = { startTime: this.time[0], endTime: this.time[1] };
      console.log(this.time);
      const time2 = JSON.stringify(this.time);
      console.log(time2);
      if (path === "/") {
        this.$refs.content.$refs.asset.initEchart(time2);
        this.$refs.content.$refs.map.initAttEchart(time2);
        this.$refs.content.$refs.map.initVicEchart(time2);
        this.$refs.content.$refs.topn.initEchart(time2);
        this.$refs.content.$refs.time.initEchart(time2);
      } else if (path === "/victims") {
        this.$refs.content.$refs.vicBig.__vue__.initEchart(time2);
      } else if (path === "/attackers") {
        this.$refs.content.$refs.attBig.__vue__.initEchart(time2);
      } else if (path === "/topn") {
        this.$refs.content.$refs.topnBig.__vue__.initEchart(time2);
      } else if (path === "/assets") {
        this.$refs.content.$refs.assetBig.__vue__.initEchart(time2);
      } else if (path === "/timetrend") {
        this.$refs.content.$refs.timeBig.__vue__.initEchart(time2);
      }
    },
    async exportFile() {
      // window.location.href = "http://47.115.43.39:8080/report/download/";
      let params = {
        startTime: this.time[0],
        endTime: this.time[1]
      };
      if (this.time[0] === "") {
        params = {
          startTime: null,
          endTime: null
        };
      }
      await this.$http
        .post("/report/download", params, { responseType: "blob" })
        .then(res => {
          var blob = new Blob([res.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = "用户数据.docx"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        });

    },

    getFullScreen() {
      this.isFullScreen = true;
      this.FullCreeen(document.documentElement);
    },
    leaveFullScreen() {
      this.isFullScreen = false;
      this.outFullCreeen(document);
    },
    FullCreeen(element) {
      this.$refs.tools.style.margin = "1.8% 41%";
      this.$refs.tools.style.height = "2rem";
      let el = element;
      let rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
      if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    //退出全屏的方法
    outFullCreeen(element) {
      this.$refs.tools.style.margin = " 0 36% 0.7% 36%";
      this.$refs.tools.style.height = "3.7rem";
      let el = element;
      let cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;
      if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    }
  }
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  height: 100%;
  position: relative;
}
.noImage {
  background-image: none;
}
.logo {
  width: 4rem;
  height: 2rem;
  top: -1rem;
  position: relative;
  left: 42%;
}
.title {
  position: relative;
  top: -1.9rem;
  left: 21%;
}
.tools {
  margin: 0 36% 0.7% 36%;
  height: 3.7rem;
}

.menu-l {
  position: fixed;
  left: 6%;
  top: 12%;
}
.menu-r {
  position: fixed;
  right: 6%;
  top: 12%;
}
</style>
