<template>
  <div ref="bg" class="test" :class="{'noImage': !data_IsImage}">
    <pointwave :color="0x097bdb" style="height:0"/>
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
        <TimePicker
          v-if="!isFullScreen"
          confirm
          v-model="time"
          @on-change="changeTime"
          type="timerange"
          placement="bottom-end"
          size="large"
          placeholder="时间选择"
          style="width: 8rem;"
          hide-disabled-options
          :disabled-seconds="seconds"
        ></TimePicker>
        <Button
          type="info"
          ghost
          size="large"
          @click="reDraw"
          style="margin:1.4rem"
          v-if="!isFullScreen"
        >生成报表</Button>
        <Button
          type="info"
          ghost
          size="large"
          @click="exportFile"
          style="margin-left:0.15rem"
          v-if="!isFullScreen"
        >导出</Button>
        <Button
          type="info"
          ghost
          size="large"
          v-if="!isFullScreen"
          @click="getFullScreen"
          style="margin-left:1.4rem"
        >全屏显示</Button>
        <Button
          type="info"
          ghost
          size="large"
          v-if="isFullScreen"
          @click="leaveFullScreen"
          style="margin-left:1.4rem"
        >退出全屏</Button>
        <ColorPicker size="large" style="margin-left:1.5rem" v-model="color" @on-change="changeBG" />
      </div>
      <div style="height:100%">
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Pointwave from "@/components/Pointwave";
export default {
  components: {
    Pointwave
  },
  data() {
    return {
      color: "#091059",
      time: "",
      seconds: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
      timeData: null,
      data_IsImage: true,
      isFullScreen: false
    };
  },
  created() {},
  methods: {
    changeTime() {
      console.log(this.time);
    },
    reDraw() {
      console.log("reDraw");
    },
    exportFile() {
      console.log("export");
    },
    changeBG() {
      this.data_IsImage = false;
      this.$refs.bg.style.background = this.color;
    },
    getFullScreen() {
      this.isFullScreen = true;
      this.FullCreeen(document.documentElement);
    },
    leaveFullScreen() {
      this.isFullScreen = false;
      this.outFullCreeen(document);
      console.log(this.isFullScreen);
    },
    FullCreeen(element) {
      this.$refs.tools.style.margin="1.8% 41%";
      this.$refs.tools.style.height="2rem" ;
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

      this.$refs.tools.style.margin="0.4% 31%";
      this.$refs.tools.style.height="4rem" ;
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
.container{
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
  margin: 0.4% 31%;
  height: 4rem;
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
