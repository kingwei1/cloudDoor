<template>
<div id="main">
  <header>
    <div class="logo">大学了没后端管理系统 |</div>
  </header>
  <div class="body">
    <div class="loginForm">
      <el-tabs v-model="activeName" :stretch='true' @tab-click="handleClick">
        <el-tab-pane label="密码登录" name="first">
          <el-row>
            <el-col :span="24">
              <el-input v-model="account" placeholder='请输入账号/手机号'></el-input>
            </el-col>
            <el-col :span="24">
              <el-input type="password" v-model="passward" placeholder='请输入密码'></el-input>
            </el-col>
            <el-col :span="12" class="mb15px">
              <el-radio v-model="radio" label="1">7天自动登录</el-radio>
            </el-col>
            <el-col :span="12" class="mb15px text-right">
              <router-link to="/forgot" style="color: var(--blue);">忘记密码</router-link>
            </el-col>
            <el-col :span="24">
              <el-button type='primary' @click="login">登 录</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="短信登录" name="second">
          <div class="code" style="position: relative;">
            <el-input v-model="account" placeholder="请输入手机号"></el-input>
            <a class="getCodeStyle" @click="getCode()" :style="{cursor:cursor}">{{btnMessage}}</a>
          </div>
          <div id="codeWraper">
            <el-input v-model="passward" placeholder="请输入验证码"></el-input>
          </div>
          <el-row>
            <el-col :span="24" class="mb15px">
              <router-link to="/forgot" class="mr20px">忘记密码</router-link>
              <router-link to="/register">免费注册</router-link>
            </el-col>
          </el-row>
          <div>
            <el-button type="primary" @click="loginByCode">登 录</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <footer>copyright © 2019 benyuntech.com BY云计算服务平台</footer>
</div>
</template>
<script>
export default {
  name: 'backLogin',
  data() {
    return {
      activeName: 'first',
      account: '',
      passward: '',
      radio: '',
      canClick: true,
      totalTime: 60,
      btnMessage: '获取验证码',
      cursor: 'pointer',
    }
  },
  methods: {
    login() {
      if (!this.account || !this.passward) {
        this.$message.error('用户名或密码不能为空');
        return;
      }
      let that = this;
      let data = {
        "accountNumber": this.account,
        "password": this.passward
      }
      this.$axios.post(this.$baseUrl+'/auth/login', this.$qs.stringify(data))
        .then(function(res) {
          if (res.data.code == 0) {
            const token = localStorage.setItem('token', res.data.data)
            that.$router.push({
              path: '/homeManage'
            })
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    // 获取验证码
    getCode() {
      let that = this;
      if (this.canClick) {
        this.$axios.get(this.$baseUrl + '/auth/getCode?phone=' + this.account)
          .then(function(res) {
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
    },
    setTimeChange() {
      if (!this.canClick) return;
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
    handleClick(tab, event) {
    },

    // 验证码登录
    loginByCode() {
      if (!this.account || !this.passward) {
        this.$message.error('用户名或验证码不能为空');
        return;
      }
      const that = this;
      // 校验验证码，验证码只能为正数
      const reg = /^[0-9]*$/;
      if (!reg.test(this.passward)) {
        that.$message.error('验证码错误或已失效');
        return;
      }
      const data = {
        "phone": this.account,
        "code": this.passward
      };
      this.$axios.post(this.$baseUrl+'/auth/loginByCode', this.$qs.stringify(data))
        .then(function(res) {
          if (res.data.code == 0) {
            const token = window.localStorage.setItem('token', res.data.data)
            that.$router.push({
              path: '/backNav'
            })
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    }
  },
  created: function() {
		/*const that = this;
		document.addEventListener('keyup', (e) => {
			if (e.keyCode == 13) {
				that.login();
			}
		})*/
	}
}
</script>
<style scoped>
.text-right {
  text-align: right;
}

.loginForm {
  width: 320px;
  background: #fff;
  margin: auto;
  padding: 20px 20px 10px 20px;
  overflow: auto;
}

.getCodeStyle {
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -20px;
  color: var(--blue);
}

.other {
  margin-bottom: 15px;
}

.mr20px {
  margin-right: 20px;
}

.mb15px {
  margin-bottom: 15px;
}

header {
  background: #2b303b;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  padding: 15px;
  overflow: auto;
}

.logo {
  width: 290px;
  float: left;
  font-size: 20px;
  color: #fff;
  text-align: right;
  line-height: 60px;
  background: url("../assets/cloud.png") no-repeat 20px;
}

.body {
  background: #e5e5e5;
  height: 100%;
  padding: 255px 0px
}

footer {
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 55px;
  line-height: 55px;
  padding: 0 15px;
  background-color: #666666;
  z-index: 999;
}

.el-input {
  margin-bottom: 15px;
  position: relative;
}

.el-button {
  width: 100%;
  margin-bottom: 5px
}
</style>
