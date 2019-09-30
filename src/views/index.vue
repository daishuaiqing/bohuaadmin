<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%', padding:'0 10px' }">
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="route">
          <!-- <div class="layout-logo"></div> -->
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-keypad"></Icon>房型管理
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-analytics"></Icon>咨询管理
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content class="content">
        <router-view />
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  methods: {
    route(name) {
      if (name === "1") {
        this.$router.push({ name: "edition" });
      } else {
        this.$router.push({ name: "leasinger" });
      }
    }
  }
};
</script>

<style>
</style>