<template>
  <div class="layout" id="app">
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

<style>
body{
  margin: 0;
  padding: 0;
}
.menu_style{
  color:#FFF;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100vh;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
.content{
  background: #FFF;
  height: 90vh;
  width: 100vw;
  margin-top: 70px;
}
</style>
