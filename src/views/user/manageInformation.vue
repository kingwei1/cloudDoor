<template>
	<div id="main">	
		<div class="backLayout">
		    <breadcrumb :menu="menu"></breadcrumb>	
			<el-form label-position="right" label-width="150px"  :model="form" :disabled="state == 'see'">
				<el-form-item label="个人头像">
					<div v-if="state == 'see'">
						<div class="showInformation" style="width: 100px;height: 100px;background: #000000;"><img style="width: 100%;height: 100%;"  :src='form.img' /></div>
					</div>
					<div v-else>
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
					<span style="position: absolute;top: 100px;">每张小于5M，支持JPG/PNG格式</span>
					</div>
				</el-form-item>
				<el-form-item label="昵称">					
					<div v-if="state != 'see'">
						<el-input v-model="form.nickName" maxlength='20'></el-input>
						<span class="tips" v-if="state != 'see'">支持6-20个字符</span>
					</div>
					<div v-else>
						<span class="showInformation">{{form.nickName}}</span>
					</div>
				</el-form-item>
				<el-form-item label="身份证">
					<div v-if="state != 'see'">
						<el-input v-model="form.IDcard" maxlength='18'></el-input>
						<span class="tips" v-if="state != 'see'">支持二代身份证，18位身份证</span>
					</div>
					<div v-else>
						<span class="showInformation">{{form.IDcard}}</span>
					</div>				
				</el-form-item>
				<el-form-item label="真实姓名" >
					<div v-if="state != 'see'">
						<el-input v-model="form.realName" maxlength='20'></el-input>
					</div>
					<div v-else>
						<span class="showInformation">{{form.realName}}</span>
					</div>					
				</el-form-item>
				<el-form-item label="性别">
					<div v-if="state != 'see'">
						<el-radio-group v-model="form.sex">
              <el-radio  label="1">男</el-radio>
              <el-radio  label="2">女</el-radio>
              <el-radio  label="3">保密</el-radio>
             </el-radio-group>
					</div>
					<div v-else>
						<span class="showInformation">{{form.sexName}}</span>
					</div>
				</el-form-item>
				<el-form-item label="生日">
					 <div v-if="state != 'see'">
					 	<el-date-picker
					 		v-model="form.birthday"
					 		type="date"
					 		placeholder="选择日期">
					 	</el-date-picker>
					 </div>
					 <div v-else>
					 	<span class="showInformation">{{form.birthday}}</span>
					 </div>				 
				</el-form-item>
				<el-form-item label="手机号码" >
					<div v-if="state != 'see'">
					 <el-input v-model="form.phone" maxlength='20'></el-input>
					</div>
					<div v-else>
					<span class="showInformation">{{form.phone}}</span>
					</div>					
				</el-form-item>
				<el-form-item label="电子邮箱" >
					<div v-if="state != 'see'">
					  <el-input v-model="form.email" maxlength='30'></el-input>
					  <span class="tips" v-if="state != 'see'">{{form.email.length}}/30</span>
					</div>
					<div v-else>
					<span class="showInformation">{{form.email}}</span>
					</div>					
				</el-form-item>
				<el-form-item label="现居住地址">
					<div v-if="state != 'see'">
						<el-input type="textarea" :rows="4" resize="none" v-model="form.address" maxlength='50'></el-input>
						<span class="tips" v-if="state != 'see'">{{form.address.length}}/50</span>
					</div>
					<div v-else>
					<span class="showInformation">{{form.address}}</span>
					</div>					
				</el-form-item>
				<el-form-item label="求职状态">
					<div v-if="state != 'see'">
						<el-input v-model="form.jobStatus" maxlength='20'></el-input>
						<span class="tips" v-if="state != 'see'">{{form.jobStatus.length}}/20</span>
					</div>
					<div v-else>
					<span class="showInformation">{{form.jobStatus}}</span>
					</div>					
				</el-form-item>
			    <el-form-item label="个人简介">
						<div v-if="state != 'see'">
							<el-input type="textarea" :rows="6" resize="none" v-model="form.resume" maxlength='200'></el-input>
							<span class="tips" v-if="state != 'see'">{{form.resume.length}}/200</span>
						</div>
						<div v-else>
						<span class="showInformation">{{form.resume}}</span>
						</div>					
				 </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit" v-if="state != 'see'">保存</el-button>
				</el-form-item>
			</el-form>
		</div>	
	</div>
	
