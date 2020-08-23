<template>
  <div style="width:26%">
    <div class="panel">
      <h3 class="chart-title" style="padding-left:36%;" @click="checkSg">{{msg}}</h3>
      <div class="panel-footer"></div>
    </div>
    <Section class="sgDialog" v-if="showDialog">
      <div class="sgBox">
        <div class="panel" style="margin:2rem;height:85%;width:91%">
          <loadingSign v-if="isLoading" style="top: 41%;left: 47%;"></loadingSign>
          <div v-if="haveData">
            <div v-for="item in info.slice(0,2)">
              <h2
                style="color:white;margin:auto;padding:1rem 0 0 27%"
              >针对告警子类型{{item.subCategory}}的建议</h2>
              <p v-html="item.suggestion" style=" white-space:pre-wrap;"></p>
            </div>
          </div>
          <div v-else class="noDataInfo">未获取到数据</div>
          <Button type="info" ghost size="large" @click="showDialog=false">关闭</Button>
        </div>
      </div>
    </Section>
  </div>
</template>
<script>
import loadingSign from "./loadingSign.vue";

export default {
  data() {
    return {
      showDialog: false,
      info: [],
      isLoading: true,
      haveData: true
    };
  },
  components: {
    loadingSign
  },
  props: {
    msg: String
  },
  methods: {
    async checkSg() {
      let params = {
        startTime: this.$parent.$parent.time.startTime,
        endTime: this.$parent.$parent.time.endTime
      };
      if (this.$parent.$parent.startTime === "") {
        params = {
          startTime: null,
          endTime: null
        };
      }
      this.showDialog === true
        ? (this.showDialog = false)
        : (this.showDialog = true);
      await this.$http.post("/suggestion/all", params).then(res => {
        if (res.data.code === 200) {
          console.log(res);
          this.isLoading = false;
          this.info = res.data.data.suggestionVo1s;
          if (res.data.data.suggestionVo1s.length == 0) {
            this.haveData = false;
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.noDataInfo {
  width: 100%;
  height: 100%;
  margin-top: 30%;
  color: #2ccbef;
  padding: 1% 34% 0 43%;
}
</style>
