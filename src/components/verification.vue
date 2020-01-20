<template>
    <div class="verification">
        <div class="layout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/cloudHome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item class="blue">学生认证</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="blur">
                <div class="blurImg"></div>
                <div class="titleImg">
                    <span>学生认证</span>
                </div>
            </div>
        </div>
        <div class="content">
           <div class="layout">
               <div class="ver">
                   <div class="step">
                       <span class="round blue">1</span><span class="blue">填写认证信息</span><span class="right"> > </span><span class="round" :class="{blue:step==2}">2</span><span :class="{blue:step==2}">认证结果</span>
                   </div>
                   <div v-if="step==1">
                       <div class="item">
                           <span><p>*</p>真实姓名</span><span><el-input v-model="username" placeholder="请输入真实姓名"/></span>
                       </div>
                       <div class="item">
                           <span><p>*</p>学号</span><span><el-input v-model="number" placeholder="请输入学号"/></span>
                       </div>
                       <div class="item">
                           <span><p>*</p>身份证</span><span><el-input v-model="id" placeholder="请输入二代身份证"/></span>
                       </div>
											 <!-- <div class="item" style="text-align: center">
											 		<el-checkbox v-model="checked">我已同意《大学了没官方认证服务协议》</el-checkbox>
											 </div> -->
                       <div class="item">
                           <el-button type="primary" @click="add()">提交申请</el-button>
                       </div>
                       
                   </div>
                   <div class="mss" v-if="step==2">
                       <div class="title">认证信息</div>
                       <div>真实姓名：{{name}}</div>
                       <div>学号：{{userNumber}}</div>
                       <div>身份证号：{{idcard}}</div>
                       <div>学校：{{school}}</div>
                       <div>学院：{{college}}</div>
                       <div>专业：{{major}}</div>
											 <div>年级：{{grade}}</div>
                       <div>班级：{{className}}</div>
                       <div>宿舍号：{{dormitory}}</div>
                       <div class="title">认证结果</div>
                       <div>状态：已认证</div>
                       <div>认证时间：{{time}}</div>
                   </div>
               </div>
           </div>
        </div>
				<el-dialog
						title="温馨提示"
						:visible.sync="dialogVisible"
						width="30%"
						:show-close='false'
						:close-on-click-modal='false'>
						<div style="height: 50px;">认证成功，请<span style="color:#ff9800;">重新登录激活</span>学生身份</div>
						<div style="position: absolute;bottom:10px;right:20px;">
								<el-button type="primary" @click='go'>去登陆  ( {{countTime}} s )</el-button>						
						</div>
					</el-dialog>
    </div>
		
</template>

<script>
    export default {
        name: "verification",
        data(){
            return{
                username:'',
                id:'',
                number:'',
                step:1,
								name:'',
								userNumber:'',
								idcard:'',
								school:'',
								college:'',
								major:'',
								grade:'',
								className:'',
								dormitory:'',
								time:'',
								countTime:10,
								dialogVisible:false,
								clock:'',
            }
        },
        methods:{
					  isStudent(){
							 let that = this;
							 const token = localStorage.getItem('token');
							 console.log(token);
							 this.$axios.get(this.$baseUrl+'/archives/archives/students/getauthinfo/?token='+token)
							 .then(function(res){
							 		console.log(res)
									if(res.data.code == 0){
										 that.step= 2;
										 let data1 = res.data.data.data;
										 let data2 = res.data.data.student;
										 let reg = /^(\d{6})\d+(\d{4})$/;
										 that.name = data2.name;
										 that.userNumber =data2.sid;
										 that.idcard =data2.idcard.replace(reg, "$1 ****** $2");;
										 that.school =data1.schoolname;
										 that.college =data1.collegename;
										 that.major =data1.professionalname;
										 that.grade =data2.grade;
										 that.className =data2.classname;
										 that.dormitory =data2.dormitory;
										 that.time = that.changeDate(new Date(data2.certificationTime));
									}else{
										 that.step= 1;
									}
							 		
							 })
							 .catch(function(err){
							 		console.log(err)
							 })
						},
						go(){
							window.clearInterval(this.clock);
							this.$router.push({path:'/login'});
						},
            add(){
							   
								if(this.username == '' || this.number == '' ||this.id == ''){
									this.$message({
										message: '请填写完整内容',
										type: 'warning'
									});
								}else{								  
									 let that = this;
									 const token = localStorage.getItem('token');
									 console.log(token);
									 this.$axios.post(this.$baseUrl+'/archives/archives/students/authentication/?sid='+this.number+'&idcard='+this.id+'&name='+this.username+'&token='+token)
									 .then(function(res){
									 	 console.log(res)
									 	 if(res.data.code == 0){
											 that.dialogVisible = true;
											 	that.clock = window.setInterval(() => {
											 	that.countTime--;
											 	if (that.countTime < 0) {
											 		that.go();
											 	}
											 }, 1000)
											 
										 }else if(res.data.code == -4){
											 that.$message.error('该学生已被认证');
										 }else{
											 that.$message.error('认证不成功，请确认个人信息无误；或联系老师导入个人信息');
										 }
									 	
									 })
									 .catch(function(err){
									 	console.log(err)
									 })
								}
            }
        },
				created:function(){
					this.isStudent();
				}
    }
</script>

<style scoped>
    .titleImg{
        height: 280px;
        text-align: center;
        position: absolute;
        left: 0;top: 0;right: 0;
    }
    .blur{
        position: relative;
    }
    .blurImg{
        background: url('../assets/123.jpg')  no-repeat;
        height: 280px;
        background-size: 100% 100%;
        text-align: center;
        -webkit-filter: blur(1px);
        -moz-filter: blur(1px);
        -ms-filter: blur(1px);
        -o-filter: blur(1px);
        filter: blur(1px);
    }
    .titleImg>span{
        font-size: 35px;
        font-weight: bolder;
        color: var(--blue);
        display: block;
        padding: 110px 0 10px 0;
        text-shadow: 0.1em 0.1em 0.04em grey;
        letter-spacing:15px;
    }
    .content{
        background: #f6fafe;
        padding: 20px 0;
        margin-top: 20px;
    }
    .content .layout{
        width: 1172px;
        background: #fff;
        -webkit-box-shadow: 2px 2px 2px #ddd;
        box-shadow: 2px 2px 2px #ddd;
    }
    .ver{
        width: 400px;
        margin: auto;
        padding: 40px 0;
    }
    .ver .round{
        display: inline-block;
        width: 50px;
        text-align: center;
        height: 50px;
        border-radius: 50px;
        line-height: 50px;
        margin-right: 20px;
        border: 1px solid #bdbdbd;
    }
    .ver .round.blue{
        background: var(--blue);
        color: #fff;
        border: 1px solid var(--blue);
    }
    .ver .right{
        display: inline-block;
        font-size: 20px;
        padding: 0 40px;
        color: var(--blue);
        font-weight: bolder;
    }
    .step{
        padding-bottom: 30px;
    }
    .item{
        overflow: auto;
        padding: 15px 0;
    }
    .item p{
        display: inline-block;
        color: red;
        margin: 8px 5px 0 0;
    }
    .item span{
        display: inline-block;
        float: left;
    }
    .item span:nth-child(1){
        width: 100px;

    }
    .item .el-button{
        width: 100%;
    }
    .item span:nth-child(2){
        width: 300px;
    }
    .mss>div{
        padding: 15px 0;
    }
    .mss .title{
        color: var(--blue);
        font-size: 18px;
    }
</style>
<style>
    .item .el-checkbox__label{
        color: var(--blue);
    }
</style>