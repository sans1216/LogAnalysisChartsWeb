<template>
  <section>
    <div class="box"  v-if="config!=null">
      <ul class="header">
        <li class="cell" v-for="i in config.header">{{i}}</li>
      </ul>
      <div class="body" v-if="config!=null">
        <ul class="list" >
          <li v-for="(item, index) in config.data" :key="index" class="row">
            <span class="cell" v-for="i in item">{{i }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    for (let i = 0; i < this.config.data.length; i++) {
          this.config.data = this.config.data.concat(
            this.config.data.slice(0, 5)
          );
        }

    console.log(this.config.data);
  },
  props: {
    config: Object
  }
};
</script>

<style lang="scss">
$cellHeight: 1.7rem;
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  color: white;
  height: 100%;
}
.box {
  width: 100%;
  margin: auto;
  height: 100%;
}
.header {
  display: flex;
  height: 1.8rem;
  background-color: rgb(0, 186, 255);
}
.body {
  height: 5 * $cellHeight;
  overflow: hidden;
  height: 95%;
  background-color: #0a2732;
  color: white;
  li {
    display: flex;
    height: $cellHeight;
  }
}

.cell {
  flex: 1;
  height: $cellHeight;
  line-height: $cellHeight;
  box-sizing: border-box;
  text-align: center;
}
.list {
  animation: scroll 10s linear infinite;
  position: relative;
  li :nth-child(odd) {
    overflow: hidden;
    background-color: #0a2732;
    color: white;
  }
  li :nth-child(even) {
    overflow: hidden;
    background-color: #003b51;
    color: white;
  }
}
@keyframes scroll {
  from {
    top: 0;
  }
  to {
    top: -6 * $cellHeight;
  }
}
</style>
