<template>
	<div id="main">	
		<div class="backLayout">
		    <breadcrumb :menu="menu"></breadcrumb>	
			<el-form label-position="right" label-width="150px"  :model="form">
				<el-form-item label="企业名称" >
					<el-input v-model="form.name" maxlength='50'></el-input>
					<span class="tips">{{form.name.length}}/50</span>
				</el-form-item>
				<el-form-item label="企业Logo">
					<el-upload
							action="string"
							list-type="picture-card"
							:limit= 1
							accept=".png,.jpg"
							:file-list="fileListShow"
							:on-change="handleChange"
							:on-remove="handleRemove"
							:auto-upload='false'
							style='width: 310px;float: left;text-align: left;'
							>
							<i class="el-icon-plus"></i>						
					</el-upload>
					<span style="position: absolute;top: 100px;">图片大小上限5M，支持JPG/PNG格式</span>
				</el-form-item>				
				<el-form-item label="企业简介">
					<el-input type="textarea" :rows="6" resize="none" v-model="form.information" maxlength='200'></el-input>
					<span class="tips">{{form.information.length}}/200</span>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">保存</el-button>
				</el-form-item>
			</el-form>
		</div>	
	</div>
	
</template>
<script>
  import breadcrumb from '../components/breadcrumb1'
	export default{
		name:'companyInformation',
		components:{
			breadcrumb
		},
		data(){
			return{
			   menu:[{
			   	title:'企业基本信息',
			   }],
				 logo:'',
				 showLogo:'',
				 oldName:'',
			   form: {
				  name: '',
				  information: '',			  
				},
				fileListShow:[],
				msg:'',
			  
			}
		},
		methods:{			
			onSubmit(){			
				console.log(this.form.name)
				console.log(this.logo);
				console.log(this.fileListShow);
				console.log(this.form.information)
				console.log(this.oldName)
				if(this.msg == '未认证'){
					 this.$message({
					 	message: '请先进行企业认证后再修改',
					 	type: 'warning'
					 });
				}else{
					let logoUp = '';
					if(this.logo == '' && this.showLogo == ''){
						this.$message({
							message: '请选择企业logo上传',
							type: 'warning'
						});
						return;
					}else if(this.logo != ''){
						logoUp = this.logo;
					}else{
						logoUp = '';
					}
					if(this.form.name == '' || this.form.information == ''){
							this.$message({
								message: '有空值，请完善信息提交',
								type: 'warning'
							});
					}else{
						let that=this;
						const token=localStorage.getItem('token');
						let formData=new FormData();
						formData.append('newName',this.form.name);
						if(this.logo != ''){
							formData.append('logo',logoUp);
						}					
						formData.append('introduction',this.form.information);
						formData.append('oldName',this.oldName);
						this.$axios({
							url:this.$userUrl+'/company/add?token='+token,
							method:'post',
							data:formData
						})
						.then(function(res){
							console.log(res);
							if(res.data.code == 0){
								that.$message({
										message: '保存成功',
										type: 'success'
									});	
								}else{
							    that.$message.error(res.data.msg);
						  }
						})
						.catch(function(err){
						console.log(err)
						})
					}
				}
			},
			handleRemove(file, fileList) {
				this.logo = '';
				console.log(this.logo)
			},
			handleChange(files) {
				this.logo = document.getElementsByClassName("el-upload__input")[0].files[0];			
				console.log(this.logo)
			},
			getCompany(){
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$userUrl+'/company/info?token='+token)
				.then(function(res){
					console.log(res)
				  if(res.data.code == 0){
					  let data = res.data.data;
						if(data.length == 0){
							 that.getCompany2();
						}else{
							 that.form.name = data[0].name;
							 that.form.information = data[0].introduction == null? '':data[0].introduction;
							 that.oldName = data[0].name;				 
							 if(data[0].logo != null){
								 that.showLogo = [{url:that.$pictrueShowUrl+'/data/download/'+JSON.parse(data[0].logo).fileId}];
                 that.fileListShow = that.showLogo;
							 }
							 
						}             				
				  }else{
							that.$message.error(res.data.msg);
						}
												
				})
				.catch(function(err){
				console.log(err)
				})								
			},
       getCompany2(){
				 let that=this;
				 const token=localStorage.getItem('token');
				 this.$axios.get(this.$userUrl+'/account/getroles?token='+token)
				 .then(function(res){
				 	console.log(res)
				 	if(res.data.code == 0){
				 			let data = res.data.data;
				 			that.form.name = data.unitname;
							that.msg = '未认证'
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