<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
.menu_style {
  color: #fff;
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
.content {
  background: #fff;
  height: 90vh;
  width: 100vw;
  margin-top: 70px;
}
</style>
