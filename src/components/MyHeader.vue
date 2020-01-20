<template>
  <div class="MyHeader">
    <header>
      <div class="layout">
        <!-- <div class="logo">大学了没</div> -->
				<div class="logo"><div>广西科技大学计通学院</div><div>实践能力服务平台</div></div>
        <ul>
          <li class="active">
            <a :href="url+'/portal/#/cloudHome'">首页</a>
          </li>
          <li>
            <a @click="link('train')">实训系统</a>
          </li>
          <li>
            <a :href='url+"/pan/html/publicarea.html"'>学习云</a>
          </li>
          <li>
            <a :href='url+"/evaluate/"'>评测系统</a>
          </li>
        </ul>
        <div class="loginTools">
          <router-link to="/login" v-if="isLogin==false"><div class="active">登录</div></router-link>
          <router-link to="/register" v-if="isLogin==false"><div>注册</div></router-link>
          <div id="my" v-if="isLogin==true">
              <img :src="userImg" class="face"/>
              <div class="userName">{{userName}}</div>
              <div class="userInfo">                 
                  <div class="check"><span class="blue">积分：888</span><router-link to="/verification"><span>身份认证</span></router-link></div>
                  <div class="practice"><a :href='url+"/archive-center/"'><span>个人中心</span></a><span>我的实训</span></div>
                  <div class="exit" @click="cancel">退 出</div>
              </div>
          </div>
        </div>
      </div>
    </header>
    <dialogBox :flag="'登录提示'" :dialogVisible="dialogVisible" @close="close" :datas='datas' @login="login"></dialogBox>
  </div>
</template>

<script>
  import dialogBox from '../views/components/dialogBox.vue'
export default {
  name: 'MyHeader',
  components: {
    dialogBox
  },
  data(){
    return{
			  url:this.$pictrueShowUrl,
        isLogin:'',
        userName:'',
        userImg:require('../assets/userface.jpg'),
        isAllow:false,
        train:'#',
        evaluate:'#',
        dialogVisible:false,
        datas:{
          Url:'/backLogin',
          title:'登录提示',
          msg:"请重新登录"
        }

    }
  },
  methods:{
    cancel(){
      const token=localStorage.getItem('token')
      let that=this;		
      this.$axios.post(this.$baseUrl+'/auth/logout?token='+token,{})
      .then(function(res){
        console.log(res)
        if (res.data.code==0) {
          localStorage.removeItem('token')
          location.reload()
        }
        else if(res.data.code==401||res.data.code==402){
            that.dialogVisible=true
            that.isLogin==false
            that.datas.msg='身份过期，请重新登录'
        }
      })
      .catch(function(err){
				localStorage.removeItem('token')
				that.isLogin = false;
        console.log(err)
      })

    },
    link(type){
      console.log(this.isAllow)
      if (this.isAllow==true&&type=='train') {
       window.location.assign(this.$pictrueShowUrl+'/train/')
      }
      /* if (this.isAllow==true&&type=='evaluate') {
        window.location.assign(this.$pictrueShowUrl+'/evaluate/')
        console.log(evaluate)
      } */
      if(this.isAllow==false){
        this.dialogVisible=true
        if (this.isLogin==true) {
          this.datas.msg='您不是学生，无权访问'
        }   
        else{
          this.datas.msg='你无权访问，请重新登录'
        }     
        
      }
    },
    login(type){
      this.dialogVisible=false
      if (type!='close') {
        this.$router.push({path:'login'})  
      }
        
    },
    close(){
      this.dialogVisible=false
    }
  },
  created:function(){
    const token=localStorage.getItem('token')
    if (token ==null) {
      this.isLogin=false
    }else{      
      let token1=token.split('.')[1]
      let userInfo=window.atob(token1)
			console.log(userInfo)
			if(new Date(JSON.parse(userInfo).exp*1000) < new Date()){
				this.isLogin=false
			}else{
				this.isLogin=true;
				let that=this;
				let id =userInfo.split(':"')[1].split('",')[0]
				this.$axios.get(this.$baseUrl+'/user/info?aids='+id,{})
				.then(function(res){
					console.log(res)
						if (res.data.data[0].nickname!=null) {
							that.userName=res.data.data[0].nickname;
							that.userImg = res.data.data[0].avatarUrl =='#'? require('../assets/userface.jpg'):res.data.data[0].avatarUrl;
						}
						else{
							that.userName='这里是随机的名字'
						} 
						that.$axios.get(that.$baseUrl+'/portal/role/currentRole?token='+token)
										.then(function(res){   
										console.log(res)  
											if(res.data.code == 0){
												for (var i = 0; i < res.data.data.length; i++) {
													if (/* res.data.data[i]=='老师'|| */res.data.data[i]=='学生') {
														that.isAllow=true
														break;
													}
													else{
														that.isAllow=false
													}                         
												}
											}
										})
										.catch(function(err){
											console.log(err)
										}) 
						
				})
				.catch(function(err){
					console.log(err)
				})
			}
      
    }
    
  }
}
</script>