</template>
<script>

  import tableList from '../components/tableList'
  import search from '../components/search'
  import breadcrumb from '../components/breadcrumb1'
	export default{
		name:'manageInformation',
		components:{
			breadcrumb
		},
		data(){
			return{
			   menu:[{
			   	title:'项目经理审核',
				path:'/projectManageAudit'
			   }],
			   state:this.$route.query.state,
				 fileListShow:[],
			   userImg:'',
			   form: {
					img:'',
				  nickName: '',
				  IDcard: '',
				  realName: '',
				  sex: '1',
					sexName:'',
				  birthday: '',
				  phone: '',
				  email: '',
				  address: '',
				  jobStatus:'',
				  resume:''			  
				}
			  
			}
		},
		methods:{
			getManageInformation(){
				let that=this;
				const token=localStorage.getItem('token');
				this.$axios.get(this.$userUrl+'/stuManager/getInfo/'+this.$route.query.id+'?token='+token)
				.then(function(res){
					console.log(res);
					if(res.data.code == 0){
						let data = res.data.data;
						if(data.sex == '男'){
								that.form.sex = '1';							
						}else if(data.sex == '女'){
								that.form.sex = '2';							
						}else{
								that.form.sex = '3';							
						}
						let img = data.img == '#'? 'http://n.sinaimg.cn/sinacn/w500h420/20180302/58b1-fwnpcnt3500449.jpg':that.$pictrueShowUrl+'/data/download/' +data.img;
						that.form.img =  img;
						that.form.nickName = data.nick;
						that.form.IDcard = data.idcard;
						that.form.realName = data.rname;
						that.form.sexName = data.sex;
						that.form.birthday = that.changeDate(new Date(data.birthday),"yyyy-MM-dd");
						that.form.phone = data.phone;
						that.form.email = data.email;
						that.form.address = data.address;
						that.form.jobStatus = data.jodstatus;
						that.form.resume = data.personal;
						if(data.img != null && data.img != '' && data.img != '#'){
							that.fileListShow = [{url:img}];
						}
					}else{
						that.$message.error(res.data.msg);
					}
										
				})
				.catch(function(err){
					console.log(err)
				})
			},
			onSubmit(){
				let that=this;
				const token=localStorage.getItem('token');
				 let sex = '';
				 if(this.form.sex == '1'){
				 	sex = '男';							
				 }else if(this.form.sex == '2'){
				 	sex = '女';							
				 }else{
				 	sex = '保密';							
				 }
				 console.log(sex)
				 let formData=new FormData();
				 formData.append('id',this.$route.query.id);
				 if(this.userImg != ''){
					 formData.append('img',this.userImg);
				 }				 
				 formData.append('birthday',new Date(this.form.birthday));
				 formData.append('nick',this.form.nickName);
				 formData.append('idcard',this.form.IDcard);
				 formData.append('rname',this.form.realName);
				 formData.append('sex',sex);
				 formData.append('phone',this.form.phone);
				 formData.append('email',this.form.email);
				 formData.append('address',this.form.address);
				 formData.append('jodstatus',this.form.jobStatus);
				 formData.append('personal',this.form.resume);
				 console.log(this.userImg)
				this.$axios({
					url:this.$userUrl+'/stuManager/alter?token='+token,
					method:'post',
					data:formData
				})
				.then(function(res){
				  console.log(res);
				  if(res.data.code == 0){
						that.$message({
							type: 'success',
							message: '保存成功!'
						});
						that.$router.push({path:'/projectManageAudit',query:{}});
					}else{
						that.$message.error(res.data.msg);
					}
												
				})
				.catch(function(err){
				  that.$message.error(err.response.data);
				})
			},
			handleRemove(file, fileList) {
				this.userImg = '';
				console.log(this.userImg)
			},
			handleChange(files) {
				this.userImg = document.getElementsByClassName("el-upload__input")[0].files[0];			
				console.log(this.userImg)
			},
		 },		
		created:function(){            
			console.log(this.state)
			console.log(this.$route.query.id);
			if(this.state == 'see'){
				this.menu.push({title:'查看项目经理信息'})
			}else{
				this.menu.push({title:'编辑项目经理信息'})
			}
			this.getManageInformation();
					
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
.showInformation{
	margin-left: 20px;
}
</style>
<style>
	
</style>