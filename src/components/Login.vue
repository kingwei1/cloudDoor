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
      <div class="important" id="important">
        <div class="title">大学你认真了没？</div>
        <div>新概念培养大学生个人能力</div>
        <div>你想变得更强吗？</div>
        <div>请从这里开始吧！</div>
      </div>
      <div class="loginForm" id="loginForm">
        <el-tabs v-model="activeName" :stretch='true'>
          <el-tab-pane label="密码登录" name="first" class="input">
            <div>
              <el-input v-model="username" placeholder="请输入账号/手机号"></el-input>
            </div>
            <div>
              <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
            </div>
            <div>
              <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
            </div>
            <div>
              <el-button type="primary" @click="login">登 录</el-button>
            </div>
						<div class="other">
							<router-link to="/forgot">忘记密码</router-link>
							<router-link to="/register">免费注册</router-link>
						</div>
          </el-tab-pane>
          <el-tab-pane label="短信登录" name="second" class="input">
            <div class="code">
              <el-input v-model="phoneNumber" placeholder="请输入手机号"></el-input><a @click="getCode()" :style="{cursor:cursor}">{{btnMessage}}</a>
            </div>
            <div>
              <el-input v-model="code" placeholder="请输入验证码"></el-input>
            </div>
            <div>
              <el-button type="primary" @click="login">登 录</el-button>
            </div>
						<div class="other">
							<router-link to="/register">免费注册</router-link>
						</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  <MyFooter></MyFooter>
</div>
</template>

<script >
	import MyFooter from './MyFooter'
export default {
  name: "login",
   components: {
    MyFooter
  },
  mounted() {
    document.getElementById("bg").style.height = document.documentElement.clientHeight - 201 + 'px';
    document.getElementById("important").style.marginTop = (document.documentElement.clientHeight - 201 - 176) / 2 + 'px';
    document.getElementById("loginForm").style.top = (document.documentElement.clientHeight - 201 - 285) / 2 + 'px';
  },
  data() {
    return {
      activeName: 'first',
      username: '',
      password: '',
			phoneNumber:'',
			code:'',
      checked: false,
			flag:true,
      btnMessage: '获取验证码',
      totalTime: 60,
      canClick: true,
      cursor: 'pointer',
    }
  },
  methods: {
		keyupSubmit(){
			document.onkeydown = e=>{
				let key = window.event.keyCode;
				if(key === 13){
					this.login();
				}
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
    getCode() {
      let that = this;
      if (this.canClick) {
        this.$axios.get(this.$baseUrl + '/auth/getCode?phone=' + this.phoneNumber)
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
    },
    login() {
      let that = this;
      let data = {};
			if(this.flag){
      if (this.activeName == 'first') {
				if (!this.username || !this.password) {
					this.$message.error('用户名或密码不能为空');
					return;
				}
        data = {
          "accountNumber": this.username,
          "password": this.password
        };
        this.$axios.post(this.$baseUrl+'/auth/login', this.$qs.stringify(data))
          .then(function(res) {
            console.log(res)
            if (res.data.code == 0) {
							that.flag = false;
              const token = window.localStorage.setItem('token', res.data.data)
              that.$router.push({
                path: '/home'
              })
            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err)
          })
      } else {
				if (!this.phoneNumber || !this.code) {
					that.$message.error('手机号或验证码不能为空');
					return;
				}
				// 校验验证码，验证码只能为正数
				const reg = /^[0-9]*$/;
				if (!reg.test(this.code)) {
					that.$message.error('验证码有误');
					return;
				}
        data = {
          "phone": this.phoneNumber,
          "code": this.code
        };
        this.$axios.post(this.$baseUrl+'/auth/loginByCode', this.$qs.stringify(data))
          .then(function(res) {
            console.log(res)
            if (res.data.code == 0) {
							that.flag = false;
              const token = window.localStorage.setItem('token', res.data.data)
              that.$router.push({
                path: '/home'
              })
            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err)
          })
      }
     }
    }
  },
	created:function(){
		localStorage.removeItem('token');
		this.keyupSubmit();
	}
}
</script>
<style scoped>
#bg {
  background: url("../assets/bg.jpg");
  background-size: 100% 100%;
}

#bg .layout {
  position: relative;
  height: 100%;
}

.important {
  color: #fff;
  font-size: 20px;
  line-height: 44px;
}

.important .title {
  font-size: 30px;
  font-weight: bolder;
}

.loginForm {
  width: 360px;
  position: absolute;
  right: 0;
  background: #fff;
  padding: 20px 20px 10px 20px;
}

.input>div {
  padding-bottom: 15px;
}

.input .el-button {
  width: 100%;
}

.other a {
  color: var(--blue);
  display: inline-block;
  margin-left: 20px;
  margin-right: 2px;
}
.other{
	text-align:-moz-right;
	text-align:-webkit-right;
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

header {
  height: 101px;
  background: #fff;
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
