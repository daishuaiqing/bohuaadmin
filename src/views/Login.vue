<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    45deg,
    rgba(254, 172, 94, 0.5),
    rgba(199, 121, 208, 0.5),
    rgba(75, 192, 200, 0.5)
  );
  overflow: hidden;
}
.login_box {
  width: 300px;
  margin: 250px auto;
}
.username {
  width: 300px;
  height: 35px;
  background: #fff;
  margin-bottom: 20px;
  margin-top: 10px;
  border-radius: 5px;
}
.password {
  width: 300px;
  height: 35px;
  background: #fff;
  border-radius: 5px;
}
.submit{
background: rgb(199, 121, 208);
height: 40px;
width: 200px;
font-size: 22px;
text-align: center;
color: #fff;
margin: 20px auto;
line-height: 40px;
border-radius: 20px;
}
</style>
<template>
  <div class="login">
    <div class="login_box">
        <div class="title">用户登录</div>
      <div class="username"></div>
      <div class="password"></div>
      <div class="submit">登录</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
