<template>
  <div class="menu">
    <!-- <Menu theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1" to="/">
            <Icon type="ios-navigate"></Icon>
            <span>整体预览</span>
          </MenuItem>
          <MenuItem name="1-2" to="/timetrend">
            <Icon type="search"></Icon>
            <span>时序分布</span>
          </MenuItem>
          <MenuItem name="1-3" to="/assets">
            <Icon type="settings"></Icon>
            <span>风险资产</span>
          </MenuItem>
          <MenuItem name="1-4" to="/victims">
            <Icon type="settings"></Icon>
            <span>受害者</span>
          </MenuItem>
          <MenuItem name="1-5" to="/attackers">
            <Icon type="settings"></Icon>
            <span>攻击者</span>
          </MenuItem>
          <MenuItem name="1-6" to="/topn">
            <Icon type="settings"></Icon>
            <span>TOPN</span>
          </MenuItem>
    </Menu>-->
    <div class="dropdown">
      <span>Mouse over me</span>
      <div class="dropdown-content">
        <p>Hello World!</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #0e176b;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.menu {
  width: 6rem;
  float: left;
  height: 100%;
}
</style>
