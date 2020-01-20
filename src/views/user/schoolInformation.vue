<template>
	<div id="main">	
		<div class="backLayout">
		    <breadcrumb :menu="menu"></breadcrumb>	
			<el-form label-position="right" label-width="150px"  :model="form">
				<el-form-item label="学校名称" >
					<el-input v-model="form.school" maxlength='50'></el-input>
					<!-- <span class="tips">{{form.school.length}}/50</span> -->
				</el-form-item>
				<el-form-item label="学院名称" >
					<el-input v-model="form.college" maxlength='50'></el-input>
					<!-- <span class="tips">{{form.college.length}}/50</span> -->
				</el-form-item>
				<el-form-item label="专业名称" >
					<el-input v-model="form.major" maxlength='50'></el-input>
					<!-- <span class="tips">{{form.major.length}}/50</span> -->
				</el-form-item>				
				<!-- <el-form-item>
					<el-button type="primary" @click="onSubmit">保存</el-button>
				</el-form-item> -->
			</el-form>
		</div>	
	</div>
	
</template>
<script>
  import breadcrumb from '../components/breadcrumb1'
	export default{
		name:'schoolInformation',
		components:{
			breadcrumb
		},
		data(){
			return{
			   menu:[{
			   	title:'学校基本信息',
			   }],
			   form: {
				  school: '',
				  college: '',
				  major:''			
				}
			  
			}
		},
		methods:{			
			onSubmit(){
				
			},
			getSchool(){
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$userUrl+'/school/getnowschoolinfo?token='+token)
				.then(function(res){
				  console.log(res);
					if(res.data.code == 0){
						let data = res.data.data;
						that.form.school = data.schoolname;
						that.form.college = data.collegename;
						that.form.major = data.professionalname;
					}
												
				})
				.catch(function(err){
				  console.log(err)
				})
			}
		 },		
		created:function(){            			
			this.getSchool();
		}
	}
</script>
<style scoped>
.el-input{
	width: 300px;
}
.el-textarea{
	width: 300px; 
}
.tips{
	margin-left: 10px;
}
.el-date-editor.el-input{
	width: 300px;
}
</style>
<style>
	
</style>