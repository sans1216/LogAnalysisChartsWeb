<template>
  <div class="container" :style="loginContainerStyle">
    <pointwave :color="0x097bdb" />
      <div class="title-container">
        <h3 class="title"></h3>
      </div>
  </div>
</template>

<script>
import Pointwave from "@/components/Pointwave";
import backgroundImg from "../assets/images/bg1.png";

export default {
  name: "Spacewaves",
  components: {
    Pointwave
  },
  data() {
    return {
      loading: false,
      redirect: undefined
    };
  },
  computed: {
    loginContainerStyle() {
      return {
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "50%"
      };
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
$bg: #15255b;
$dark_gray: #889aa4;
$light_gray: #eee;

.container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;



  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}

#indexLizi {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
.menu-l{
  display: none;
}
</style>
