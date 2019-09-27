<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-keypad"></Icon>
              <router-link to="/edition" class="menu_style">房型管理</router-link>
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-analytics"></Icon>
              <router-link to="/leasinger" class="menu_style">咨询管理</router-link>
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
export default {};
</script>

<style>
</style>