<style scoped>
  header{
    height: 101px;
    border-bottom: 1px solid #dbdbdb 
  }
	.logo{
		float: left;
		font-size: 12px;
		font-weight: bolder;
		color: #00537b;
		background: url("../assets/logo.png") no-repeat 0 2px;
		background-size: 31% 92%;
		padding-left: 100px;
		height: 101px;
	}
	.logo div:nth-child(1){
		margin-top: 20px;
		font-size: 14px;
		letter-spacing:6px;
	}
	.logo div:nth-child(2){
		margin-top: 5px;
		font-size: 24px;
		
	}
  ul{
    float: left;
    margin-left: 240px;
  }
  ul li{
    float: left;
  }
  ul li a{
    color: #83d3f8;
    font-size: 18px;
    margin-right: 36px;
    height: 101px;
    line-height: 101px;
  }
  ul li a:hover{
    font-weight: bolder;
    color: var(--blue);
  }
  ul .active a{
    font-weight: bolder;
    color: var(--blue);
  }
  .loginTools{
    float: left;
    overflow: auto;
  }
  .loginTools a div{
    color: #83d3f8;
    font-size: 18px;
    padding: 0 40px 16px 40px;
    float: left;
    border-bottom: 2px solid #83d3f8;
    margin-top: 36px;
  }
  .loginTools .active,.loginTools a div:hover{
    font-weight: bolder;
    color: var(--blue);
    cursor: pointer;
    border-bottom: 2px solid var(--blue);
  }
  .MyHeader .layout{
    position: relative;
    overflow:visible;
  }
  #my{
    position: absolute;
    right: 85px;
    top: 20px;
    cursor: pointer;
    text-align: center;
    z-index: 99
  }
  #my .face{
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
  #my:hover{
    right: 0;
    background:#00aeff ;
    color: #fff
  }
  #my:hover .userInfo{
    display: block;
  }
  #my:hover .userName{
    display: block;
  }
  #my:hover .face{
    margin-top: 10px;
    width: 65px;
    height: 65px;
  }
  .userName{
    display: none;
    margin: 10px 0px
  }
  .userInfo{
    background: #fff;
    box-shadow: 2px 2px 2px #ededef;
    font-size: 14px;
    padding: 20px 0px 10px;
    width: 220px;
    display: none
  }
  .userInfo>div{
    padding:10px 20px 0 20px;
  }
  .userInfo .check{
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 10px;
  }
  .check a{
    display: inline-block;
    margin-left: 20px;
    background: #00aeff;
    color: #fff;
    padding: 4px 6px;
  }
  .userInfo .exit{
    background: #bdbdbd;
    padding-bottom: 10px;
    margin: 0px 10px
  }
  .userInfo .practice{
    padding: 0;
  }
  .userInfo .practice span{
    color: var(--blue);
    display: inline-block;
    width: 50%;
    box-sizing: border-box;
    padding: 10px 20px 10px 30px;
  }
  .userInfo .practice span:nth-child(1){
    text-align: left;
    background: url("../assets/personal.png") no-repeat 10px 10px;
  }
  .userInfo .practice span:nth-child(2){
    text-align: right;
    background: url("../assets/practice.png") no-repeat 10px 10px;
  }
</style>
