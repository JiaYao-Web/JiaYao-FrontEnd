<template>
  <div>
    <div class="Img_Box">
      <img src="../../assets/login/background.jpg" width="100%" height="100%"  alt="background"/>
    </div>
    <div style="vertical-align: middle">
      <el-card  class="Login_Card" style="border-radius: 12px">
        <div class="login-title">“佳肴”美食分享平台</div>
        <el-row justify="center" style="margin: 30px 0 10px 0">
          <el-col>
            <el-form ref="form" :model="form" label-width="40px" :hide-required-asterisk="true" size="medium">
              <el-form-item label="邮箱" class="blackItem" >
                <el-input v-model="form.email" placeholder="请输入邮箱" clearable autofocus style="width: 230px;"></el-input>
              </el-form-item>
              <el-form-item label="密码" class="blackItem">
                <el-input v-model="form.password" showPassword placeholder="请输入密码" clearable autofocus style="width: 230px;"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center" style="margin: 0 0 10px 0">
          <el-button class="buttonColor" @click="confirmLogin" size="medium" round style="width: 280px" type="primary">登录</el-button>
        </el-row>

        <el-row style="text-align: center;">
          <el-col>
            <router-link :to="'/register'">
              <el-link :underline="false" style="color: white">注册账号</el-link>
            </router-link>
          </el-col>
<!--          <el-col :span="12">-->
<!--            <router-link :to="'/forgetPassword'">-->
<!--              <el-link :underline="false" style="color: white">找回密码</el-link>-->
<!--            </router-link>-->
<!--          </el-col>-->
        </el-row>

      </el-card>
    </div>
  </div>
</template>

<script>
import {login} from '../../api/loginAPI'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    if (window.sessionStorage.getItem('MyAuthentication') !== null) this.$router.push('/index')
  },
  methods: {
    confirmLogin () {
      const param = {email: this.form.email, password: require('js-sha256').sha256(this.form.password)}
      login(param).then(res => {
        console.log(res)
        if (!res.data.status) this.$message.error(res.data.msg)
        else {
          sessionStorage.setItem('MyAuthentication', res.data.msg)
          this.$router.push('/index')
        }
      })
    }
  }
}
</script>

<style scoped>
.Img_Box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.buttonColor{
  background: #2e0f6d;
  border-color: #2e0f6d;
  color: #fff;

}

.Login_Card {
  height: fit-content;
  width: 30%;
  background: rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(3px);
  padding: 10px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.login-title{
  color: whitesmoke;
  text-align: center;
  font-size: 24px;
  margin-left: 30px;
}
</style>

<style>
.blackItem .el-form-item__label{
  color: white;
  size: 35px;
}
</style>
