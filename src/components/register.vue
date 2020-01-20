<template>
<div id="login">
  <header>
    <div class="layout">
      <div class="logo">
        <div>广西科技大学计通学院</div>
        <div>实践能力服务平台</div>
      </div>
      <ul>
        <li class="active">
          <router-link to="/home">首页</router-link>
        </li>
      </ul>
    </div>
  </header>
  <div id="bg">
    <div class="layout">
      <div class="loginForm" id="loginForm">
        <div class="input">
          <div class="go">欢迎注册大学了没<router-link to="/login">有账号,去登陆</router-link>
          </div>
          <div class="code">
            <el-input v-model="username" placeholder="请输入手机号"></el-input>
            <a @click="getCode()" :style="{cursor:cursor}">{{btnMessage}}</a>
          </div>
          <div>
            <el-input v-model="code" placeholder="请输入验证码"></el-input>
          </div>
          <div>
            <el-input v-model="nickName" placeholder="请输入昵称"></el-input>
          </div>
          <div>
            <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
          </div>
          <div>
            <el-input v-model="repassword" placeholder="请重复输入密码" type="password" @blur='validate'></el-input>
            <span v-if="textShow==true" style="font-size: 10px;color: red">{{validateText}}</span>
          </div>
          <div class="read">
            <el-checkbox v-model="checked">
              <router-link to="/serviceAgreement" target="_blank">《大学了没网站服务条款》|</router-link>
              <router-link to="/Agreement" target="_blank">《注册协议》</router-link>
            </el-checkbox>
          </div>
          <div>
            <el-button type="primary" @click="register">同意条款并注册</el-button>
          </div>
        </div>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</div>
</template>

<script >
import MyFooter from './MyFooter'
export default {
  name: "register",
  components: {
    MyFooter
  },
  mounted() {
    document.getElementById("bg").style.height = document.documentElement.clientHeight - 201 + 'px';
	console.log(document.getElementById("bg").style.height.split('px')[0])
    document.getElementById("loginForm").style.top = (document.documentElement.clientHeight - 201 - 378) / 2 + 'px';
  },
  data() {
    return {
      username: '',
      password: '',
      code: '',
      nickName: '',
      repassword: '',
      checked: false,
      validateText: '密码不一致！请重试',
      textShow: false,
      btnMessage: '获取验证码',
      totalTime: 60,
      canClick: true,
      cursor: 'pointer',
    }
  },
  methods: {
    register() {
      let that = this;
      let formDate = {
        "phoneNo": this.username,
        "password": this.password,
        "nickname": this.nickName
      }
      if (this.password != this.repassword) {
        this.$message.error('输入的两次密码不一致！')
      } else if (this.code == '') {
        this.$message.error('请输入验证码')
      } else if (this.nickName == '') {
        this.$message.error('请输入昵称')
      } else if (!this.checked) {
        this.$message.error('请勾选阅读服务条款')
      } else {
        this.$axios.post(this.$baseUrl + '/auth/register/' + this.code, this.$qs.stringify(formDate))
          .then(function(res) {
            console.log(res)
            if (res.data.code == 0) {
              that.$message({
                type: 'success',
                message: '注册成功！'
              })
              that.$router.push({
                path: '/login'
              })
            } else {
              that.$message.error(res.data.msg)
            }
          })
          .catch(function(err) {
            console.log(err)
          })
      }
    },
    setTimeChange() {
      if (!this.canClick) return
      this.canClick = false
      this.cursor = 'wait',
        this.btnMessage = this.totalTime + 's后重新发送';
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.btnMessage = this.totalTime + 's后重新发送';
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.btnMessage = '重新发送验证码';
          this.totalTime = 60;
          this.canClick = true;
          this.cursor = 'pointer';
        }
      }, 1000)
    },
    validate(e) {
      if (this.password != e.target.value) {
        this.textShow = true
      } else {
        this.textShow = false
      }
      console.log(e.target.value)
    },
    getCode() {
      let that = this;
      if (this.canClick) {
        console.log(1)
        this.$axios.get(this.$baseUrl + '/auth/getRegisterCode?phone=' + this.username)
          .then(function(res) {
            console.log(res)
            if (res.data.code == 0) {
              that.setTimeChange();
            } else {
              that.$message.error(res.data.msg)
            }
          })
          .catch(function(err) {
            console.log(err)
          })
      }
    }
  }
}
</script>
<style scoped>
#bg {
  background: url("../assets/bg.jpg");
  background-size: 100% 100%;
  min-height: 500px;
}

#bg .layout {
  position: relative;
  height: 100%;
}

.loginForm {
  width: 360px;
  position: absolute;
  left: 50%;
  margin-left: -200px;
  background: #fff;
  padding: 20px 20px 10px 20px;
}

.input>div {
  padding-bottom: 15px;
}

.input .el-button {
  width: 100%;
}

.go a {
  color: var(--blue);
  float: right;
}

.code {
  position: relative;
}

.code a {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 12px;
  color: var(--blue);
}

.validateText span {
  color: red;
  font-size: 10px;
}

header {
  height: 101px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
}

.logo {
  float: left;
  font-size: 12px;
  font-weight: bolder;
  color: #00537b;
  background: url("../assets/logo.png") no-repeat 0 2px;
  background-size: 31% 92%;
  padding-left: 100px;
  height: 101px;
}

.logo div:nth-child(1) {
  margin-top: 20px;
  font-size: 14px;
  letter-spacing: 6px;
}

.logo div:nth-child(2) {
  margin-top: 5px;
  font-size: 24px;

}

ul {
  float: left;
  margin-left: 750px;
}

ul li {
  float: left;
}

ul li a {
  color: var(--blue);
  font-size: 18px;
  margin-right: 36px;
  height: 101px;
  line-height: 101px;
  font-weight: bolder;
}

footer {
  font-size: 12px;
  padding: 0 15px 28px 15px;
  background-color: #fff;
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

footer a {
  display: inline-block;
  padding: 18px 6px;
  color: #000000;
}

footer a:hover {
  font-weight: 900;
}

footer .contact a {
  padding: 0 6px;
}
</style>
<style>
.read .el-checkbox__label {
  font-size: 12px;
  color: var(--blue);
}
</style>
