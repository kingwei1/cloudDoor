<template>
    <div id="login">
        <header>
            <div class="layout">
                <div class="logo">
                	<div>广西科技大学计通学院</div>
                	<div>实践能力服务平台</div>
                </div>
                <ul><li class="active"><router-link to="/home">首页</router-link></li></ul>
            </div>
        </header>
        <div id="bg">
            <div class="layout">
                <div class="loginForm" id="loginForm">
                    <div class="input">
                        <div>找回密码</div>
                        <div v-if="step==1"><el-input v-model="username" placeholder="请输入手机号"></el-input></div>
                        <div v-if="step==1" class="other"><router-link to="/login">去登陆</router-link></div>
                        <div v-if="step==2" class="send">短信验证码已发送至{{username}}</div>
                        <div v-if="step==2" class="reSend"><el-input v-model="code" placeholder="请输入验证码"></el-input><a @click="getCode()" :style="{cursor:cursor}">{{btnMessage}}</a></div>
                        <div v-if="step==2"><el-input v-model="password" placeholder="请输入6~16位密码,区分大小写" type="password"></el-input></div>
                        <div v-if="step==2" class="other"><a @click="back()">返回修改手机号</a></div>
                        <div v-if="step==1"><el-button type="primary" @click="next()">下一步</el-button></div>
                        <div v-if="step==2"><el-button type="primary" @click="submit()">提交</el-button></div>
                    </div>
                </div>
            </div>
        </div>
				<MyFooter></MyFooter>
        <dialogBox :flag="'提醒'" :dialogVisible="dialogVisible" @close="close()"></dialogBox>
    </div>
</template>

<script >
    import dialogBox from '../views/components/dialogBox'
		import MyFooter from './MyFooter'
    export default{
        name: "forgot",
        components: {
            dialogBox,
						MyFooter
        },
        mounted(){
            document.getElementById("bg").style.height=document.documentElement.clientHeight-201+'px';
            document.getElementById("loginForm").style.top=(document.documentElement.clientHeight-201-267)/2+'px';
        },
        data(){
            return{
                username:'',
                code:'',
                password:'',
                step:1,
                dialogVisible:false,
                btnMessage:'重新发送',
                totalTime:60,
                canClick:true,
                cursor:'pointer',
            }
        },
        methods:{
            getCode(){
                let that = this;                    
                this.$axios.get(this.$baseUrl+'/auth/getModifyCode?phone='+this.username)
                .then(function(res){
                    console.log(res)
                    if(res.data.code == 0){
                        that.step = 2;
                        that.setTimeChange();
                    }
                    else{
                        that.$message.error(res.data.msg)
                    }                        
                })
                .catch(function(err){
                    console.log(err)
                })
            },
            next(){
                if(this.username == ''){
                    this.$message.error('请输入手机号')
                }
                else{
                    this.getCode();
                }               
            },
            back(){
                this.step=1;
            },
            close(){
                this.dialogVisible = false;
                this.$router.push({path:'/login'})
            },
            submit(){
                let that = this;
                let data = {
                        "phone": this.username,
                        "code": this.code,
                        "pwd": this.password
                    };                    
                this.$axios.post(this.$baseUrl+'/auth/modifyPwdByCode',this.$qs.stringify(data))
                .then(function(res){
                    console.log(res)
                    if(res.data.code == 0){
                        that.dialogVisible = true;
                    }
                    else{
                        that.$message.error(res.data.msg);
                    }                      
                })
                .catch(function(err){
                    console.log(err)
                })
                
            },
            setTimeChange(){
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
               },1000)
            },
        }
    }
</script>
<style scoped>
    #bg{
        background: url("../assets/bg.jpg");
        background-size: 100% 100%;
    }
    #bg .layout{
        position: relative;
        height: 100%;
    }
    .loginForm{
        width: 360px;
        position: absolute;
        left: 50%;
        margin-left: -200px;
        background: #fff;
        padding: 20px 20px 10px 20px;
    }
    .input>div{
        padding-bottom: 15px;
    }
    .input .el-button{
        width: 100%;
    }
    .code,.reSend{
        position: relative;
    }
    .reSend a{
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 12px;
        color: var(--blue);
    }
    .code img{
        position: absolute;
        right: 10px;
        top: 5px;
        width: 60px;
        height: 28px;
    }
    .other a{
        color: var(--blue);
        display: inline-block;
        margin-right: 20px;
        margin-left: 2px;
    }
    .send{
        font-size: 12px;
        color: var(--blue);
    }
    header{
        height: 101px;
        background: #fff;
    }
    /* .logo{
        float: left;
        font-size: 30px;
        font-weight: bolder;
        color: var(--blue);
        background: url("../assets/cloud.png") no-repeat 0 20px;
        padding-left: 68px;
        height: 101px;
        line-height: 101px;
    } */
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
    ul{
        float: left;
        margin-left: 750px;
    }
    ul li{
        float: left;
    }
    ul li a{
        color: var(--blue);
        font-size: 18px;
        margin-right: 36px;
        height: 101px;
        line-height: 101px;
        font-weight: bolder;
    }
    footer{
        font-size: 12px;
        padding: 0 15px 28px 15px;
        background-color: #fff;
        text-align: center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }
    footer a{
        display: inline-block;
        padding: 18px 6px;
    }
    footer .contact a{
        padding: 0 6px;
    }
</style>
<style>
    .read .el-checkbox__label{
        font-size: 12px;
        color: var(--blue);
    }
</style>