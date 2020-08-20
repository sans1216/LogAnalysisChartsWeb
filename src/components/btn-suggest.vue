<template>
  <div style="width:26%">
    <dv-border-box-12>
      <h3 class="chart-title" style="padding-left:36%;" @click="checkSg">{{msg}}</h3>
    </dv-border-box-12>
    <Section class="sgDialog" v-if="showDialog">
      <dv-border-box-13 class="sgBox">
        <loadingSign v-if="isLoading" style="top: 41%;left: 47%;"></loadingSign>
        <div v-for="item in info.slice(0,2)">
          <h2 style="color:white;margin:auto;padding:1rem 0 0 27%">针对告警子类型{{item.subCategory}}的建议</h2>
          <p v-html="item.suggestion" style=" white-space:pre-wrap;"></p>
        </div>
        <Button type="info" ghost size="large" @click="showDialog=false">关闭</Button>
      </dv-border-box-13>
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
      isLoading: true
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
      this.showDialog === true? (this.showDialog = false): (this.showDialog = true);
      await this.$http.post("/api/suggestion/all", null, res => {
        if (res.data.code === 200) {
          this.isLoading = false;
          this.info = res.data.data.suggestionVo1s;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
