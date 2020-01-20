<template>
	<div id="main">
		<div class="backLayout">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>企业认证</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="title"><h2>大学了没--企业认证体系</h2></div>
			<div class="box">
					<div class="icon"><h4>ICON</h4></div>
					<div class="title"><span>实训能力训练资格认证</span></div>
					<div class="btn" ><router-link v-if="status1=='uncertified'" :to="{path:'/signAuthentication',query:{type:'Practical_Training'}}">立即认证></router-link><router-link :to="{path:'/viewAuthenticationDetail',query:{type:'Practical_Training'}}"><el-button type="primary" v-if="status1=='certified'" >查看详情</el-button></router-link></div>
			</div>
			<div class="box">
				    <div class="icon"><h4>ICON</h4></div>
					<div class="title"><span>校企项目资格认证</span></div>
					<div class="btn" ><router-link v-if="status2=='uncertified'" :to="{path:'/signAuthentication',query:{type:'School_Enterprise'}}">立即认证></router-link><router-link :to="{path:'/viewAuthenticationDetail',query:{type:'School_Enterprise'}}"><el-button type="primary" v-if="status2=='certified'" >查看详情</el-button></router-link></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:"Authentication",
		data(){
			return{
                status1:'',
                status2:'',
			}
		},
		methods:{			
			getCompany(){
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$userUrl+'/company/info?token='+token)
				.then(function(res){
				   console.log(res);
					 if(res.data.code == 0){
						 let data = res.data.data;
						 console.log(data.length)
						 if(data.length == 1){
							   if(data[0].authtype =="Practical_Training"){
									 that.status1 = 'certified'
									 that.status2 = 'uncertified'
								 }else{
									 that.status1 = 'uncertified'
									 that.status2 = 'certified'
								 }
						 }else if(data.length == 2){
							  that.status1 = 'certified'
							  that.status2 = 'certified'  
						 }else if(data.length == 0){
							  that.status1 = 'uncertified'
							  that.status2 = 'uncertified'  
						 }
					 }
												
				})
				.catch(function(err){
				  console.log(err)
				})
			}
		},		
		created:function(){            			
			this.getCompany();
		}
	}
</script>
<style scoped>
	.title{
		text-align: center;
		background: #e5e5e5;
		line-height: 100px;
	}
	.box{
		height: 500px;
		width: 400px;
		border:1px solid #e5e5e5;
		float: left;
		margin-left: 100px;
		border-radius: 20px
	}
	.box .icon{
		text-align: center;
		line-height: 50px;
		width: 100px;
		border:1px solid #e5e5e5; 
		margin: 100px auto 0px;
	}
	.box .title{
		background: #fff;
		font-size: 16px
	}
    .box .btn{
    	text-align: center;
        background: #fff;
        float: none;
    }
</style>